import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const playlist = [
  {
    id: "1",
    title: "Güvende Hissetme Meditasyonu",
    duration: "03:20",
    desc: "Bedenini şimdiye ve buraya getiren telkinler.",
    icon: "leaf",
    color: "#6AB04C",
  },
  {
    id: "2",
    title: "Kaygıyı Yatıştıran Nefes",
    duration: "02:45",
    desc: "4-7-8 tekniği ile sinir sistemini sakinleştir.",
    icon: "air-filter",
    color: "#4A90E2",
  },
  {
    id: "3",
    title: "Uyku Öncesi Rahatlama",
    duration: "05:10",
    desc: "Kabusları ve zihin karmaşasını dindirmek için.",
    icon: "moon-waning-crescent",
    color: "#A29BFE",
  },
];

export default function AudioSupportScreen() {
  const router = useRouter();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    if (playingId === id) setPlayingId(null);
    else setPlayingId(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Şu An Çalıyor Kartı (Vizyoner Player) */}
        <View style={styles.nowPlayingCard}>
          <View style={styles.playerArt}>
            <MaterialCommunityIcons 
              name={playingId ? "waveform" : "headphones"} 
              size={60} 
              color="#FFF" 
            />
          </View>
          <Text style={styles.nowPlayingTitle}>
            {playingId 
              ? playlist.find(i => i.id === playingId)?.title 
              : "Dinlemek için bir kayıt seçin"}
          </Text>
          <Text style={styles.nowPlayingArtist}>Uzman Klinik Psikolog Rehberliğinde</Text>
          
          {/* Progress Bar Simülasyonu */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressFill, { width: playingId ? '35%' : '0%' }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>00:00</Text>
              <Text style={styles.timeText}>03:20</Text>
            </View>
          </View>

          <View style={styles.playerControls}>
            <Ionicons name="play-back" size={32} color="#FFF" />
            <TouchableOpacity 
              style={styles.playBtnLarge}
              onPress={() => playingId && togglePlay(playingId)}
            >
              <Ionicons name={playingId ? "pause" : "play"} size={40} color="#686DE0" />
            </TouchableOpacity>
            <Ionicons name="play-forward" size={32} color="#FFF" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Sesli Rehber Kütüphanesi</Text>

        {/* Playlist Items */}
        {playlist.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.audioItem, playingId === item.id && styles.activeAudioItem]}
            onPress={() => togglePlay(item.id)}
          >
            <View style={[styles.itemIcon, { backgroundColor: item.color + "20" }]}>
              <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.itemTextContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
            <View style={styles.itemMeta}>
              <Text style={styles.itemDuration}>{item.duration}</Text>
              <Ionicons 
                name={playingId === item.id ? "pause-circle" : "play-circle"} 
                size={30} 
                color={playingId === item.id ? "#686DE0" : "#B2BEC3"} 
              />
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.audioInfoBox}>
          <Text style={styles.audioInfoText}>
            Kulaklık takmanız, dış dünyadan kopup kendinize odaklanmanızı kolaylaştıracaktır. 🎧
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F3FF" },
  content: { 
    padding: 20,
    paddingTop: 60 // Header kalktığı için sistem çubuğu mesafesi
  },
  nowPlayingCard: {
    backgroundColor: "#686DE0",
    borderRadius: 30,
    padding: 25,
    alignItems: "center",
    elevation: 15,
    shadowColor: "#686DE0",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginBottom: 30,
  },
  playerArt: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  nowPlayingTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", textAlign: "center" },
  nowPlayingArtist: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 5 },
  progressContainer: { width: '100%', marginTop: 20 },
  progressBarBg: { height: 4, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: "#FFF", borderRadius: 2 },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  timeText: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
  playerControls: { flexDirection: "row", alignItems: "center", gap: 30, marginTop: 20 },
  playBtnLarge: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: "#FFF", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#2D3436", marginBottom: 15 },
  audioItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  activeAudioItem: { borderWidth: 1, borderColor: "#686DE0" },
  itemIcon: { width: 50, height: 50, borderRadius: 15, justifyContent: "center", alignItems: "center" },
  itemTextContent: { flex: 1, marginLeft: 15 },
  itemTitle: { fontSize: 15, fontWeight: "700", color: "#2D3436" },
  itemDesc: { fontSize: 11, color: "#B2BEC3", marginTop: 2 },
  itemMeta: { alignItems: "center", gap: 5 },
  itemDuration: { fontSize: 11, color: "#B2BEC3" },
  audioInfoBox: { 
    marginTop: 20, 
    padding: 15, 
    borderRadius: 15, 
    backgroundColor: "rgba(104, 109, 224, 0.1)", 
    borderStyle: 'dashed', 
    borderWidth: 1, 
    borderColor: '#686DE0' 
  },
  audioInfoText: { textAlign: "center", fontSize: 13, color: "#686DE0", fontStyle: 'italic' }
});