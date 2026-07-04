import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function NetworkScreen() {
  const router = useRouter();

  const emergencyLines = [
    { title: "Psikososyal Destek Hattı", phone: "4440632", desc: "Aile ve Sosyal Hizmetler Bakanlığı" },
    { title: "Kızılay Sağlık Hattı", phone: "168", desc: "Psikolojik İlkyardım ve Bilgi" },
  ];

  const organizations = [
    {
      name: "Türk Psikologlar Derneği",
      desc: "Gönüllü psikolog ağı ve travma çalışmaları.",
      icon: "account-star",
      url: "https://www.psikolog.org.tr/",
      color: "#6C63FF",
    },
    {
      name: "EMDR Derneği Türkiye",
      desc: "Travma iyileştirme grubu ve ücretsiz destekler.",
      icon: "brain",
      url: "https://www.emdr-tr.org/",
      color: "#4ECDC4",
    },
    {
      name: "Türkiye Psikiyatri Derneği",
      desc: "Afet sonrası ruh sağlığı rehberleri ve ağları.",
      icon: "hospital-marker",
      url: "https://psikiyatri.org.tr/",
      color: "#FF8A65",
    },
  ];

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleOpenWeb = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Değiştirilen Ağ Temalı Başlık Kartı */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconContainer}>
            <View style={styles.pulseCircle} />
            <Ionicons name="earth" size={32} color="#FFF" />
          </View>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Dayanışma Ağı</Text>
            <Text style={styles.heroSubtitle}>
              İhtiyaç duyduğunuz her an uzman desteğine tek dokunuşla ulaşın.
            </Text>
          </View>
        </View>

        {/* Acil Hatlar Bölümü */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>Acil Destek Hatları</Text>
        </View>

        {emergencyLines.map((line, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.emergencyCard}
            onPress={() => handleCall(line.phone)}
            activeOpacity={0.7}
          >
            <View style={styles.emergencyInfo}>
              <Text style={styles.emergencyTitle}>{line.title}</Text>
              <Text style={styles.emergencyDesc}>{line.desc}</Text>
              <Text style={styles.phoneText}>{line.phone}</Text>
            </View>
            <View style={styles.callIconCircle}>
              <Ionicons name="call" size={24} color="#FFF" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Kurumsal Destekler Bölümü */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <View style={[styles.sectionDot, { backgroundColor: '#6C63FF' }]} />
          <Text style={styles.sectionTitle}>Profesyonel Destek Kanalları</Text>
        </View>
        <Text style={styles.subtitle}>Resmi kurumlar ve dernekler aracılığıyla ücretsiz gönüllü desteğine başvurabilirsiniz.</Text>

        {organizations.map((org, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.orgCard}
            onPress={() => handleOpenWeb(org.url)}
            activeOpacity={0.6}
          >
            <View style={[styles.orgIconBox, { backgroundColor: org.color + "15" }]}>
              <MaterialCommunityIcons name={org.icon as any} size={28} color={org.color} />
            </View>
            <View style={styles.orgTextContent}>
              <Text style={styles.orgName}>{org.name}</Text>
              <Text style={styles.orgDesc}>{org.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
          </TouchableOpacity>
        ))}

        {/* Uyarı Kutusu */}
        <View style={styles.warningBox}>
          <View style={styles.warningIconBg}>
            <Ionicons name="shield-checkmark" size={20} color="#6C63FF" />
          </View>
          <Text style={styles.warningText}>
            Lütfen yalnızca resmi kurumlar tarafından onaylanmış uzmanlarla iletişime geçin. Güvenliğiniz önceliğimizdir.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  content: { 
    padding: 20,
    paddingTop: 60
  },
  /* Hero Başlık Kartı Tasarımı - Ağ Temalı */
  heroCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8A65',
  },
  heroIconContainer: {
    width: 65,
    height: 65,
    backgroundColor: "#FF8A65", // Ağ temasına uygun mavi/mor tonu
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },
  pulseCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
  },
  heroTextContainer: { flex: 1 },
  heroTitle: { fontSize: 24, fontWeight: "900", color: "#2D3436" },
  heroSubtitle: { fontSize: 13, color: "#636E72", marginTop: 4, lineHeight: 18 },
  
  /* Bölüm Başlıkları */
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E74C3C', marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#2D3436" },
  subtitle: { fontSize: 13, color: "#636E72", marginBottom: 15, lineHeight: 18 },

  /* Acil Kart Tasarımı */
  emergencyCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  emergencyInfo: { flex: 1 },
  emergencyTitle: { fontSize: 15, fontWeight: "700", color: "#2D3436" },
  emergencyDesc: { fontSize: 11, color: "#636E72", marginTop: 2 },
  phoneText: { fontSize: 19, fontWeight: "900", color: "#E74C3C", marginTop: 6 },
  callIconCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: "#E74C3C", 
    justifyContent: "center", 
    alignItems: "center",
    shadowColor: "#E74C3C",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },

  /* Organizasyon Kartları */
  orgCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F2F6'
  },
  orgIconBox: { width: 50, height: 50, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  orgTextContent: { flex: 1, marginLeft: 15, marginRight: 8 },
  orgName: { fontSize: 14, fontWeight: "700", color: "#2D3436" },
  orgDesc: { fontSize: 11, color: "#B2BEC3", marginTop: 2 },

  /* Uyarı Kutusu */
  warningBox: {
    marginTop: 25,
    backgroundColor: "#F0F3FF",
    padding: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#DDE4FF",
    marginBottom: 30
  },
  warningIconBg: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warningText: { flex: 1, fontSize: 12, color: "#4834D4", lineHeight: 18, fontWeight: '500' },
});