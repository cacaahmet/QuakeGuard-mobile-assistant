import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type AidItem = {
  id: number;
  name: string;
  description: string;
  checked: boolean;
};

const INITIAL_ITEMS: AidItem[] = [
  {
    id: 1,
    name: "Steril Gazlı Bez",
    description:
      "Yaraları temizlemek ve kapatmak için kullanılır. Mikrop kapmasını önler.",
    checked: false,
  },
  {
    id: 2,
    name: "Bandaj / Sargı Bezi",
    description:
      "Kırık sabitlenmesi veya pansumanın yerinde durması için kritiktir.",
    checked: false,
  },
  {
    id: 3,
    name: "Yara Bandı",
    description:
      "Küçük kesikler ve sıyrıkların dış ortamla temasını keser.",
    checked: false,
  },
  {
    id: 4,
    name: "Antiseptik Solüsyon",
    description:
      "Yara çevresindeki mikropları öldürerek enfeksiyon riskini azaltır.",
    checked: false,
  },
  {
    id: 5,
    name: "Makas",
    description:
      "Giysileri kesmek veya sargı bezlerini boyutlandırmak için kullanılır.",
    checked: false,
  },
  {
    id: 6,
    name: "Eldiven",
    description:
      "Hem hastayı hem de kendinizi enfeksiyonlardan korumak için şarttır.",
    checked: false,
  },
  {
    id: 7,
    name: "Ağrı Kesici",
    description:
      "Hafif ve orta şiddetli ağrılar ile ateşi düşürmek için gereklidir.",
    checked: false,
  },
  {
    id: 8,
    name: "Termal Battaniye",
    description:
      "Vücut ısısını korur, şok durumlarında veya soğuktan korunmada hayati önem taşır.",
    checked: false,
  },
  {
    id: 9,
    name: "El Feneri",
    description:
      "Elektrik kesintilerinde müdahale yapabilmek için yedek pilleriyle bulunmalıdır.",
    checked: false,
  },
];

export default function AidApp() {
  const [activeTab, setActiveTab] = useState<"info" | "checklist">("info");
  const [items, setItems] = useState<AidItem[]>(INITIAL_ITEMS);
  const [lastCheckDate, setLastCheckDate] = useState<Date | null>(null);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const completedCount = items.filter((i) => i.checked).length;

  // -------- INFO --------
  const renderInfoScreen = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>🩹 Neden Hazırlıklı Olmalıyız?</Text>
      <Text style={styles.description}>
        Afet anında ilk 72 saat kritiktir. Profesyonel yardım gelene kadar
        ilk yardım çantanız hayat kurtarabilir.
      </Text>

      {INITIAL_ITEMS.map((item) => (
        <View key={item.id} style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>• {item.name}</Text>
          <Text style={styles.infoCardDesc}>{item.description}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setActiveTab("checklist")}
      >
        <Text style={styles.mainButtonText}>Çantamı Kontrol Et</Text>
      </TouchableOpacity>
    </View>
  );

  // -------- CHECKLIST --------
  const renderChecklistScreen = () => (
    <View style={styles.tabContent}>
      <View style={styles.progressBox}>
        <Text style={styles.progressText}>
          Hazırlık Seviyesi %
          {Math.round((completedCount / items.length) * 100)}
        </Text>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(completedCount / items.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.itemRow, item.checked && styles.itemChecked]}
          onPress={() => toggleItem(item.id)}
        >
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.checkIcon}>{item.checked ? "✅" : "⬜"}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: "#16A34A" }]}
        onPress={() => setLastCheckDate(new Date())}
      >
        <Text style={styles.mainButtonText}>Kontrolü Tamamladım</Text>
      </TouchableOpacity>

      {lastCheckDate && (
        <Text style={styles.lastCheckText}>
          Son kontrol: {lastCheckDate.toLocaleDateString("tr-TR")}
        </Text>
      )}

      <TouchableOpacity onPress={() => setActiveTab("info")}>
        <Text style={styles.backButtonText}>← Rehbere Dön</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "           İlk Yardım Çantası",
        }}
      />

      <ScrollView style={styles.container}>
        {/* HERO IMAGE */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/aid.png")}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={["rgba(255,255,255,0.7)", "transparent"]}
            style={styles.overlay}
          />
        </View>

        {activeTab === "info" ? renderInfoScreen() : renderChecklistScreen()}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  imageContainer: {
    width: "100%",
    height: 230,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 20,
    lineHeight: 22,
  },

  infoCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoCardDesc: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  mainButton: {
    backgroundColor: "#F97316",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  mainButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  progressBox: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  progressText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#22C55E",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },
  itemChecked: {
    backgroundColor: "#ECFDF5",
  },
  itemText: {
    fontSize: 15,
  },
  checkIcon: {
    fontSize: 20,
  },

  lastCheckText: {
    textAlign: "center",
    marginTop: 15,
    color: "#64748B",
  },
  backButtonText: {
    textAlign: "center",
    marginTop: 20,
    color: "#64748B",
    textDecorationLine: "underline",
  },
});
