import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "QuakeGuard Assistant nedir?",
    answer:
      "QuakeGuard Assistant, deprem öncesi, anı ve sonrasında kullanıcıyı bilgilendiren, yönlendiren ve psikolojik olarak destekleyen bir deprem asistanı uygulamasıdır.",
  },
  {
    id: 2,
    question: "Uygulama depremi nasıl algılıyor?",
    answer:
      "Uygulama, resmi deprem veri sağlayıcılarından (AFAD, Kandilli vb.) alınan anlık verileri kullanarak kullanıcıyı bilgilendirir.",
  },
  {
    id: 3,
    question: "Bildirimler ne kadar hızlı geliyor?",
    answer:
      "Bildirimler, veri kaynağı yayınladığı anda saniyeler içinde kullanıcıya ulaştırılacak şekilde tasarlanmıştır.",
  },
  {
    id: 4,
    question: "İnternet olmadan çalışır mı?",
    answer:
      "Hayati bilgilendirme içerikleri ve önceden yüklenen rehberler internet olmadan da görüntülenebilir. Canlı veriler için internet gereklidir.",
  },
  {
    id: 5,
    question: "Toplanma alanları nasıl belirleniyor?",
    answer:
      "Toplanma alanları, resmi kurumların yayımladığı açık veriler kullanılarak harita üzerinde gösterilir.",
  },
  {
    id: 6,
    question: "Harita konumumu takip ediyor mu?",
    answer:
      "Konum sadece kullanıcının isteğiyle alınır ve yalnızca en yakın toplanma alanını göstermek için kullanılır.",
  },
  {
    id: 7,
    question: "Panik Yönetimi Modu nedir?",
    answer:
      "Deprem anında kullanıcıyı sakinleştirmeye yönelik nefes egzersizleri, yönlendirmeler ve güven verici mesajlar sunan özel bir moddur.",
  },
  {
    id: 8,
    question: "Enerji & Şarj Yönetimi Asistanı ne işe yarar?",
    answer:
      "Deprem sonrası telefon bataryasını daha uzun süre kullanabilmeniz için ekran, bildirim ve kullanım önerileri sunar.",
  },
  {
    id: 9,
    question: "Uygulama çocuklar için güvenli mi?",
    answer:
      "Evet. Çocuklara özel deprem eğitimi içerikleri, sade dil ve görsellerle hazırlanmıştır.",
  },
  {
    id: 10,
    question: "Bilgilendirici videolar kimler için?",
    answer:
      "Videolar hem yetişkinler hem de çocuklar için ayrı kategoriler halinde sunulmaktadır.",
  },
  {
    id: 11,
    question: "Verilerim güvende mi?",
    answer:
      "Uygulama kişisel verileri saklamaz, paylaşmaz ve üçüncü taraflara aktarmaz.",
  },
  {
    id: 12,
    question: "Uygulama ücretli mi?",
    answer:
      "Hayır. QuakeGuard Assistant tamamen ücretsizdir ve kamu yararı amacıyla geliştirilmiştir.",
  },
  {
    id: 13,
    question: "Deprem çantası listesi var mı?",
    answer:
      "Evet. Uygulama içinde deprem çantası için önerilen temel ihtiyaçlar listelenmektedir.",
  },
  {
    id: 14,
    question: "Uygulama resmi kaynaklara dayanıyor mu?",
    answer:
      "Evet. Tüm bilgiler AFAD, Kandilli ve bilimsel kaynaklara dayalıdır.",
  },
  {
    id: 15,
    question: "Yanlış alarm verebilir mi?",
    answer:
      "Uygulama yalnızca resmi veri kaynaklarından gelen doğrulanmış bilgileri kullanır.",
  },
  {
    id: 16,
    question: "Deprem sonrası ne yapmalıyım?",
    answer:
      "Uygulama, deprem sonrası yapılması ve yapılmaması gerekenleri adım adım anlatır.",
  },
  {
    id: 17,
    question: "Aileme nasıl ulaşabilirim?",
    answer:
      "İletişim önerileri ve hatların yoğun olduğu durumlar için alternatif çözümler sunulur.",
  },
  {
    id: 18,
    question: "Uygulama arka planda çalışır mı?",
    answer:
      "Evet. Bildirimler için arka planda minimum kaynak kullanımıyla çalışır.",
  },
  {
    id: 19,
    question: "Uygulama sürekli güncelleniyor mu?",
    answer:
      "Evet. Yeni özellikler ve güncel bilgiler düzenli olarak eklenmektedir.",
  },
  {
    id: 20,
    question: "Geri bildirim gönderebilir miyim?",
    answer:
      "Evet. Uygulama içinden geri bildirim göndererek gelişime katkı sağlayabilirsiniz.",
  },
];

export default function FAQScreen() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Sık Sorulan Sorular" }} />

      <LinearGradient colors={["#f0f9ff", "#ffffff"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => toggleItem(item.id)}
                style={styles.card}
              >
                <View style={styles.questionRow}>
                  <Text style={styles.question}>{item.question}</Text>
                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#2563eb"
                  />
                </View>

                {isOpen && <Text style={styles.answer}>{item.answer}</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  answer: {
    marginTop: 12,
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
});
