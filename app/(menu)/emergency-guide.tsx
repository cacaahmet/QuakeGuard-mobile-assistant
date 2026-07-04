import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmergencyGuide() {
  const router = useRouter();

  const criticalSteps = [
    {
      id: 1,
      title: "ÇÖK – KAPAN – TUTUN",
      desc: "Neredeysen ol, dizlerinin üzerine çök. Başını ve boynunu koru. Sağlam bir eşyanın yanına kapan ve sıkıca tutun.",
      icon: "🛡️",
      important: true,
    },
    {
      id: 2,
      title: "EVDEYSEN",
      desc: "Pencere, avize, dolap ve beyaz eşyalardan uzak dur. Masa, koltuk yanı veya iç duvar dibinde güvenli boşluk oluştur.",
      icon: "🏠",
    },
    {
      id: 3,
      title: "DIŞARIDAYKEN",
      desc: "Binalardan, balkonlardan, elektrik direklerinden uzak açık bir alana geç. Duvar diplerinde durma.",
      icon: "🌆",
    },
    {
      id: 4,
      title: "ARAÇ İÇİNDEYSEN",
      desc: "Aracı yavaşça durdur. Köprü, tünel ve üst geçitlerden uzak dur. Araç içinde kal, sarsıntı bitene kadar çıkma.",
      icon: "🚗",
    },
    {
      id: 5,
      title: "OKUL / OFİSTE",
      desc: "Sıranın veya masanın altına gir. Camlardan ve kitaplıklardan uzak dur. Panikle merdivene koşma.",
      icon: "🏫",
    },
    {
      id: 6,
      title: "AVM / KALABALIK ALAN",
      desc: "Kaçışa çalışma. Düşebilecek tabelalardan uzak dur. Güvenli boşluklarda çömel ve başını koru.",
      icon: "🏢",
    },
    {
      id: 7,
      title: "GECE UYKUDAYKEN",
      desc: "Yataktan fırlama. Yastıkla başını koru. Yatak yanında çömelerek sarsıntının geçmesini bekle.",
      icon: "🌙",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* BACK BUTTON */}
      <View style={styles.topNavigation}>
        <TouchableOpacity
          style={styles.backButtonCircle}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* HERO */}
        <View style={styles.heroSection}>
          <View style={styles.blackCard}>
            <Text style={styles.yellowLabel}>ACİL DURUM REHBERİ</Text>
            <Text style={styles.heroTitle}>DEPREM ANINDA</Text>
            <View style={styles.divider} />
            <Text style={styles.heroSubtitle}>
              Nerede olursan ol, doğru hareket hayat kurtarır. İlk saniyeler kritik.
            </Text>
          </View>
        </View>

        {/* STEPS */}
        <View style={styles.stepsContainer}>
          {criticalSteps.map((step) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={[styles.iconCircle, step.important && styles.importantIcon]}>
                <Text style={styles.stepEmoji}>{step.icon}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* FINAL WARNING */}
        <View style={styles.finalNotice}>
          <Text style={styles.finalTitle}>⚠️ HAYATİ UYARI</Text>
          <Text style={styles.finalText}>
            Sarsıntı bitmeden asla koşma, bağırma veya asansör kullanma. Deprem bittikten sonra artçı sarsıntılar olabilir.
            Kontrollü ve bilinçli hareket et.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f03542ff", // Yumuşak acil kırmızı
  },
  topNavigation: {
    paddingHorizontal: 24,
    marginTop: 60,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  backIcon: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7F1D1D",
  },
  scrollContent: {
    paddingBottom: 60,
  },
  heroSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  blackCard: {
    backgroundColor: "#0F172A",
    borderRadius: 32,
    padding: 30,
    alignItems: "center",
  },
  yellowLabel: {
    color: "#FACC15",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 8,
  },
  divider: {
    height: 3,
    width: 40,
    backgroundColor: "#FACC15",
    marginVertical: 15,
    borderRadius: 2,
  },
  heroSubtitle: {
    color: "#CBD5E1",
    textAlign: "center",
    fontSize: 14,
  },
  stepsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 16,
  },
  stepCard: {
    backgroundColor: "#fcdbdbff",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#FFE4E6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  importantIcon: {
    backgroundColor: "#FCA5A5",
  },
  stepEmoji: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7F1D1D",
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  finalNotice: {
    margin: 20,
    padding: 25,
    borderRadius: 24,
    backgroundColor: "#FEE2E2",
    borderLeftWidth: 6,
    borderLeftColor: "#DC2626",
  },
  finalTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#7F1D1D",
    marginBottom: 8,
  },
  finalText: {
    fontSize: 14,
    color: "#991B1B",
    lineHeight: 22,
    fontWeight: "500",
  },
});
