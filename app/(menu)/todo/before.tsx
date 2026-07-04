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

export default function BeforeScreen() {
  const checklist = [
    {
      id: 1,
      text: "Ağır eşyaları (dolap, raf, TV) duvara sabitle",
      icon: "home",
    },
    {
      id: 2,
      text: "Acil durum çantası hazırla",
      icon: "briefcase",
    },
    {
      id: 3,
      text: "Gaz, su ve elektrik vanalarını öğren",
      icon: "water",
    },
    {
      id: 4,
      text: "Aile afet planı oluştur",
      icon: "people",
    },
    {
      id: 5,
      text: "Toplanma alanlarını önceden öğren",
      icon: "location",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Stack.Screen
        options={{
          title: "Deprem Öncesi",
          headerStyle: { backgroundColor: "#FFF6D8" },
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 18,
            color: "#2A2A2A",
          },
          headerShadowVisible: false,
        }}
      />

      <StatusBar barStyle="dark-content" backgroundColor="#FFF6D8" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* 🟡 ÜST BİLGİ KARTI */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="alert-circle" size={28} color="#FF9800" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Hazırlıklı Olmak Hayat Kurtarır</Text>
            <Text style={styles.infoText}>
              Deprem olmadan önce alınacak basit önlemler, can ve mal kaybını
              büyük ölçüde azaltır.
            </Text>
          </View>
        </View>

        {/* 📋 CHECKLIST */}
        <Text style={styles.sectionTitle}>Yapılması Gerekenler</Text>

        {checklist.map((item) => (
          <View key={item.id} style={styles.checkItem}>
            <View style={styles.checkIcon}>
              <Ionicons name={item.icon as any} size={20} color="#FF9800" />
            </View>
            <Text style={styles.checkText}>{item.text}</Text>
          </View>
        ))}

        {/* ℹ️ AFAD NOTU */}
        <View style={styles.noteBox}>
          <Ionicons name="information-circle" size={20} color="#4A90E2" />
          <Text style={styles.noteText}>
            Bu öneriler AFAD ve resmi afet rehberleri doğrultusunda
            hazırlanmıştır.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* 🌕 ANA ARKA PLAN */
  container: {
    flex: 1,
    backgroundColor: "#FFF9E6", // sarımsı, yumuşak arka plan
  },
  content: {
    padding: 20,
    paddingTop: 12,
  },

  /* 🟡 ÜST BİLGİ KARTI */
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFF2C6",
    borderRadius: 22,
    padding: 20,
    marginBottom: 26,
  },
  infoIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#FFE4A3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#5A5A5A",
    lineHeight: 20,
  },

  /* 📋 CHECKLIST */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 16,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3E7C3",
  },
  checkIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFF3D9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    flex: 1,
  },

  /* ℹ️ NOT */
  noteBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEF",
    borderRadius: 16,
    padding: 14,
    marginTop: 22,
    gap: 10,
    borderWidth: 1,
    borderColor: "#F0E2B8",
  },
  noteText: {
    fontSize: 12,
    color: "#444",
    lineHeight: 18,
    flex: 1,
  },
});
