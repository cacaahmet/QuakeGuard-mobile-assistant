import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StepsScreen() {
  const router = useRouter();

  // Travma anı acil sakinleşme adımları (5-4-3-2-1 Tekniği)
  const groundingSteps = [
    { id: 1, text: "Gördüğün 5 nesneye odaklan", icon: "eye-outline" },
    { id: 2, text: "Dokunabildiğin 4 dokuyu hisset", icon: "hand-right-outline" },
    { id: 3, text: "Duyduğun 3 farklı sesi dinle", icon: "ear-outline" },
    { id: 4, text: "Aldığın 2 farklı kokuyu fark et", icon: "water-outline" },
    { id: 5, text: "Tadabildiğin 1 şeyi düşün", icon: "restaurant-outline" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Bilgi Kartı */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="brain" size={40} color="#6C63FF" />
          <Text style={styles.infoTitle}>Şu An Güvendesin</Text>
          <Text style={styles.infoDesc}>
            Travma sonrası zihnin hala tehlikede olduğunu düşünebilir. Bedeni
            "şimdi ve burada" olduğuna ikna etmek için aşağıdaki adımları takip et.
          </Text>
        </View>

        {/* Topraklama Egzersizi (Grounding) */}
        <Text style={styles.sectionTitle}>5-4-3-2-1 Topraklama Egzersizi</Text>
        
        {groundingSteps.map((step) => (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.iconCircle}>
              <Ionicons name={step.icon as any} size={24} color="#6C63FF" />
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepNumber}>ADIM {step.id}</Text>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          </View>
        ))}

        {/* Nefes Butonu */}
        <TouchableOpacity 
          style={styles.breathAction}
        
        >
          <MaterialCommunityIcons name="air-filter" size={24} color="#FFF" />
          <Text style={styles.breathText}>Hemen Nefes Egzersizi Yap</Text>
        </TouchableOpacity>

        {/* Alt Not */}
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            *Eğer yoğun titreme, donup kalma veya nefes darlığı yaşıyorsan, bu
            egzersizi bitirene kadar yavaşça devam et.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  content: {
    padding: 20,
    paddingTop: 60, // Header kalktığı için yukarıdan güvenli bir boşluk bırakıldı
  },
  infoCard: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    // Hafif gölge efekti
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2D3436",
    marginTop: 10,
  },
  infoDesc: {
    fontSize: 14,
    color: "#636E72",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 20,
    paddingLeft: 5,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6C63FF10",
    justifyContent: "center",
    alignItems: "center",
  },
  stepTextContent: {
    marginLeft: 15,
    flex: 1, // Yazının taşmasını önler
  },
  stepNumber: {
    fontSize: 10,
    fontWeight: "800",
    color: "#6C63FF",
    letterSpacing: 1,
  },
  stepText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
  },
  breathAction: {
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    marginTop: 20,
    gap: 10,
  },
  breathText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  noteBox: {
    marginTop: 30,
    marginBottom: 40, // Alt kısımda nefes payı
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
    backgroundColor: "#FFF",
  },
  noteText: {
    fontSize: 13,
    color: "#636E72",
    fontStyle: "italic",
  },
});