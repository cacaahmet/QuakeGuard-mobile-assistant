import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AfterScreen() {
  const rules = [
    "Panik yapmadan çevrendeki insanların durumunu kontrol et",
    "Gaz, elektrik ve su vanalarını güvenliyse kapat",
    "Hasar görmüş veya riskli binalara kesinlikle girme",
    "Artçı depremler için açık ve güvenli alanlarda kal",
    "Yetkililerin uyarı ve yönlendirmelerini takip et",
    "Telefonu sadece acil durumlar için kullan",
    "Sosyal medyada doğrulanmamış bilgilere itibar etme",
    "Toplanma alanına kontrollü ve sakin şekilde ilerle",
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Stack.Screen
        options={{
          headerTitle: "Deprem Sonrası Kurallar",
          headerStyle: { backgroundColor: "#2E7D32" },
          headerTintColor: "#FFF",
        }}
      />

      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* 📌 ANA BİLGİLENDİRME */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={34} color="#2E7D32" />
          <Text style={styles.infoTitle}>
            Deprem Sonrası Dikkat Edilmesi Gereken Nihai Kurallar
          </Text>
          <Text style={styles.infoText}>
            Bu adımlar, can güvenliğini korumak ve riskleri en aza indirmek için
            hayati öneme sahiptir.
          </Text>
        </View>

        {/* 📋 KURALLAR */}
        <Text style={styles.sectionTitle}>Temel Güvenlik Kuralları</Text>

        {rules.map((item, index) => (
          <View key={index} style={styles.ruleItem}>
            <View style={styles.ruleIcon}>
              <Ionicons name="alert-circle" size={18} color="#2E7D32" />
            </View>
            <Text style={styles.ruleText}>{item}</Text>
          </View>
        ))}

        {/* 🚶‍♂️ TAHLİYE */}
        <View style={styles.evacuateBox}>
          <Ionicons name="walk" size={24} color="#2E7D32" />
          <View style={{ flex: 1 }}>
            <Text style={styles.evacuateTitle}>Tahliye Süreci</Text>
            <Text style={styles.evacuateText}>
              Asansör kullanma. Merdivenleri tercih et ve binayı sakin şekilde
              terk et.
            </Text>
          </View>
        </View>

        {/* 🆘 ACİL DURUM */}
        <View style={styles.emergencyBox}>
          <Ionicons name="call" size={22} color="#D32F2F" />
          <Text style={styles.emergencyText}>
            Hayati acil durumlarda yalnızca 112’yi ara.
          </Text>
        </View>

        {/* ⚠️ KRİTİK UYARI */}
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>KRİTİK UYARI</Text>
          <Text style={styles.warningText}>
            Yetkili kurumlar güvenli olduğunu açıklamadan binalara geri dönme.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  content: {
    padding: 20,
  },

  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 25,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1B5E20",
    marginTop: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    marginTop: 8,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1B5E20",
    marginBottom: 16,
  },

  ruleItem: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ruleIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  ruleText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    flex: 1,
  },

  evacuateBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  evacuateTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2E7D32",
  },
  evacuateText: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  emergencyBox: {
    backgroundColor: "#FFEBEE",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  emergencyText: {
    color: "#B71C1C",
    fontWeight: "800",
    marginLeft: 10,
  },

  warningBox: {
    backgroundColor: "#FFFDE7",
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFF59D",
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#F57F17",
    marginBottom: 6,
  },
  warningText: {
    fontSize: 13,
    color: "#6D4C41",
  },
});
