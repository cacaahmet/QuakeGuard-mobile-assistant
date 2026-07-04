import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* 📦 DATA - Dosya yollarınızın doğru olduğundan emin olun */
import cities from "@/assets/data/il.json";
import districts from "@/assets/data/ilce.json";

/* 🔑 API KEY */
const API_KEY = "7818f2003238863aa1ce9bdff1d3aeb0";

/* 🔤 TÜRKÇE → ASCII (Normalizasyon) */
const normalizeText = (text: string) => {
  return text
    .replace(/İ/g, "I")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
};

export default function Weather() {
  const [mode, setMode] = useState<"select" | "location" | "manual">("select");
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>();
  const [filteredDistricts, setFilteredDistricts] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* 🏙️ İL SEÇİLİNCE İLÇELERİ FİLTRELE */
  useEffect(() => {
    if (selectedCity) {
      // JSON'daki anahtar isminin (il_adi) doğruluğundan emin olun
      const list = districts.filter((d: any) => d.il_adi === selectedCity);
      setFilteredDistricts(list);
      setSelectedDistrict(undefined); // İl değişince ilçeyi sıfırla
    }
  }, [selectedCity]);

  /* 📍 KONUMA GÖRE HAVA DURUMU */
  const getWeatherByLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Hata", "Konum izni reddedildi.");
        setMode("select");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const { latitude, longitude } = location.coords;
      await fetchWeather(`lat=${latitude}&lon=${longitude}`);
    } catch (error) {
      Alert.alert("Hata", "Konum alınamadı. Lütfen konum servislerini açın.");
      setMode("select");
    } finally {
      setLoading(false);
    }
  };

  /* 🏙️ MANUEL SEÇİM SORGUSU */
  const getWeatherManual = () => {
    if (!selectedCity) {
      Alert.alert("Uyarı", "Lütfen bir il seçiniz");
      return;
    }

    // İlçe seçiliyse ilçeyi, değilse ili baz al
    const queryCity = normalizeText(selectedDistrict || selectedCity);
    fetchWeather(`q=${queryCity},TR`);
  };

  /* 🌦️ API FETCH */
  const fetchWeather = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=metric&lang=tr`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        Alert.alert("Hava durumu bulunamadı", "Girdiğiniz konum için veri alınamadı.");
      } else {
        setWeather(data);
      }
    } catch (error) {
      Alert.alert("Hata", "Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  /* 🏠 ANA EKRAN (SEÇİM) */
  if (mode === "select") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hava Durumu</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setMode("location");
            getWeatherByLocation();
          }}
        >
          <Ionicons name="location-outline" size={24} color="#2BB0A6" />
          <Text style={styles.optionText}>Konuma Göre Getir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => setMode("manual")}>
          <Ionicons name="map-outline" size={24} color="#2BB0A6" />
          <Text style={styles.optionText}>İl/İlçe Seçerek Ara</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  /* 🏙️ MANUEL SEÇİM EKRANI */
  if (mode === "manual" && !weather) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setMode("select")} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} />
           <Text>Geri Dön</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Konum Seçiniz</Text>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
            <Picker.Item label="İl seçiniz..." value={undefined} />
            {cities.map((c: any) => (
              <Picker.Item key={c.id || c.plaka} label={c.il_adi} value={c.il_adi} />
            ))}
          </Picker>
        </View>

        {selectedCity && (
          <View style={[styles.pickerContainer, { marginTop: 15 }]}>
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
            >
              <Picker.Item label="İlçe (Opsiyonel)" value={undefined} />
              {filteredDistricts.map((d: any) => (
                <Picker.Item key={d.id} label={d.ilce_adi} value={d.ilce_adi} />
              ))}
            </Picker>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={getWeatherManual}>
          <Text style={styles.buttonText}>Hava Durumunu Sorgula</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  /* 🌤️ SONUÇ EKRANI */
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress={() => { setWeather(null); setMode("select"); }} 
        style={styles.backButton}
      >
         <Ionicons name="close-circle-outline" size={24} />
         <Text> Aramayı Temizle</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#2BB0A6" style={{ marginTop: 50 }} />
      ) : weather ? (
        <View style={styles.resultCard}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description.toUpperCase()}</Text>
          
          <View style={styles.detailsRow}>
             <View style={styles.detailItem}>
                <Text style={styles.infoLabel}>Hissedilen</Text>
                <Text style={styles.infoValue}>{Math.round(weather.main.feels_like)}°C</Text>
             </View>
             <View style={styles.detailItem}>
                <Text style={styles.infoLabel}>Nem</Text>
                <Text style={styles.infoValue}>%{weather.main.humidity}</Text>
             </View>
             <View style={styles.detailItem}>
                <Text style={styles.infoLabel}>Rüzgar</Text>
                <Text style={styles.infoValue}>{weather.wind.speed} m/s</Text>
             </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8FAFC" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 30, color: "#1E293B", textAlign: 'center' },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: { marginLeft: 15, fontSize: 18, fontWeight: "600", color: "#334155" },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2BB0A6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    elevation: 5,
    marginTop: 20,
  },
  city: { fontSize: 32, fontWeight: "800", color: "#1E293B" },
  temp: { fontSize: 72, fontWeight: "800", color: "#2BB0A6", marginVertical: 10 },
  desc: { fontSize: 18, color: "#64748B", fontWeight: "600", letterSpacing: 1 },
  detailsRow: { flexDirection: "row", marginTop: 30, borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 20 },
  detailItem: { flex: 1, alignItems: "center" },
  infoLabel: { fontSize: 12, color: "#94A3B8", marginBottom: 4 },
  infoValue: { fontSize: 16, fontWeight: "700", color: "#334155" },
});