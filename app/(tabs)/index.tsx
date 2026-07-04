import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarthquakeMap from "@/components/EarthquakeMap";
import useEmscEarthquakes from "@/hooks/useEmscEarthquakes";

/* ZAMAN HESAPLAMA */
function timeAgo(isoTime: string) {
  const now = new Date();
  const past = new Date(isoTime);
  const diffMs = now.getTime() - past.getTime();

  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "az önce";
  if (diffMinutes < 60) return `${diffMinutes} dk önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  return `${diffDays} gün önce`;
}

/* ŞİDDETE GÖRE RENK BELİRLEME */
const getMagColor = (mag: number) => {
  if (mag < 3.0) return "#4CAF50"; // Yeşil (Düşük)
  if (mag < 4.5) return "#FBC02D"; // Sarı/Turuncu (Orta)
  if (mag < 6.0) return "#E64A19"; // Koyu Turuncu/Turuncu-Kırmızı (Yüksek)
  return "#B71C1C"; // Koyu Kırmızı (Çok Yüksek)
};

export default function HomeScreen() {
  const { earthquakes, loading } = useEmscEarthquakes();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>

        {/* ÜST KISIM — HARİTA */}
        <View style={styles.mapContainer}>
          <EarthquakeMap earthquakes={earthquakes} />
        </View>

        {/* ALT KISIM — SON DEPREMLER */}
        <View style={styles.bottomContainer}>
          <Text style={styles.sectionTitle}>Son Depremler</Text>

          {loading && (
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              Yükleniyor...
            </Text>
          )}

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {earthquakes.map((item, index) => {
              const mag = item.properties?.mag || 0;
              const place = item.properties?.flynn_region;
              const depth = item.geometry?.coordinates?.[2];
              const time = item.properties?.time;

              // Dinamik renk alıyoruz
              const dynamicColor = getMagColor(mag);

              return (
                <TouchableOpacity key={index} style={styles.quakeItem}>
                  {/* Büyüklük - Arkaplan rengi dinamikleştirildi */}
                  <View style={[styles.magBox, { backgroundColor: dynamicColor }]}>
                    <Text style={styles.magText}>
                      {mag ? mag.toFixed(1) : "-"}
                    </Text>
                    <Text style={styles.magSub}>ML</Text>
                  </View>

                  {/* Bilgiler */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.location} numberOfLines={1}>
                      {place || "Bilinmeyen Konum"}
                    </Text>

                    <View style={styles.row}>
                      <Ionicons
                        name="pulse-outline"
                        size={14}
                        color="#777"
                      />
                      <Text style={styles.infoText}>
                        Derinlik: {depth ?? "-"} km •{" "}
                        {time ? timeAgo(time) : "-"}
                      </Text>
                    </View>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#8B0000",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  mapContainer: {
    height: 300,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
    backgroundColor: "#8B0000",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  list: {
    marginTop: 5,
  },
  quakeItem: {
    backgroundColor: "#f8f8f8",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    // Hafif gölge eklendi
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  magBox: {
    width: 55, // Biraz genişletildi
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  magText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  magSub: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  location: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});