import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SimulationScreen() {
  // router.push yerine router.replace kullanarak stack birikmesini önlüyoruz
  const handlePress = (level: "easy" | "medium" | "hard") => {
    router.replace({
      pathname: "/simulation/quiz",
      params: { level },
    });
  };

  const handleBack = () => {
    // Doğrudan ana menüye veya bir üst dizine yönlendirmek stack hatalarını kesin çözer
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); 
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* ARKA PLAN DEKORASYONU */}
      <View style={styles.decorationCircle1} />
      <View style={styles.decorationCircle2} />

      {/* GERİ DÖN BUTONU */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="chevron-left" size={32} color="#0F172A" />
      </TouchableOpacity>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Hazır mısın?</Text>
          <Text style={styles.titleText}>Deprem Simülasyonu</Text>
          <Text style={styles.subtitleText}>
            Seviye seç ve bilgilerini test ederek deprem anına hazırlıklı ol.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          {/* 🟢 KOLAY SEVİYE */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress("easy")}
            style={styles.cardShadow}
          >
            <LinearGradient
              colors={["#E8F5E9", "#C8E6C9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, { borderLeftColor: "#2ECC71" }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: "#1B5E20" }]}>Kolay Seviye</Text>
                <MaterialCommunityIcons name="leaf" size={26} color="#1B5E20" />
              </View>
              <Text style={styles.cardDesc}>
                Temel deprem bilgileri ve basit senaryolar ile başlangıç yapın.
              </Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}><Text style={styles.badgeText}>Öğrenme Modu</Text></View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* 🟡 ORTA SEVİYE */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress("medium")}
            style={styles.cardShadow}
          >
            <LinearGradient
              colors={["#FFFDE7", "#FFF9C4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, { borderLeftColor: "#F1C40F" }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: "#B8860B" }]}>Orta Seviye</Text>
                <MaterialCommunityIcons name="flash" size={26} color="#B8860B" />
              </View>
              <Text style={styles.cardDesc}>
                Karar verme ve zaman baskısı içeren simülasyon senaryoları.
              </Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}><Text style={styles.badgeText}>Zamana Karşı</Text></View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* 🔴 ZOR SEVİYE */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress("hard")}
            style={styles.cardShadow}
          >
            <LinearGradient
              colors={["#FFEBEE", "#FFCDD2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, { borderLeftColor: "#E74C3C" }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: "#B71C1C" }]}>Zor Seviye</Text>
                <MaterialCommunityIcons name="alert-decagram" size={26} color="#B71C1C" />
              </View>
              <Text style={styles.cardDesc}>
                Gerçekçi, yüksek stresli ve kritik deprem anı durumları.
              </Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}><Text style={styles.badgeText}>Yüksek Risk</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>Profesyonel</Text></View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? 50 : 40,
    marginLeft: 16,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Butonun diğer öğelerin üstünde kalmasını sağlar
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  decorationCircle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#6366F1",
    opacity: 0.04,
    top: -50,
    right: -80,
  },
  decorationCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#3B82F6",
    opacity: 0.04,
    bottom: -30,
    left: -60,
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6366F1",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 10,
    lineHeight: 24,
    fontWeight: "500",
  },
  cardContainer: {
    gap: 20,
  },
  cardShadow: {
    borderRadius: 24,
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  card: {
    borderRadius: 24,
    padding: 24,
    minHeight: 165,
    borderLeftWidth: 10,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
  },
  cardDesc: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 18,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.03)",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
});