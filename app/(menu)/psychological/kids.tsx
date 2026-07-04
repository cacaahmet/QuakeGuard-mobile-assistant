import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ageGroups = [
  { id: "preschool", label: "Okul Öncesi", icon: "baby-carriage", age: "0-6 Yaş" },
  { id: "school", label: "Okul Çağı", icon: "school", age: "7-12 Yaş" },
  { id: "teen", label: "Ergenlik", icon: "human-male-female", age: "13+ Yaş" },
];

export default function KidsSupportScreen() {
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState("preschool");

  const getGuidance = () => {
    switch (selectedAge) {
      case "preschool":
        return "Bolca tensel temas kurun. Oyun oynamasına izin verin, çünkü çocuklar travmayı oyunla işler. Güvende olduğunu somut kelimelerle tekrarlayın.";
      case "school":
        return "Sorularını dürüst ama korkutmadan yanıtlayın. Günlük rutinleri (yemek, uyku saati) korumaya çalışın. Resim çizerek duygularını ifade etmesini sağlayın.";
      case "teen":
        return "Duygularını küçümsemeyin. Arkadaşlarıyla iletişimde kalmasına destek olun. Sosyal medyadaki dezenformasyondan korumak için birlikte haber izleyin/okuyun.";
      default:
        return "";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Giriş Kartı */}
        <View style={styles.heroCard}>
          <MaterialCommunityIcons name="teddy-bear" size={50} color="#FF6B6B" />
          <Text style={styles.heroTitle}>Onların Kahramanı Sensin</Text>
          <Text style={styles.heroDesc}>
            Çocuklar dünyayı sizin gözlerinizle görür. Sakin kalmanız, onlara verilebilecek en büyük destektir.
          </Text>
        </View>

        {/* Yaş Grubu Seçici */}
        <Text style={styles.sectionTitle}>Yaş Grubuna Göre Yaklaşım</Text>
        <View style={styles.ageSelector}>
          {ageGroups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[
                styles.ageCard,
                selectedAge === group.id && styles.selectedAgeCard,
              ]}
              onPress={() => setSelectedAge(group.id)}
            >
              <MaterialCommunityIcons
                name={group.icon as any}
                size={30}
                color={selectedAge === group.id ? "#FFF" : "#FF6B6B"}
              />
              <Text style={[styles.ageLabel, selectedAge === group.id && { color: "#FFF" }]}>
                {group.label}
              </Text>
              <Text style={[styles.ageRange, selectedAge === group.id && { color: "#EEE" }]}>
                {group.age}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rehber İçeriği */}
        <View style={styles.guidanceBox}>
          <Ionicons name="bulb" size={20} color="#FF6B6B" style={{ marginBottom: 10 }} />
          <Text style={styles.guidanceText}>{getGuidance()}</Text>
        </View>

        {/* Alt Altın Kurallar */}
        <Text style={styles.sectionTitle}>Asla Unutulmaması Gerekenler</Text>
        <View style={styles.ruleItem}>
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
          <Text style={styles.ruleText}>Dürüst olun ama detaylarda boğmayın.</Text>
        </View>
        <View style={styles.ruleItem}>
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
          <Text style={styles.ruleText}>Duygularını ağlayarak veya kızarak yaşamasına izin verin.</Text>
        </View>
        <View style={styles.ruleItem}>
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
          <Text style={styles.ruleText}>Haber bültenlerinden ve deprem görüntülerinden uzak tutun.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F5" },
  content: { 
    padding: 20, 
    paddingTop: 60 // Header kalktığı için üstten boşluk eklendi
  },
  heroCard: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 25,
    elevation: 4,
    shadowColor: "#FF6B6B",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  heroTitle: { fontSize: 22, fontWeight: "800", color: "#2D3436", marginTop: 10 },
  heroDesc: {
    fontSize: 14,
    color: "#636E72",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#2D3436", marginBottom: 15, marginTop: 10 },
  ageSelector: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  ageCard: {
    width: (width - 60) / 3,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE0E0",
  },
  selectedAgeCard: { backgroundColor: "#FF6B6B", borderColor: "#FF6B6B" },
  ageLabel: { fontSize: 12, fontWeight: "700", color: "#2D3436", marginTop: 8 },
  ageRange: { fontSize: 10, color: "#B2BEC3" },
  guidanceBox: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#FF6B6B",
    marginBottom: 25,
  },
  guidanceText: { fontSize: 15, color: "#2D3436", lineHeight: 22, fontStyle: "italic" },
  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  ruleText: { marginLeft: 10, fontSize: 14, color: "#2D3436", flex: 1 },
});