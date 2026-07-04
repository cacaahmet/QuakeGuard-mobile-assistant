import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

/* ================= TYPES & CONSTANTS ================= */
type Level = "kolay" | "orta" | "zor";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  scenario: string;
};

const QUESTIONS: Record<Level, Question[]> = {
  kolay: [
    { question: "Deprem sırasında ilk yapılması gereken nedir?", options: ["Panik yapmak", "Koşarak dışarı çıkmak", "Çök-Kapan-Tutun"], correctIndex: 2, scenario: "Evdesin ve yer aniden sarsılmaya başladı." },
    { question: "Deprem anında cam kenarında durmak neden tehlikelidir?", options: ["Gürültü yapar", "Camlar kırılabilir", "Görüş azalır"], correctIndex: 1, scenario: "Salonun camlı bölümündesin." },
    { question: "Deprem sırasında asansör kullanılır mı?", options: ["Evet", "Hayır", "Sadece kısa süreli"], correctIndex: 1, scenario: "Apartman içinde deprem oldu." },
    { question: "Evde deprem sırasında neresi daha güvenlidir?", options: ["Balkon", "Kapı eşiği", "Sağlam masa altı"], correctIndex: 2, scenario: "Oturma odasındasın." },
    { question: "Deprem sırasında koşmak neden risklidir?", options: ["Yorucu", "Denge kaybı", "Zaman kaybı"], correctIndex: 1, scenario: "Koridordasın." },
    { question: "Deprem bittikten sonra ilk ne kontrol edilir?", options: ["Telefon", "Gaz ve elektrik", "Televizyon"], correctIndex: 1, scenario: "Sarsıntı durdu." },
    { question: "Artçı deprem nedir?", options: ["Ön sarsıntı", "Sonraki sarsıntı", "Rüzgâr"], correctIndex: 1, scenario: "Ana deprem geçti." },
    { question: "Deprem çantasında hangisi olmalı?", options: ["Oyuncak", "Su", "Kitap"], correctIndex: 1, scenario: "Hazırlık yapıyorsun." },
    { question: "Deprem sırasında bağırmak yerine ne yapılmalı?", options: ["Sessiz kalmak", "Enerji tasarrufu", "Kontrollü olmak"], correctIndex: 2, scenario: "Çevrende insanlar var." },
    { question: "Depremde en önemli şey nedir?", options: ["Hız", "Bilinç", "Cesaret"], correctIndex: 1, scenario: "Karar vermen gerekiyor." },
  ],
  orta: [
    { question: "Deprem anında mutfaktaysan ne yapmalısın?", options: ["Cam tutmak", "Tezgâh altına çökmek", "Balkona çıkmak"], correctIndex: 1, scenario: "Mutfakta cam eşyalar var." },
    { question: "Yatakta yakalanırsan ne yapmalısın?", options: ["Ayağa kalkmak", "Başı korumak", "Pencereye gitmek"], correctIndex: 1, scenario: "Gece deprem oldu." },
    { question: "Merdiven neden risklidir?", options: ["Dar", "Çökme riski", "Gürültülü"], correctIndex: 1, scenario: "Apartman içindesin." },
    { question: "Hasarlı binada ne yapılmalı?", options: ["İçeri gir", "Yetkilileri bekle", "Eşyaları al"], correctIndex: 1, scenario: "Duvarlarda çatlak var." },
    { question: "Açık alandaysan ne yapmalısın?", options: ["Binalardan uzak dur", "Binaya gir", "Araç altına gir"], correctIndex: 0, scenario: "Sokaktasın." },
    { question: "Telefon neden gereksiz kullanılmamalı?", options: ["Şarj biter", "Hatlar kilitlenir", "Gürültü"], correctIndex: 1, scenario: "Herkes telefonla konuşuyor." },
    { question: "Dolap devrilirse ne yapılmalı?", options: ["Tut", "Uzak dur", "Arkasına geç"], correctIndex: 1, scenario: "Dolap sallanıyor." },
    { question: "Toplanma alanı nedir?", options: ["Hastane", "Güvenli alan", "Okul"], correctIndex: 1, scenario: "Dışarı çıktın." },
    { question: "İlk yardım neden önemlidir?", options: ["Panik azaltır", "Hayat kurtarır", "Zaman kazandırır"], correctIndex: 1, scenario: "Yaralı biri var." },
    { question: "Artçılar neden tehlikelidir?", options: ["Küçük", "Yeni yıkım", "Ses"], correctIndex: 1, scenario: "Bina zaten hasarlı." },
  ],
  zor: [
    { question: "Gece deprem olursa ne yapılmalı?", options: ["Işık yak", "Fırla", "Başı koru"], correctIndex: 2, scenario: "Uykudasın." },
    { question: "Gaz kokusu alırsan ne yaparsın?", options: ["Kibrit", "Düğme", "Gazı kapat çık"], correctIndex: 2, scenario: "Mutfaktan koku geliyor." },
    { question: "Hasarlı binaya neden girilmez?", options: ["Yasak", "Artçı riski", "Karanlık"], correctIndex: 1, scenario: "Artçılar devam ediyor." },
    { question: "Araçtayken deprem olursa?", options: ["Hızlan", "Köprü altı", "Güvenli yerde dur"], correctIndex: 2, scenario: "Trafiktesin." },
    { question: "Enkaz altındaysan?", options: ["Sürekli bağır", "Rastgele hareket", "Enerji koru"], correctIndex: 2, scenario: "Sesler duyuyorsun." },
    { question: "Sosyal medya neden dikkatli kullanılmalı?", options: ["Yavaş", "Yanlış bilgi", "Zaman"], correctIndex: 1, scenario: "Herkes paylaşım yapıyor." },
    { question: "Toplanma alanının amacı?", options: ["Kalabalık", "Yardım", "Sohbet"], correctIndex: 1, scenario: "Yetkililer geliyor." },
    { question: "Ayakkabı neden giyilir?", options: ["Soğuk", "Cam-moloz", "Koşmak"], correctIndex: 1, scenario: "Yerler kırık." },
    { question: "Binaya ne zaman girilir?", options: ["Hemen", "Artçı bitince", "Yetkili izni"], correctIndex: 2, scenario: "Evin önündesin." },
    { question: "Deprem bilinci neden önemli?", options: ["Cesaret", "Doğru refleks", "Hız"], correctIndex: 1, scenario: "Hayat kurtarır." },
  ],
};

