import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function PanicMode() {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">(
    "idle"
  );
  const [minutesPassed, setMinutesPassed] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  // Ses ve Zamanlayıcı Kurulumu
  useEffect(() => {
    let mounted = true;

    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("@/assets/sounds/calm.mp3"),
          { isLooping: true, volume: 0.5 }
        );
        if (mounted) {
          soundRef.current = sound;
          await sound.playAsync();
        }
      } catch (e) {
        console.log("Ses yüklenemedi");
      }
    };

    const timer = setInterval(() => setMinutesPassed((p) => p + 1), 60000);
    loadSound();

    return () => {
      mounted = false;
      soundRef.current?.unloadAsync();
      clearInterval(timer);
    };
  }, []);

  // 4-7-8 Nefes Döngüsü
  const startBreathing = () => {
    setPhase("inhale");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Animated.timing(scaleAnim, {
      toValue: 1.8,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      setPhase("hold");
      setTimeout(() => {
        setPhase("exhale");
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }).start(() => {
          setPhase("idle");
        });
      }, 7000);
    });
  };

  const getInstruction = () => {
    switch (phase) {
      case "inhale":
        return "Burnundan derin nefes al...";
      case "hold":
        return "Nefesini nazikçe tut...";
      case "exhale":
        return "Ağzından yavaşça üfle...";
      default:
        return "Hazırsan dokun, birlikte nefes alalım";
    }
  };

  return (
    <LinearGradient
      colors={["#F0F4F8", "#D9E2EC", "#BCCCDC"]}
      style={styles.container}
    >
      {/* ✅ Expo Router Stack Screen */}
      <Stack.Screen options={{ title: " Sakinleştirici Mod " }} />

      {/* Üst Bilgi Alanı */}
      <View style={styles.header}>
        <Text style={styles.timerBadge}>
          ⏰ {minutesPassed} dakikadır güvendesin
        </Text>
        <Text style={styles.mainTitle}>Sakinleşiyoruz...</Text>
      </View>

      {/* Ana Görsel Alan - Nefes Dairesi */}
      <View style={styles.centerSection}>
        <Animated.View
          style={[styles.outerCircle, { transform: [{ scale: scaleAnim }] }]}
        >
          <View style={styles.innerCircle}>
            <Text style={styles.phaseLabel}>
              {phase === "idle" ? "🧘" : phase.toUpperCase()}
            </Text>
          </View>
        </Animated.View>

        <Text style={styles.instructionText}>{getInstruction()}</Text>
      </View>

      {/* 5-4-3-2-1 Topraklama Egzersizi */}
      <View style={styles.groundingBox}>
        <Text style={styles.groundingTitle}>Şu an etrafında olan:</Text>
        <View style={styles.groundingRow}>
          <Text style={styles.groundingItem}>👁️ 5 nesne gör</Text>
          <Text style={styles.groundingItem}>👂 4 ses duy</Text>
          <Text style={styles.groundingItem}>🖐️ 3 doku hisset</Text>
        </View>
      </View>

      {/* Kontrol Butonu */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          phase !== "idle" && styles.disabledButton,
        ]}
        onPress={startBreathing}
        disabled={phase !== "idle"}
      >
        <Text style={styles.buttonText}>
          {phase === "idle" ? "Egzersizi Başlat" : "Odaklanmaya Devam Et"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        "Bu hisler geçici, sen kalıcısın."
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  header: {
    alignItems: "center",
  },
  timerBadge: {
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    color: "#486581",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#243B53",
    marginTop: 15,
  },
  centerSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    backgroundColor: "rgba(188, 204, 220, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: "#627D98",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  phaseLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  instructionText: {
    marginTop: 40,
    fontSize: 20,
    color: "#334E68",
    textAlign: "center",
    fontWeight: "500",
    height: 30,
  },
  groundingBox: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },
  groundingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#486581",
    marginBottom: 10,
    textAlign: "center",
  },
  groundingRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  groundingItem: {
    fontSize: 12,
    color: "#627D98",
    textAlign: "center",
  },
  actionButton: {
    backgroundColor: "#486581",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#9FB3C8",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerNote: {
    textAlign: "center",
    color: "#829AB1",
    fontStyle: "italic",
  },
});
