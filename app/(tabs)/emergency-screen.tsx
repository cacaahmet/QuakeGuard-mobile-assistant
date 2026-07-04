import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmergencyScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  /*  Ses Modu Ayarları  */
  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Ses modu ayarlanırken hata:", error);
      }
    };

    configureAudio();

    // Component kapanınca sesi temizle
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  /*  112 ACİL ARAMA */
  const handleEmergencyPress = () => {
    Linking.openURL("tel:112");
  };

  /*  Düdük Çal / Durdur */
  const handleWhistlePress = async () => {
    try {
     
      if (isPlaying && soundRef.current) {
        await soundRef.current.stopAsync();
        setIsPlaying(false);
        return;
      }

      // Önce eski sesi temizle
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // Yeni sesi yükle
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/images/deprem.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
          volume: 1.0,
        }
      );

      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.error("Düdük sesi çalınamadı:", error);
      Alert.alert("Hata", "Ses dosyası oynatılamadı.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*  ÜST KISIM – 112 ACİL */}
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>🚨 Acil Durum</Text>
          <Text style={styles.description}>
            Hayati tehlike anında tek dokunuşla yardım iste.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={handleEmergencyPress}
          activeOpacity={0.85}
        >
          <Ionicons name="call" size={52} color="#fff" />
          <Text style={styles.buttonText}>112 ACİL ARA</Text>
        </TouchableOpacity>
      </View>

      {/* AYIRICI */}
      <View style={styles.separator} />

      {/*  ALT KISIM – DÜDÜK */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[
            styles.whistleButton,
            isPlaying && styles.whistleButtonActive,
          ]}
          onPress={handleWhistlePress}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons
            name={isPlaying ? "stop-circle" : "whistle"}
            size={62}
            color="#8B0000"
          />
          <Text style={[styles.buttonText, { color: "#8B0000" }]}>
            {isPlaying ? "DURDUR" : "DÜDÜK ÇAL"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.subDescription}>
          Enkaz altında veya yerinizi belli etmek için kullanın.
        </Text>
      </View>
    </SafeAreaView>
  );
}

/*  STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#8B0000",
    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },

  subDescription: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },

  emergencyButton: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#B22222",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },

  whistleButton: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "#8B0000",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  whistleButtonActive: {
    backgroundColor: "#FFEBEE",
    borderColor: "#FF0000",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 12,
    textAlign: "center",
    color: "#fff",
  },

  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    width: "85%",
    alignSelf: "center",
  },
});