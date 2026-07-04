import * as Location from "expo-location";
import { Stack } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import hospitalsData from "@/assets/data/Tümiller.json";

interface Hospital {
  id: number;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export default function HospitalScreen() {
  const [sortedHospitals, setSortedHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const DISTANCE_LIMIT = 100;
  const retryCount = useRef(0);
  const MAX_RETRY = 3;

  useEffect(() => {
    initLocation();
  }, []);

  const initLocation = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setPermissionDenied(true);
        setLoading(false);
        return;
      }

      setPermissionDenied(false);

      setTimeout(getAndSortLocation, 600);
    } catch (error) {
      setLoading(false);
    }
  };

  const getAndSortLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      retryCount.current = 0;
      processHospitals(location.coords);
    } catch (error) {
      if (retryCount.current < MAX_RETRY) {
        retryCount.current += 1;
        setTimeout(getAndSortLocation, 800);
        return;
      }

      Alert.alert(
        "Konum Hatası",
        "Konumunu alamadık. Lütfen GPS açık olduğundan emin ol."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const processHospitals = (coords: {
    latitude: number;
    longitude: number;
  }) => {
    const list = (hospitalsData as Hospital[])
      .map((h) => ({
        ...h,
        distance: getDistance(
          coords.latitude,
          coords.longitude,
          h.latitude,
          h.longitude
        ),
      }))
      .filter((h) => h.distance! <= DISTANCE_LIMIT)
      .sort((a, b) => a.distance! - b.distance!);

    setSortedHospitals(list);
  };

  const openInMaps = (lat: number, lon: number, name: string) => {
    const label = encodeURIComponent(name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lon}`,
      android: `geo:0,0?q=${lat},${lon}(${label})`,
    });
    if (url) Linking.openURL(url);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAndSortLocation();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Yakınımdaki Hastaneler ",
        }}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2fa4a9" />
          <Text style={{ marginTop: 15, color: "#666" }}>
            Konum alınıyor...
          </Text>
        </View>
      ) : permissionDenied ? (
        <View style={styles.center}>
          <Text style={styles.empty}>Konum izni reddedildi.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={initLocation}>
            <Text style={styles.retryText}>İzni Tekrar İste</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.header}>
            <Text style={styles.title}>Hastaneler</Text>
            <Text style={styles.subtitle}>
              En Yakından En Uzağa (100 KM)
            </Text>
          </View>

          <FlatList
            data={sortedHospitals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  openInMaps(item.latitude, item.longitude, item.name)
                }
              >
                <View style={styles.cardRow}>
                  <View style={styles.mainInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.subText}>📍 {item.district}</Text>
                  </View>
                  <View style={styles.distBadge}>
                    <Text style={styles.distNum}>
                      {item.distance?.toFixed(1)}
                    </Text>
                    <Text style={styles.distUnit}>KM</Text>
                  </View>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerLink}>Yol Tarifi Al</Text>
                  <Text style={styles.nextDate}>7/24 Aktif</Text>
                </View>
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{ padding: 16 }}
            ListEmptyComponent={
              <Text style={styles.empty}>
                Yakın çevrede hastane bulunamadı.
              </Text>
            }
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: { fontSize: 26, fontWeight: "800", color: "#2C3E50" },
  subtitle: { fontSize: 13, color: "#7F8C8D", marginTop: 4 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  mainInfo: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700" },
  subText: { fontSize: 13, color: "#999", marginTop: 5 },
  distBadge: {
    backgroundColor: "#F0F3F4",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    minWidth: 65,
  },
  distNum: { fontSize: 18, fontWeight: "900", color: "#2fa4a9" },
  distUnit: { fontSize: 10, color: "#2fa4a9" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 10,
  },
  footerLink: { color: "#2fa4a9", fontWeight: "700" },
  nextDate: { fontSize: 12, color: "#AAA" },
  empty: { marginTop: 40, color: "#999" },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#2fa4a9",
    padding: 12,
    borderRadius: 10,
  },
  retryText: { color: "#FFF", fontWeight: "700" },
});