export default function QuizScreen() {
  const router = useRouter();
  const { level } = useLocalSearchParams<{ level: string }>();

  // HATAYI ENGELLEYEN KRİTİK NOKTA: Level kontrolü
  // Gelen parametreyi küçük harfe çevirip QUESTIONS içinde var mı diye bakıyoruz
  const validatedLevel: Level = (level && QUESTIONS[level.toLowerCase() as Level]) 
    ? (level.toLowerCase() as Level) 
    : "kolay";

  const questions = QUESTIONS[validatedLevel];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);

  const current = questions[index];

  const handleExitRequest = () => {
    Alert.alert(
      "Simülasyondan Ayrıl",
      "Eğitimi yarıda bırakmak üzeresin. Üsse geri dönmek istediğine emin misin?",
      [
        { text: "Vazgeç", style: "cancel" },
        { text: "Evet, Dön", style: "destructive", onPress: () => router.replace("/simulation") },
      ]
    );
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleExitRequest);
    return () => backHandler.remove();
  }, []);

  const handleSelect = (i: number) => {
    if (answered !== null) return;
    setAnswered(i);
    if (i === current.correctIndex) setScore((s) => s + 1);

    setTimeout(() => {
      setAnswered(null);
      setIndex((prev) => prev + 1);
    }, 1000);
  };

  const getFeedback = () => {
    if (score >= 9) return { emoji: "🌟", title: "Tam Bir Kahraman!", desc: "Mükemmel bir bilinç gösterdin. Hazırlıklısın!", color: "#22C55E" };
    if (score >= 7) return { emoji: "🛡️", title: "Oldukça Başarılı!", desc: "Temel kuralları iyi biliyorsun. Güvendesin.", color: "#F59E0B" };
    if (score >= 5) return { emoji: "⚠️", title: "Geliştirilebilir", desc: "Bazı kritik hatalar yaptın. Tekrar çözmelisin.", color: "#F97316" };
    return { emoji: "🆘", title: "Daha Fazla Eğitim!", desc: "Yanlış kararlar risk taşır. Lütfen kuralları gözden geçir.", color: "#EF4444" };
  };

  // Tüm sorular bittiyse Sonuç Ekranı
  if (!current) {
    const feedback = getFeedback();
    return (
      <LinearGradient colors={["#0F172A", "#1E1B4B", "#312E81"]} style={styles.fullScreenCenter}>
        <View style={[styles.resultCard, { borderColor: feedback.color + "40" }]}>
          <Text style={styles.resultEmoji}>{feedback.emoji}</Text>
          <Text style={[styles.resultTitle, { color: feedback.color }]}>{feedback.title}</Text>
          <Text style={styles.resultScore}>10 soruda {score} doğru</Text>
          <Text style={styles.resultDesc}>{feedback.desc}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: feedback.color }]} 
            onPress={() => router.replace("/simulation")}
          >
            <Text style={styles.retryButtonText}>Üsse Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#020617", "#0F172A", "#1E1B4B"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.pushedContent}>
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={handleExitRequest} style={styles.backButton}>
              <Ionicons name="chevron-back" size={20} color="#2DD4BF" />
              <Text style={styles.backText}>Geri Dön</Text>
            </TouchableOpacity>

            <View style={styles.progressLabelRow}>
              <Text style={styles.levelTag}>{validatedLevel.toUpperCase()} SEVİYE</Text>
              <Text style={styles.progressNumber}>{index + 1} / 10</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${(index + 1) * 10}%` }]} />
            </View>
          </View>

          <View style={styles.quizContent}>
            <View style={styles.scenarioBox}>
              <Text style={styles.scenarioTitle}>🛰️ DURUM ANALİZİ</Text>
              <Text style={styles.scenarioText}>{current.scenario}</Text>
            </View>

            <Text style={styles.questionText}>{current.question}</Text>

            <View style={styles.optionsList}>
              {current.options.map((opt, i) => {
                const isCorrect = i === current.correctIndex;
                const isSelected = i === answered;

                let cardStyle: any = { ...styles.optionCard };
                if (answered !== null) {
                  if (isCorrect) cardStyle = { ...cardStyle, ...styles.correctCard };
                  else if (isSelected) cardStyle = { ...cardStyle, ...styles.wrongCard };
                }

                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    style={cardStyle}
                    onPress={() => handleSelect(i)}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                    {answered !== null && isCorrect && <Ionicons name="checkmark-circle" size={20} color="#FFF" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fullScreenCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  pushedContent: { flex: 1, marginTop: height * 0.12 },
  headerArea: { paddingHorizontal: 25, marginBottom: 30 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 212, 191, 0.15)", 
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
  },
  backText: { color: "#2DD4BF", fontWeight: "800", marginLeft: 2, fontSize: 12 },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  levelTag: { color: "#94A3B8", fontSize: 12, fontWeight: "900", letterSpacing: 2 },
  progressNumber: { color: "#F8FAFC", fontSize: 14, fontWeight: "700" },
  progressBarBg: { height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10 },
  progressBarFill: { height: "100%", backgroundColor: "#6366F1", borderRadius: 10 },
  quizContent: { paddingHorizontal: 25 },
  scenarioBox: { 
    backgroundColor: "rgba(255,255,255,0.05)", 
    padding: 18, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 20
  },
  scenarioTitle: { color: "#818CF8", fontSize: 11, fontWeight: "900", marginBottom: 6 },
  scenarioText: { color: "#CBD5E1", fontSize: 15, lineHeight: 22 },
  questionText: { color: "#F8FAFC", fontSize: 24, fontWeight: "800", marginBottom: 30 },
  optionsList: { gap: 12 },
  optionCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  optionText: { color: "#E2E8F0", fontSize: 16, fontWeight: "600", flex: 1 },
  correctCard: { backgroundColor: "rgba(34, 197, 94, 0.25)", borderColor: "#22C55E" },
  wrongCard: { backgroundColor: "rgba(239, 68, 68, 0.25)", borderColor: "#EF4444" },
  resultCard: { width: width * 0.85, backgroundColor: "rgba(15, 23, 42, 0.95)", borderRadius: 30, padding: 35, alignItems: "center", borderWidth: 2 },
  resultEmoji: { fontSize: 80, marginBottom: 10 },
  resultTitle: { fontSize: 24, fontWeight: "900", marginBottom: 8, textAlign: 'center' },
  resultScore: { color: "#F8FAFC", fontSize: 18, fontWeight: "700", marginBottom: 15 },
  resultDesc: { color: "#94A3B8", fontSize: 15, textAlign: "center", marginBottom: 35 },
  retryButton: { paddingVertical: 18, paddingHorizontal: 40, borderRadius: 20, width: "100%", alignItems: "center" },
  retryButtonText: { color: "#FFF", fontSize: 16, fontWeight: "800" }
});