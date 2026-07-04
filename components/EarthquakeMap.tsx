import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, {
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

/* 🔴 Deprem tipi */
type Earthquake = {
  geometry?: { coordinates?: [number, number] };
  properties?: { mag?: number };
};

/* 📍 Toplanma alanı tipi */
type AssemblyArea = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
};

type Props = {
  earthquakes?: Earthquake[];
  focusLocation?: {
    latitude: number;
    longitude: number;
  };
  assemblyAreas?: AssemblyArea[];
};

/* 🔵 İLK KODUNDAKİ BASE RADIUS */
function getBaseRadius(mag: number) {
  if (mag >= 6) return 600000;
  if (mag >= 5) return 350000;
  if (mag >= 4) return 250000;
  return 170000;
}

function getCircleColor(mag: number) {
  if (mag >= 6) return "rgba(255,0,0,0.4)";
  if (mag >= 5) return "rgba(255,166,0,0.6)";
  if (mag >= 4) return "rgba(255,255,0,0.4)";
  return "rgba(0,200,0,0.4)";
}

/* 🔒 Clamp */
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export default function EarthquakeMap({
  earthquakes = [],
  focusLocation,
  assemblyAreas = [],
}: Props) {
  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);

  /* 🌍 Dünya başlangıç (REFERANS) */
  const initialRegion: Region = {
    latitude: 30,
    longitude: 20,
    latitudeDelta: 85,
    longitudeDelta: 160,
  };

  const [region, setRegion] = useState<Region>(initialRegion);

  /* ✅ Harita hazır */
  const handleMapReady = () => {
    setMapReady(true);
    mapRef.current?.animateToRegion(initialRegion, 0);
  };

  /* 📍 Dış odak */
  useEffect(() => {
    if (mapReady && focusLocation) {
      const target: Region = {
        latitude: focusLocation.latitude,
        longitude: focusLocation.longitude,
        latitudeDelta: 0.6,
        longitudeDelta: 0.6,
      };
      mapRef.current?.animateToRegion(target, 1000);
      setRegion(target);
    }
  }, [focusLocation, mapReady]);

  /* 🔍 Zoom In */
  const zoomIn = () => {
    if (!mapReady) return;
    const next = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    mapRef.current?.animateToRegion(next, 300);
    setRegion(next);
  };

  /* 🔍 Zoom Out */
  const zoomOut = () => {
    if (!mapReady) return;
    const next = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    mapRef.current?.animateToRegion(next, 300);
    setRegion(next);
  };

  /* 🎯 SCALE → HER ZOOM IN'DE KÜÇÜLÜR */
  const zoomScale = useMemo(() => {
    if (!mapReady) return 1;

    const rawScale =
      region.latitudeDelta / initialRegion.latitudeDelta;

    // dünya zoom'unda patlamasın, yakın zoom'da görünür kalsın
    return clamp(rawScale, 0.15, 1);
  }, [region.latitudeDelta, mapReady]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        style={StyleSheet.absoluteFillObject}
        onMapReady={handleMapReady}
        onRegionChangeComplete={(r) => mapReady && setRegion(r)}
        showsBuildings
        showsCompass
        showsScale
      >
        {/* 🔴 Depremler */}
        {earthquakes.map((item, index) => {
          const coords = item.geometry?.coordinates;
          const mag = item.properties?.mag;
          if (!coords || !mag) return null;

          const baseRadius = getBaseRadius(mag);
          const radius = baseRadius * zoomScale;

          return (
            <Circle
              key={`eq-${index}`}
              center={{
                latitude: coords[1],
                longitude: coords[0],
              }}
              radius={radius}
              fillColor={getCircleColor(mag)}
              strokeColor="transparent"
            />
          );
        })}

        {/* 📍 Toplanma Alanları */}
        {assemblyAreas.map((area) => (
          <Marker
            key={area.id}
            coordinate={{
              latitude: area.latitude,
              longitude: area.longitude,
            }}
            title={area.title}
            pinColor="green"
          />
        ))}
      </MapView>

      {/* 🔍 Zoom Butonları */}
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomText}>＋</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomText}>－</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  zoomContainer: {
    position: "absolute",
    right: 16,
    bottom: 40,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 8,
    paddingVertical: 4,
  },
  zoomButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "60%",
    alignSelf: "center",
  },
});
