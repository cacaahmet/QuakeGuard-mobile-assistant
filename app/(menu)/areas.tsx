import { CityData, CityList } from "@/assets/data/index";
import EarthquakeMap from "@/components/EarthquakeMap";
import { Picker } from "@react-native-picker/picker";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AssemblyArea = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  ilce: string;
  mahalle: string;
  address?: string;
};

export default function AreasScreen() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedIlce, setSelectedIlce] = useState<string | null>(null);
  const [selectedMahalle, setSelectedMahalle] = useState<string | null>(null);
  const [mapFocus, setMapFocus] = useState<any>(null);

  // 1. Seçilen dosyayı getir
  const currentFileData = useMemo(() => {
    return selectedCity ? CityData[selectedCity] : null;
  }, [selectedCity]);

  // 2. Veriyi Parse Et
  const allAreas = useMemo(() => {
    if (!currentFileData) return [];
    const result: AssemblyArea[] = [];

    const rootKey = Object.keys(currentFileData).find(
      (key) => typeof currentFileData[key] === "object" && currentFileData[key].ilceler
    );

    const dataToParse = rootKey ? currentFileData[rootKey] : currentFileData;
    const ilceler = dataToParse?.ilceler || {};

    Object.entries(ilceler).forEach(([ilceAdi, ilce]: any) => {
      const mahalleler = ilce?.mahalleler || {};
      Object.entries(mahalleler).forEach(([mahalleAdi, mahalle]: any) => {
        const toplanmaAlanlari = mahalle?.toplanmaAlanlari || {};
        Object.entries(toplanmaAlanlari).forEach(([id, alan]: any) => {
          if (alan.x && alan.y) {
            result.push({
              id: String(id),
              title: alan.tesis_adi || "İsimsiz Alan",
              latitude: parseFloat(alan.y),
              longitude: parseFloat(alan.x),
              ilce: ilceAdi,
              mahalle: mahalleAdi,
            });
          }
        });
      });
    });
    return result;
  }, [currentFileData]);

  // 3. Filtrelemeler
  const ilceler = useMemo(() => Array.from(new Set(allAreas.map((a) => a.ilce))).sort(), [allAreas]);

  const mahalleler = useMemo(() => {
    if (!selectedIlce) return [];
    return Array.from(
      new Set(allAreas.filter((a) => a.ilce === selectedIlce).map((a) => a.mahalle))
    ).sort();
  }, [selectedIlce, allAreas]);

  const filteredAreas = useMemo(() => {
    if (!selectedMahalle) return [];
    return allAreas.filter((a) => a.ilce === selectedIlce && a.mahalle === selectedMahalle);
  }, [selectedIlce, selectedMahalle, allAreas]);

  // 4. Dinamik Harita Odağı
  const focusLocation = useMemo(() => {
    if (mapFocus) return mapFocus; // Eğer listeden bir yere tıklandıysa oraya odaklan
    
    if (selectedMahalle && filteredAreas.length > 0) {
      return {
        latitude: filteredAreas[0].latitude,
        longitude: filteredAreas[0].longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      };
    }
    return {
      latitude: 38.9637,
      longitude: 35.2433,
      latitudeDelta: 12.0,
      longitudeDelta: 12.0,
    };
  }, [filteredAreas, selectedMahalle, mapFocus]);

  // Listeden bir alana tıklandığında haritayı oraya kaydır
  const handleAreaPress = (area: AssemblyArea) => {
    setMapFocus({
      latitude: area.latitude,
      longitude: area.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: " Toplanma Alanları ",
        }}
      />

    <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
      {/* Bilgi Kutusu */}
      <View style={styles.infoBox}>
        <Text style={styles.title}>Afet Toplanma Alanları</Text>
        <Text style={styles.infoText}>
          Mahalle seçimi yaptıktan sonra alanlar aşağıda listelenecektir.
        </Text>
      </View>

      {/* Harita - stickyHeaderIndices sayesinde seçim yaparken üstte kalabilir */}
      <View style={styles.mapWrapper}>
        <EarthquakeMap
          earthquakes={[]}
          assemblyAreas={filteredAreas}
          focusLocation={focusLocation}
        />
      </View>

      {/* Seçiciler */}
      <View style={styles.selectorBox}>
        <Text style={styles.label}>İl</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(v) => {
              setSelectedCity(v);
              setSelectedIlce(null);
              setSelectedMahalle(null);
              setMapFocus(null);
            }}
          >
            <Picker.Item label="İl seçiniz..." value={null} />
            {CityList.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        {selectedCity && (
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>İlçe</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedIlce}
                  onValueChange={(v) => {
                    setSelectedIlce(v);
                    setSelectedMahalle(null);
                    setMapFocus(null);
                  }}
                >
                  <Picker.Item label="Seç..." value={null} />
                  {ilceler.map((ilce) => (
                    <Picker.Item key={ilce} label={ilce} value={ilce} />
                  ))}
                </Picker>
              </View>
            </View>

            {selectedIlce && (
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Mahalle</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedMahalle}
                    onValueChange={(v) => {
                      setSelectedMahalle(v);
                      setMapFocus(null);
                    }}
                  >
                    <Picker.Item label="Seç..." value={null} />
                    {mahalleler.map((m) => (
                      <Picker.Item key={m} label={m} value={m} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Liste Görünümü */}
      <View style={styles.listContainer}>
        {selectedMahalle ? (
          <>
            <Text style={styles.listHeader}>
              {selectedMahalle} Mahallesindeki Alanlar ({filteredAreas.length})
            </Text>
            {filteredAreas.length > 0 ? (
              filteredAreas.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.areaCard}
                  onPress={() => handleAreaPress(item)}
                >
                  <View style={styles.iconCircle}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>A</Text>
                  </View>
                  <View style={styles.areaContent}>
                    <Text style={styles.areaTitle}>{item.title}</Text>
                    <Text style={styles.areaSubtitle}>{item.ilce} / {item.mahalle}</Text>
                  </View>
                  <View style={styles.goIcon}>
                     <Text style={{color: '#28a745', fontSize: 12}}>Haritada Gör</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>Bu mahallede kayıtlı alan bulunamadı.</Text>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Listeyi görmek için mahalle seçimi yapın.</Text>
          </View>
        )}
      </View>
      
      <View style={{ height: 50 }} />
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  infoBox: {
    backgroundColor: "#ffffff",
    margin: 12,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#28a745",
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#1a1a1a" },
  infoText: { fontSize: 13, color: "#666", marginTop: 4 },
  mapWrapper: {
    height: 350,
    marginHorizontal: 12,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: '#eee'
  },
  selectorBox: {
    margin: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 12, fontWeight: "700", marginBottom: 4, color: "#555", textTransform: 'uppercase' },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    paddingLeft: 4
  },
  areaCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
  },
  areaContent: {
    flex: 1,
    marginLeft: 12,
  },
  areaTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  areaSubtitle: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 2,
  },
  goIcon: {
    paddingLeft: 10,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center'
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
});