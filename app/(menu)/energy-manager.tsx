import * as Battery from "expo-battery";
import * as Brightness from "expo-brightness";
import { Stack } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

type RiskConfig = {
  screenBg: string;
  cardBg: string;
  text: string;
  accent: string;
  level: string;
  advice: string[];
};

export default function EnergyManagerScreen() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [powerSave, setPowerSave] = useState(false);
  const [ultraSave, setUltraSave] = useState(false);
  const [smartBrightness, setSmartBrightness] = useState(false);
  const [originalBrightness, setOriginalBrightness] = useState(0.5);

  // Başlangıç verilerini al ve izinleri kontrol et
  useEffect(() => {
    (async () => {
      // Parlaklık değiştirme izni al
      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("İzin Gerekli", "Sistem parlaklığını değiştirmek için izin vermeniz gerekiyor.");
      }

      // Mevcut pil seviyesini al
      const currentBattery = await Battery.getBatteryLevelAsync();
      setBatteryLevel(Math.round(currentBattery * 100));

      // Uygulama açıldığındaki parlaklığı kaydet
      const currentBright = await Brightness.getBrightnessAsync();
      setOriginalBrightness(currentBright);
    })();

    const sub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(Math.round(batteryLevel * 100));
    });

    return () => sub.remove();
  }, []);

  // 1. Seçenek: Güç Tasarrufu (Yazılımsal/Simüle)
  const togglePowerSave = (value: boolean) => {
    setPowerSave(value);
    if (value) setUltraSave(false);
  };

  // 2. Seçenek: Ultra Mod
  const toggleUltraSave = (value: boolean) => {
    setUltraSave(value);
    if (value) {
      setPowerSave(true);
      setSmartBrightness(true);
      handleBrightnessControl(true);
    }
  };

  // 3. Seçenek: Akıllı Parlaklık (SİSTEM GENELİ)
  const handleBrightnessControl = async (value: boolean) => {
    setSmartBrightness(value);
    try {
      if (value) {
        // Mevcut parlaklığı sakla ve %10'a düşür
        const current = await Brightness.getBrightnessAsync();
        setOriginalBrightness(current);
        await Brightness.setBrightnessAsync(0.1); 
      } else {
        // Eski parlaklık değerine geri dön
        await Brightness.setBrightnessAsync(originalBrightness);
      }
    } catch (e) {
      console.log("Parlaklık değiştirilemedi:", e);
    }
  };

  const risk: RiskConfig = useMemo(() => {
    if (batteryLevel >= 80) {
      return {
        screenBg: "#0B3D2E", cardBg: "rgba(27, 94, 32, 0.4)",
        text: "#E8F5E9", accent: "#76FF03", level: "GÜVENLİ",
        advice: ["Sistem tam performansta.", "Her şey yolunda görünüyor."],
      };
    }
    if (batteryLevel >= 40) {
      return {
        screenBg: "#0D1B2A", cardBg: "rgba(27, 38, 59, 0.5)",
        text: "#E3F2FD", accent: "#64B5F6", level: "DENGELİ",
        advice: ["Arka plan verilerini kısıtlayın.", "Gereksiz ağları kapatın."],
      };
    }
    return {
      screenBg: "#1A0000", cardBg: "rgba(183, 28, 28, 0.3)",
      text: "#FFEBEE", accent: "#FF5252", level: "KRİTİK",
      advice: ["Tüm tasarruf modlarını açın.", "Acil çağrılar dışında kullanmayın."],
    };
  }, [batteryLevel]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: risk.screenBg }]}>
      <Stack.Screen 
        options={{
          headerTitle: "Akıllı Enerji",
          headerStyle: { backgroundColor: risk.screenBg },
          headerTintColor: risk.text,
          headerShadowVisible: false,
        }} 
      />
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Batarya Paneli */}
        <View style={[styles.mainCard, { backgroundColor: risk.cardBg, borderColor: risk.accent + '33' }]}>
          <Text style={[styles.label, { color: risk.text }]}>PİL DURUMU</Text>
          <Text style={[styles.batteryText, { color: risk.accent }]}>%{batteryLevel}</Text>
          
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: `${batteryLevel}%`, backgroundColor: risk.accent }]} />
          </View>

          <View style={[styles.badge, { backgroundColor: risk.accent }]}>
            <Text style={styles.badgeText}>{risk.level}</Text>
          </View>
        </View>

        {/* 3 Ana Kontrol Seçeneği */}
        <View style={[styles.glassCard, { backgroundColor: risk.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: risk.accent }]}>Yönetim Merkezi</Text>
          
          {/* Güç Tasarrufu */}
          <View style={styles.controlRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.controlLabel, { color: risk.text }]}>Güç Tasarrufu</Text>
              <Text style={[styles.subLabel, { color: risk.text }]}>Yazılımsal optimizasyon</Text>
            </View>
            <Switch 
                value={powerSave} 
                onValueChange={togglePowerSave}
                trackColor={{ false: "#333", true: risk.accent }}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: risk.text }]} />

          {/* Akıllı Parlaklık - SİSTEM GENELİ */}
          <View style={styles.controlRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.controlLabel, { color: risk.text }]}>Akıllı Parlaklık</Text>
              <Text style={[styles.subLabel, { color: risk.text }]}>Sistem parlaklığını %10 yapar</Text>
            </View>
            <Switch 
                value={smartBrightness} 
                onValueChange={handleBrightnessControl}
                trackColor={{ false: "#333", true: risk.accent }}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: risk.text }]} />

          {/* Ultra Mod */}
          <View style={styles.controlRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.controlLabel, { color: risk.text }]}>Ultra Mod</Text>
              <Text style={[styles.subLabel, { color: risk.text }]}>Tüm sistemleri kısıtlar</Text>
            </View>
            <Switch 
                value={ultraSave} 
                onValueChange={toggleUltraSave}
                trackColor={{ false: "#333", true: "#FF5252" }}
            />
          </View>
        </View>

        {/* Dinamik Tavsiyeler */}
        <View style={[styles.glassCard, { backgroundColor: risk.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: risk.accent }]}>Analiz Önerileri</Text>
          {risk.advice.map((item, i) => (
            <View key={i} style={styles.adviceRow}>
              <View style={[styles.dot, { backgroundColor: risk.accent }]} />
              <Text style={[styles.adviceText, { color: risk.text }]}>{item}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  mainCard: {
    padding: 30,
    borderRadius: 35,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15 },
      android: { elevation: 10 }
    })
  },
  label: { fontSize: 13, fontWeight: "bold", letterSpacing: 2, opacity: 0.6 },
  batteryText: { fontSize: 84, fontWeight: "900", marginVertical: 5 },
  barContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginVertical: 20,
    overflow: 'hidden'
  },
  barFill: { height: '100%', borderRadius: 4 },
  badge: { paddingHorizontal: 20, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: "#000", fontWeight: "bold", fontSize: 12 },
  glassCard: {
    padding: 22,
    borderRadius: 28,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 20 },
  controlRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  controlLabel: { fontSize: 16, fontWeight: "700" },
  subLabel: { fontSize: 12, opacity: 0.5, marginTop: 4 },
  divider: { height: 1, opacity: 0.05, marginVertical: 15 },
  adviceRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 15 },
  adviceText: { fontSize: 14, fontWeight: "500" }
});