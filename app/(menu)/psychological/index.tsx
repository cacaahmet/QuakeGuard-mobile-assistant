import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
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

const emotions = [
  { emoji: "😔", label: "Kötü", color: "#FFDEE9" },
  { emoji: "😟", label: "Kaygılı", color: "#E0C3FC" },
  { emoji: "😐", label: "Normal", color: "#B5FFFC" },
  { emoji: "🙂", label: "İyi", color: "#85FFBD" },
  { emoji: "😊", label: "Umutlu", color: "#FFFB7D" },
];

export default function PsychologicalIndex() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ✅ Expo Router Stack Title */}
      <Stack.Screen
        options={{ title: "Deprem Sonrası Psikolojik Destek" }}
      />

      {/* Arka Plan Dekoratif Işıltı */}
      <View style={styles.topGlow} />

      {/* Başlık Bölümü */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>🧘 Psikolojik Destek</Text>
        <Text style={styles.subtitle}>
          İçsel dengeni bulmana ve iyileşmene yardımcı olacak rehberin.
        </Text>
      </View>

      {/* Duygu Check-in Kartı */}
      <View style={styles.glassCard}>
        <Text style={styles.cardTitle}>Şu anki ruh halin nasıl?</Text>

        <View style={styles.emojiRow}>
          {emotions.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.emojiButton,
                selectedEmotion === item.label && {
                  backgroundColor: item.color,
                },
              ]}
              onPress={() => setSelectedEmotion(item.label)}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.emojiLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedEmotion && (
          <View style={styles.feedbackContainer}>
            <Ionicons name="heart" size={16} color="#6C63FF" />
            <Text style={styles.feedbackText}>
              <Text style={{ fontWeight: "bold" }}>
                {selectedEmotion}
              </Text>{" "}
              hissetmen çok insani. Yanındayız.
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Keşfet & İyileş</Text>

      {/* Menü Butonları */}
      <MenuButton
        title="Zihinsel İlk Adımlar"
        description="Bedenin bilgeliğini ve zihnin tepkilerini anla."
        icon="brain"
        color="#6C63FF"
        onPress={() => router.push("/psychological/steps")}
      />

      <MenuButton
        title="Çocuklar İçin Güvenli Liman"
        description="Onlara korkularını anlatabilecekleri bir alan aç."
        icon="teddy-bear"
        color="#FF6B6B"
        onPress={() => router.push("/psychological/kids")}
      />

      <MenuButton
        title="İyileşme Takvimi"
        description="Zamanın iyileştirici gücünü planlı kullan."
        icon="calendar-clock"
        color="#4ECDC4"
        onPress={() => router.push("/psychological/time")}
      />

      <MenuButton
        title="Psikolojik Mitler ve Gerçekler"
        description="Toplumdaki yanlış inanışları bilimsel gerçeklerle değiştir."
        icon="lightbulb-on"
        color="#F9D423"
        onPress={() => router.push("/psychological/mitos")}
      />

      <MenuButton
        title="Ruhun Sesi (Sesli Destek)"
        description="Sakinleştirici meditasyonlar ve uzman telkinleri."
        icon="headphones"
        color="#A29BFE"
        onPress={() => router.push("/psychological/audio")}
      />

      <MenuButton
        title="Dayanışma Ağı"
        description="Gönüllü psikologlara ve ücretsiz hatlara ulaş."
        icon="hand-heart"
        color="#FF8A65"
        onPress={() => router.push("/psychological/network")}
      />

      {/* Motivasyon Kartı */}
      <View style={styles.visionCard}>
        <Text style={styles.visionText}>
          "Fırtınanın ne kadar sürdüğü değil, senin limana nasıl sığındığın
          önemlidir."
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------- Menü Buton Bileşeni ---------- */
function MenuButton({ title, description, icon, color, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>

      <View style={styles.menuTextContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#B2BEC3" />
    </TouchableOpacity>
  );
}

/* ---------- Stiller ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  topGlow: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#6C63FF20",
    zIndex: -1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A2E",
  },
  subtitle: {
    fontSize: 16,
    color: "#636E72",
    marginTop: 8,
    lineHeight: 22,
  },
  glassCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#6C63FF",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2D3436",
    textAlign: "center",
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emojiButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 16,
    width: (width - 100) / 5,
    backgroundColor: "#F1F2F6",
  },
  emoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  emojiLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#636E72",
  },
  feedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F2F6",
  },
  feedbackText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#6C63FF",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 16,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTextContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: "#B2BEC3",
    lineHeight: 16,
  },
  visionCard: {
    marginTop: 20,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#1A1A2E",
    alignItems: "center",
  },
  visionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.9,
  },
});
