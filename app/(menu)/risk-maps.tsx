import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const fayHaritasi = require("@/assets/images/fay.png");

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Görselin orijinal en-boy oranı (Genişlik / Yükseklik)
const IMAGE_ASPECT_RATIO = 2 / 1;

const RiskMaps = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: " Fay Hatları ",
        }}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Başlık */}
          <View style={styles.header}>
            <Text style={styles.title}>Türkiye Deprem Tehlike Haritası</Text>
            <Text style={styles.subtitle}>
              Türkiye genelinde deprem risk dağılımını gösteren harita
            </Text>
          </View>

          {/* Harita Kartı */}
          <View style={styles.card}>
            <Pressable
              onPress={() => setVisible(true)}
              style={styles.imageWrapper}
            >
              <Image
                source={fayHaritasi}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.zoomBadge}>
                <Text style={styles.zoomBadgeText}>
                  🔍 Büyütmek için dokunun
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Bilgi */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📍 Harita Hakkında</Text>
            <Text style={styles.infoText}>
              Bu harita Türkiye genelindeki deprem tehlike seviyelerini
              göstermektedir. Kırmızı alanlar daha yüksek, sarı alanlar
              daha düşük riskli bölgeleri ifade eder.
            </Text>
          </View>

          {/* Uyarı */}
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Bilgilendirme amaçlıdır. Resmî veriler için AFAD ve
              Kandilli Rasathanesi esas alınmalıdır.
            </Text>
          </View>
        </ScrollView>

        {/* 🔍 TAM EKRAN MODAL */}
        <Modal visible={visible} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>✕ Kapat</Text>
            </Pressable>

            <Image
              source={fayHaritasi}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default RiskMaps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  header: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 22,
  },

  imageWrapper: {
    width: "100%",
    aspectRatio: IMAGE_ASPECT_RATIO,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  zoomBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  zoomBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },

  infoBox: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 24,
  },

  warningBox: {
    marginHorizontal: 16,
    marginBottom: 40,
    padding: 16,
    borderRadius: 15,
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },

  warningText: {
    fontSize: 14,
    color: "#92400E",
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  closeText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  fullImage: {
    width: screenWidth,
    height: screenHeight * 0.92,
  },
});
