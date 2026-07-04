import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

const mythsData = [
  {
    myth: "Ağlamak zayıflıktır, güçlü durmalısın.",
    fact: "Ağlamak, sinir sisteminin bir boşaltım mekanizmasıdır. Duyguları serbest bırakmak iyileşmeyi hızlandırır.",
    icon: "water-off",
    color: "#FF6B6B",
  },
  {
    myth: "Depremi unutmak için hiç konuşmamalıyız.",
    fact: "Yaşananları güvenli bir ortamda anlatmak, beynin travmayı işlemesine yardımcı olur. Susmak, yükü ağırlaştırır.",
    icon: "comment-off",
    color: "#4A90E2",
  },
  {
    myth: "Sadece fiziksel yarası olanlar travma yaşar.",
    fact: "Psikolojik yaralar görünmezdir ama aynı derecede gerçektir. Herkesin tepkisi farklı ve geçerlidir.",
    icon: "bandage",
    color: "#6AB04C",
  },
  {
    myth: "Zaman her şeyin ilacıdır, destek gereksizdir.",
    fact: "Zaman geçse de işlenmemiş travma tetiklenmeye devam eder. Profesyonel destek, süreci sağlıklı yönetmenizi sağlar.",
    icon: "clock-alert",
    color: "#F0932B",
  },
  {
    myth: "Çocuklar anlamaz, onlara bir şey anlatmaya gerek yok.",
    fact: "Çocuklar belirsizlikten korkar. Onlara yaşlarına uygun, dürüst bir açıklama yapmak güven hissi verir.",
    icon: "baby-face-outline",
    color: "#A29BFE",
  },
];

export default function MitosScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFact, setShowFact] = useState(false);

  const handleNext = () => {
    if (currentIndex < mythsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFact(false);
    } else {
      setCurrentIndex(0); // Başa dön
      setShowFact(false);
    }
  };

  const activeData = mythsData[currentIndex];

  return (
    <View style={styles.container}>
      {/* Yeni Modern Başlık Tasarımı */}
      <View style={styles.titleSection}>
        <View style={styles.titleIconContainer}>
          <MaterialCommunityIcons name="brain" size={28} color="#6C63FF" />
        </View>
        <View>
          <Text style={styles.mainTitle}>Doğru Bilinen Yanlışlar</Text>
          <Text style={styles.subTitle}>Psikolojik Dayanıklılık Rehberi</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
             <Text style={styles.progressLabel}>Bilgi Kartları</Text>
             <Text style={styles.progressText}>
               {currentIndex + 1} / {mythsData.length}
             </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${((currentIndex + 1) / mythsData.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Ana Kart Alanı */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => setShowFact(!showFact)} 
          style={[styles.card, { borderColor: showFact ? "#6AB04C" : "#FF6B6B" }]}
        >
          <View style={[styles.badge, { backgroundColor: showFact ? "#6AB04C" : "#FF6B6B" }]}>
            <Text style={styles.badgeText}>{showFact ? "GERÇEK" : "MİTOS"}</Text>
          </View>

          <MaterialCommunityIcons 
            name={showFact ? "check-decagram" : activeData.icon as any} 
            size={70} 
            color={showFact ? "#6AB04C" : "#FF6B6B"} 
            style={styles.mainIcon}
          />

          <Text style={styles.textDisplay}>
            {showFact ? activeData.fact : activeData.myth}
          </Text>

          <View style={styles.hintContainer}>
             <Ionicons 
                name={showFact ? "arrow-forward-circle" : "sync-circle"} 
                size={18} 
                color="#B2BEC3" 
             />
             <Text style={styles.hintText}>
                {showFact ? "Sonraki kart için butona bas" : "Gerçeği öğrenmek için karta dokun"}
             </Text>
          </View>
        </TouchableOpacity>

        {/* Kontrol Butonları */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === mythsData.length - 1 ? "Başa Dön" : "Sıradaki Yanılgı"}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  titleIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#EBE9FF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  mainTitle: { fontSize: 22, fontWeight: "800", color: "#2D3436" },
  subTitle: { fontSize: 14, color: "#636E72", marginTop: 2 },
  content: { flex: 1, padding: 25, justifyContent: "center" },
  progressContainer: { marginBottom: 25 },
  progressHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "baseline",
    marginBottom: 10 
  },
  progressLabel: { fontSize: 13, fontWeight: "700", color: "#6C63FF", textTransform: "uppercase" },
  progressText: { fontSize: 14, fontWeight: "600", color: "#B2BEC3" },
  progressBarBg: { height: 8, backgroundColor: "#E0E0E0", borderRadius: 4, overflow: "hidden" },
  progressBarFill: { height: "100%", backgroundColor: "#6C63FF" },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 35,
    padding: 30,
    height: 420,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  badge: {
    position: "absolute",
    top: -15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 4,
  },
  badgeText: { color: "#FFF", fontWeight: "900", letterSpacing: 1.5, fontSize: 12 },
  mainIcon: { marginBottom: 25 },
  textDisplay: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
    textAlign: "center",
    lineHeight: 30,
    paddingHorizontal: 10,
  },
  hintContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  hintText: {
    fontSize: 12,
    color: "#B2BEC3",
    fontWeight: "500",
  },
  footer: { marginTop: 35, alignItems: "center" },
  nextButton: {
    backgroundColor: "#1A1A2E",
    flexDirection: "row",
    paddingHorizontal: 35,
    paddingVertical: 20,
    borderRadius: 22,
    alignItems: "center",
    gap: 12,
    elevation: 5,
  },
  nextButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});