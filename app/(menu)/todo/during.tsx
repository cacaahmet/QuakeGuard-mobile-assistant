import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DuringScreen() {
  const steps = [
    {
      id: 1,
      title: "ÇÖK",
      desc: "Dizlerinin üzerine çökerek dengenizi koruyun.",
      icon: "arrow-down-circle",
    },
    {
      id: 2,
      title: "KAPAN",
      desc: "Baş ve boynunuzu kollarınızla koruyun.",
      icon: "body",
    },
    {
      id: 3,
      title: "TUTUN",
      desc: "Sabit bir eşyanın altına girip tutunun.",
      icon: "hand-left",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Stack.Screen
        options={{
          headerTitle: "Deprem Anı",
          headerStyle: { backgroundColor: "#B71C1C" },
          headerTintColor: "#FFF",
        }}
      />

      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* 🚨 BİLGİ BAŞLIK */}
        <View style={styles.alertBox}>
          <Ionicons name="alert-circle" size={34} color="#FFF" />
          <Text style={styles.alertTitle}>
            Deprem Anında Yapılacaklar
          </Text>
          <Text style={styles.alertSubtitle}>
            Bunları asla unutma. Hayat kurtarır.
          </Text>
        </View>

        {/* 🟥 ANA TALİMAT */}
        <View style={styles.mainInstruction}>
          <Text style={styles.mainInstructionText}>
            <Text style={styles.bold}>ÇÖK – KAPAN – TUTUN</Text>
          </Text>
          <Text style={styles.subInstruction}>
            En güvenli hayatta kalma pozisyonu
          </Text>
        </View>

        {/* 🖼️ GÖRSEL (TAM OTURAN) */}
        <View style={styles.imageCard}>
          <Image
            source={require("@/assets/images/acil.png")}
            style={styles.image}
          />
        </View>

        {/* 🧠 ADIMLAR */}
        {steps.map((step) => (
          <View key={step.id} style={styles.stepCard}>
            <View style={styles.stepIcon}>
              <Ionicons name={step.icon as any} size={28} color="#B71C1C" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}

        {/* ⛔ UYARILAR */}
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>❌ YAPMA</Text>
          <Text style={styles.warningText}>• Merdivenlere koşma</Text>
          <Text style={styles.warningText}>• Asansör kullanma</Text>
          <Text style={styles.warningText}>• Balkona çıkma</Text>
          <Text style={styles.warningText}>• Pencere önünde durma</Text>
        </View>

        {/* 🟢 BİLGİ */}
        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <Text style={styles.infoText}>
            Sarsıntı bitene kadar bulunduğun pozisyonu koru.
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
    backgroundColor: "#8E0000",
  },
  content: {
    padding: 20,
  },

  /* 🚨 ÜST BİLGİ */
  alertBox: {
    backgroundColor: "#B71C1C",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  alertTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 10,
    textAlign: "center",
  },
  alertSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },

  mainInstruction: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 18,
  },
  mainInstructionText: {
    fontSize: 28,
    color: "#B71C1C",
  },
  bold: {
    fontWeight: "900",
  },
  subInstruction: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
  },

  /* 🖼️ GÖRSEL TAM OTURAN */
  imageCard: {
    height: 220,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 22,
    backgroundColor: "#000",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  stepCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#B71C1C",
  },
  stepDesc: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  warningBox: {
    backgroundColor: "#2A0000",
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
  },
  warningTitle: {
    color: "#FF5252",
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 10,
  },
  warningText: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 4,
  },

  infoBox: {
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  infoText: {
    color: "#2E7D32",
    fontSize: 13,
    marginLeft: 8,
    fontWeight: "600",
  },
});
