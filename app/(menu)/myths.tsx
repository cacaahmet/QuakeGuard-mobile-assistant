import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Tüm 20 Mit ve Gerçek Verisi
const earthquakeMyths = [
  // 1. Grup: Davranışlar
  { id: 1, myth: "Kapı eşiğinde durmak en güvenli yerdir.", truth: "Yanlış. Modern binalarda kapı eşikleri çevresindeki duvarlardan daha sağlam değildir. Kapı çarpabilir veya yıkılabilir. En güvenli yer sağlam bir nesnenin yanıdır.", icon: "door-outline" },
  { id: 2, myth: "Büyük bir depremde yer yarılır ve insanları yutar.", truth: "Yanlış. Depremler fay hatları boyunca kaymalara neden olur ancak filmlerdeki gibi dipsiz yarıklar açmaz. Yarıklar sadece yüzeydeki toprak kaymalarıdır.", icon: "earth-outline" },
  { id: 3, myth: "Deprem anında hemen dışarı koşmalıyım.", truth: "Yanlış. Sarsıntı sırasında hareket etmek düşmenize veya üzerinize cam, tabela düşmesine neden olur. İlk saniyelerde çıkışta değilseniz Çök-Kapan-Tutun yapın.", icon: "walk-outline" },
  { id: 4, myth: "Hayat üçgeni her zaman kurtarır.", truth: "Yanlış. Bu teori binaların tamamen 'tost' gibi yıkılacağını varsayar. Ancak çoğu yaralanma mobilya devrilmesiyle olur. Öncelik Çök-Kapan-Tutun ile hedef küçültmektir.", icon: "triangle-outline" },
  { id: 5, myth: "Deprem sırasında pencereleri açmak gerekir.", truth: "Yanlış. Pencereleri açmaya çalışmak zaman kaybıdır ve camların patlaması durumunda yüzünüzün yaralanma riskini artırır. Pencerelerden uzak durun.", icon: "browsers-outline" },
  { id: 6, myth: "Merdivenler kaçış için en güvenli yoldur.", truth: "Yanlış. Merdivenler binanın ana gövdesinden farklı esnerler ve depremde ilk çöken yerler genellikle merdiven boşluklarıdır.", icon: "trending-down-outline" },
  { id: 7, myth: "Asansörle hızlıca aşağı inebilirim.", truth: "Yanlış. Sarsıntı anında elektrikler kesilebilir veya raylar kayabilir; asansörde mahsur kalmak hayati tehlike yaratır.", icon: "business-outline" },
  
  // 2. Grup: Zaman ve Hava
  { id: 8, myth: "Deprem sadece gece olur.", truth: "Yanlış. Depremlerin saatle hiçbir ilgisi yoktur. Yer kabuğu 24 saat hareket halindedir.", icon: "moon-outline" },
  { id: 9, myth: "Deprem havası (aşırı sıcak/basık) vardır.", truth: "Yanlış. Depremler yerin kilometrelerce altında olur ve atmosferik olaylardan (sıcaklık, nem vb.) tamamen bağımsızdır.", icon: "thermometer-outline" },
  { id: 10, myth: "Küçük depremler büyük depremin enerjisini alır.", truth: "Yanlış. 7.0 büyüklüğündeki bir depremin enerjisini boşaltmak için yaklaşık 32.000 tane 4.0 büyüklüğünde deprem gerekir.", icon: "flash-outline" },
  { id: 11, myth: "Dolunay depremi tetikler.", truth: "Yanlış. Ay'ın çekim gücünün yer kabuğu üzerinde mikro etkisi olsa da, büyük depremleri tetiklediğine dair kanıt yoktur.", icon: "sunny-outline" },

  // 3. Grup: Tahmin ve Hayvanlar
  { id: 12, myth: "Hayvanlar depremi saatler öncesinden haber verir.", truth: "Yanlış. Hayvanlar insanların hissedemediği P dalgalarını saniyeler önce hissedebilir. Bu bir erken uyarı değil, depremin başladığının işaretidir.", icon: "paw-outline" },
  { id: 13, myth: "Depremler önceden kesin olarak tahmin edilebilir.", truth: "Yanlış. Bilim insanları bölge tahmini yapabilir ancak tam gün ve saat vermek bugün hiçbir teknolojiyle mümkün değildir.", icon: "time-outline" },
  { id: 14, myth: "Bazı insanlar vücut ağrılarıyla depremi hisseder.", truth: "Yanlış. Bu tamamen tesadüfi ve psikolojik bir durumdur. Günde binlerce mikro deprem olduğu için herhangi bir ağrı anında deprem olması istatistikseldir.", icon: "body-outline" },

  // 4. Grup: Şehir ve Yapı
  { id: 15, myth: "Sağlam zemin üzerindeki bina asla yıkılmaz.", truth: "Yanlış. Zemin önemlidir ancak bina mühendislik kurallarına aykırıysa, zemin ne kadar sert olursa olsun yıkılabilir.", icon: "construct-outline" },
  { id: 16, myth: "Binamın altından fay geçmiyorsa güvendeyim.", truth: "Yanlış. Sarsıntı merkezden yüzlerce kilometre uzağa yayılır. Önemli olan zemin yapısı ve binanın depreme dayanıklılığıdır.", icon: "map-outline" },
  { id: 17, myth: "Depremden sonra ana şalteri ve gazı kapatmak gerekmez.", truth: "Yanlış. Deprem sonrası yangınların çoğu gaz sızıntısı ve elektrik kontağından çıkar. Mutlaka kapatılmalıdır.", icon: "power-outline" },
  { id: 18, myth: "Eski binalar her zaman daha güvensizdir.", truth: "Yanlış. Binanın yaşı tek kriter değildir. İyi bakılmış eski bir bina, kötü inşa edilmiş yeni bir binadan daha güvenli olabilir.", icon: "home-outline" },
  { id: 19, myth: "Deprem çantası sadece enkaz altında kalmak içindir.", truth: "Yanlış. Çanta asıl sağ kurtulanlar içindir. Altyapının çöktüğü ilk 72 saatte gıda, su ve ilk yardım ihtiyacınızı karşılar.", icon: "bag-handle-outline" },
  { id: 20, myth: "Depremden hemen sonra telefonla arama yapmalıyız.", truth: "Yanlış. Şebekeler kilitlenir. Sadece internet tabanlı mesajlaşma veya SMS kullanılmalıdır.", icon: "call-outline" },
];

