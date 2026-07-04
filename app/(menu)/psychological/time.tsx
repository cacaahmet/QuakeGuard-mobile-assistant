import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const { width } = Dimensions.get("window");

const timelineData = [
  {
    period: "İlk 24 Saat",
    title: "Şok ve Hayatta Kalma",
    desc: "Vücut yüksek adrenalin salgılar. Donma, titreme veya aşırı hareketlilik normaldir. Mantıklı düşünmek zordur.",
    icon: "flash",
    color: "#E74C3C",
  },
  {
    period: "İlk 72 Saat",
    title: "Geri Dönüşler (Flashback)",
    desc: "Olay anı sürekli gözünüzün önüne gelebilir. Seslere karşı aşırı duyarlılık başlar. Uykusuzluk görülebilir.",
    icon: "alert-decagram",
    color: "#E67E22",
  },
  {
    period: "İlk 1 Hafta",
    title: "Duygusal Boşalma",
    desc: "Şok etkisi azaldıkça yoğun ağlama, öfke veya suçluluk hissi tetiklenebilir. Sosyal destek bu evrede kritiktir.",
    icon: "water",
    color: "#F1C40F",
  },
  {
    period: "2 - 4 Hafta",
    title: "Anlamlandırma Çabası",
    desc: "Hayat yavaş yavaş rutinlere dönmeye başlar. Ancak odaklanma sorunları ve iştahsızlık devam edebilir.",
    icon: "puzzle",
    color: "#2ECC71",
  },
  {
    period: "1 Ay ve Sonrası",
    title: "Yeniden İnşa",
    desc: "Eğer belirtiler (kabuslar, kaçınma) azalmadıysa profesyonel destek alma vaktidir. İyileşme lineer değildir.",
    icon: "flower-tulip",
    color: "#3498DB",
  },
];

export default function TimelineScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Giriş Mesajı */}
        <View style={styles.topCard}>
          <Text style={styles.topCardTitle}>Zaman En Büyük İlaçtır</Text>
          <Text style={styles.topCardDesc}>
            Duyguların bir takvimi olmasa da, zihnimiz travmayı belirli evrelerle işler. Hangi aşamada olduğunuzu bilmek kaygınızı azaltabilir.
          </Text>
        </View>

        {/* Zaman Çizelgesi */}
        <View style={styles.timelineContainer}>
          {timelineData.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              {/* Sol Çizgi ve İkon */}
              <View style={styles.leftColumn}>
                <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={22} color="#FFF" />
                </View>
                {index !== timelineData.length - 1 && (
                  <View style={[styles.verticalLine, { backgroundColor: item.color + "40" }]} />
                )}
              </View>

              {/* Sağ İçerik */}
              <View style={styles.rightColumn}>
                <Text style={[styles.periodText, { color: item.color }]}>{item.period}</Text>
                <View style={styles.contentCard}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bilgi Notu */}
        <View style={styles.footerNote}>
          <Ionicons name="information-circle" size={20} color="#636E72" />
          <Text style={styles.footerNoteText}>
            Her bireyin iyileşme hızı farklıdır. Kendinize zaman tanıyın ve şefkatli davranın.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFEFF" },
  content: { 
    padding: 20,
    paddingTop: 60 // Üst kısım kaldırıldığı için içerik başlangıcı ayarlandı
  },
  topCard: {
    backgroundColor: "#F8FAFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  topCardTitle: { fontSize: 18, fontWeight: "800", color: "#2D3436", marginBottom: 8 },
  topCardDesc: { fontSize: 14, color: "#636E72", lineHeight: 20 },
  timelineContainer: { paddingLeft: 10 },
  timelineItem: { flexDirection: "row", marginBottom: 5 },
  leftColumn: { alignItems: "center", marginRight: 15 },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  verticalLine: { width: 3, flex: 1, marginTop: -5, marginBottom: -5 },
  rightColumn: { flex: 1, paddingBottom: 30 },
  periodText: { fontSize: 12, fontWeight: "800", marginBottom: 5, letterSpacing: 1, textTransform: "uppercase" },
  contentCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#2D3436", marginBottom: 6 },
  cardDesc: { fontSize: 13, color: "#636E72", lineHeight: 18 },
  footerNote: {
    flexDirection: "row",
    backgroundColor: "#F1F2F6",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  footerNoteText: { flex: 1, marginLeft: 10, fontSize: 12, color: "#636E72", fontStyle: "italic" },
});