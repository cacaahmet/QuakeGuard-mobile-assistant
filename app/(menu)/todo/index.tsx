import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function IndexScreen() {
  const phases = [
    {
      id: "before",
      title: "Deprem Öncesi",
      subtitle: "Hazırlık ve Önlem",
      description: "Evinizi sabitleyin, acil durum çantası hazırlayın ve plan yapın.",
      icon: "shield-half",
      colors: ["#FF9800", "#F57C00"],
      lightColor: "#FFF3E0",
      route: "/todo/before",
    },
    {
      id: "during",
      title: "Deprem Anı",
      subtitle: "Doğru Uygulama",
      description: "Panik yapmayın, Çök-Kapan-Tutun yöntemini uygulayın.",
      icon: "warning",
      colors: ["#D32F2F", "#B71C1C"],
      lightColor: "#FFEBEE",
      route: "/todo/during",
    },
    {
      id: "after",
      title: "Deprem Sonrası",
      subtitle: "Güvenli Tahliye",
      description: "Binayı tahliye edin, toplanma alanına gidin ve artçılara hazır olun.",
      icon: "checkmark-circle",
      colors: ["#4CAF50", "#388E3C"],
      lightColor: "#E8F5E9",
      route: "/todo/after",
    },
  ];

  // Merkezi yönlendirme fonksiyonu
  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#FDFDFD" },
          headerShadowVisible: false,
        }}
      />

      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* 🔴 HEADER */}
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <Ionicons name="shield-checkmark" size={32} color="#D32F2F" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Deprem Eylem Planı</Text>
            
            {/* 🔗 INTERAKTIF NAVIGASYON BUTONLARI */}
            <View style={styles.phaseIndicator}>
              {phases.map((phase, index) => (
                <React.Fragment key={phase.id}>
                  <Pressable 
                    onPress={() => handleNavigation(phase.route)}
                    style={({ pressed }) => [
                      styles.phaseButton,
                      { 
                        opacity: pressed ? 0.5 : 1, 
                        borderBottomColor: phase.colors[0] 
                      }
                    ]}
                  >
                    <Text style={[styles.phaseText, { color: phase.colors[0] }]}>
                      {phase.title.split(" ")[1]} 
                    </Text>
                  </Pressable>
                  
                  {/* Nokta ayırıcı (Son öğeden sonra koyma) */}
                  {index < phases.length - 1 && <View style={styles.phaseDot} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>

        {/* 📘 HAYATİ ÖNEM */}
        <LinearGradient
          colors={["#D32F2F", "#B71C1C"]}
          style={styles.mainCard}
        >
          <View style={styles.mainCardContent}>
            <Text style={styles.mainCardTitle}>📌 Hayati Önem</Text>
            <Text style={styles.mainCardText}>
              Deprem sırasında panik yapmamak için önceden pratik yapmak ve
              doğru adımları ezberlemek yaşam kurtarır.
            </Text>
          </View>
          <Ionicons
            name="fitness-outline"
            size={80}
            color="rgba(255,255,255,0.2)"
            style={styles.cardBgIcon}
          />
        </LinearGradient>

        {/* ⚠️ ALINTI */}
        <View style={styles.modernQuoteBox}>
          <Ionicons
            name="alert-circle"
            size={24}
            color="#4A90E2"
            style={styles.quoteIcon}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.modernQuoteText}>
              Sakin kalın. Güvenli bir yerde{" "}
              <Text style={styles.highlightText}>ÇÖK-KAPAN-TUTUN</Text>{" "}
              hareketini uygulayın.
            </Text>
            
            

            <View style={styles.modernQuoteFooter}>
              <Ionicons
                name="shield-checkmark"
                size={18}
                color="#4CAF50"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.modernQuoteSource}>AFAD Güvenlik Rehberi</Text>
            </View>
          </View>
        </View>

        {/* 🚀 EYLEM ADIMLARI */}
        <Text style={styles.sectionTitle}>Eylem Adımları</Text>

        {phases.map((phase) => (
          <Pressable
            key={phase.id}
            onPress={() => handleNavigation(phase.route)}
            style={({ pressed }) => [
              styles.phaseCard,
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.phaseIconContainer,
                { backgroundColor: phase.lightColor },
              ]}
            >
              <Ionicons
                name={phase.icon as any}
                size={28}
                color={phase.colors[0]}
              />
            </View>

            <View style={styles.phaseInfo}>
              <Text
                style={[
                  styles.phaseLabel,
                  { color: phase.colors[0] },
                ]}
              >
                {phase.subtitle}
              </Text>
              <Text style={styles.phaseTitleText}>{phase.title}</Text>
              <Text style={styles.phaseDescText}>{phase.description}</Text>
            </View>

            <View style={styles.arrowCircle}>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#CCC"
              />
            </View>
          </Pressable>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
  },
  iconBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#FFEBEB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#1A1A1A",
  },
  phaseIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  phaseButton: {
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
  phaseText: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  phaseDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDD",
    marginHorizontal: 10,
  },
  mainCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 25,
    position: "relative",
    overflow: "hidden",
  },
  mainCardContent: {
    zIndex: 1,
  },
  mainCardTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mainCardText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: "80%",
  },
  cardBgIcon: {
    position: "absolute",
    right: -10,
    bottom: -10,
  },
  modernQuoteBox: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    marginBottom: 30,
  },
  quoteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  modernQuoteText: {
    color: "#E0E0E0",
    fontSize: 15,
    lineHeight: 22,
  },
  highlightText: {
    color: "#4A90E2",
    fontWeight: "800",
  },
  modernQuoteFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  modernQuoteSource: {
    color: "#888",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 20,
  },
  phaseCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  phaseIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  phaseTitleText: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  phaseDescText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
});