export default function MythsScreen() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Deprem Mitleri', 
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false 
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Mitler ve Gerçekler</Text>
          <Text style={styles.subtitle}>Doğru bildiğimiz yanlışlar hayatımızı riske atabilir. İşte bilimsel gerçekler:</Text>
        </View>

        {earthquakeMyths.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.9} 
            onPress={() => setActiveId(activeId === item.id ? null : item.id)}
            style={[styles.card, activeId === item.id && styles.activeCard]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: activeId === item.id ? '#e74c3c' : '#f8f9fa' }]}>
                <Ionicons 
                  name={item.icon as any} 
                  size={22} 
                  color={activeId === item.id ? '#fff' : '#e74c3c'} 
                />
              </View>
              <Text style={styles.mythText}>{item.myth}</Text>
              <Ionicons 
                name={activeId === item.id ? "chevron-up" : "chevron-forward"} 
                size={18} 
                color="#bdc3c7" 
              />
            </View>

            {activeId === item.id && (
              <View style={styles.details}>
                <View style={styles.line} />
                <View style={styles.truthRow}>
                  <Ionicons name="shield-checkmark" size={20} color="#27ae60" />
                  <Text style={styles.truthTitle}>BİLİMSEL GERÇEK</Text>
                </View>
                <Text style={styles.truthText}>{item.truth}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 20 },
  headerSection: { marginBottom: 25 },
  title: { fontSize: 26, fontWeight: '800', color: '#1a1a1a', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', lineHeight: 22 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activeCard: { borderColor: '#e74c3c', backgroundColor: '#fffefd' },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mythText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#2c3e50', lineHeight: 20 },
  details: { marginTop: 15 },
  line: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 15 },
  truthRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  truthTitle: { marginLeft: 8, fontSize: 12, fontWeight: 'bold', color: '#27ae60', letterSpacing: 0.5 },
  truthText: { fontSize: 14, color: '#444', lineHeight: 22, textAlign: 'justify' },
});