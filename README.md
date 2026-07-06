# 🛡️ QuakeGuard Assistant

> [cite_start]Deprem öncesi, sırası ve sonrasında ihtiyaç duyulabilecek hayati bilgi ve araçları tek bir platformda toplayan, hayat kurtarıcı akıllı afet yardım asistanı. [cite: 4488, 4490]

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

## 📱 Ekran Görüntüleri

| Ana Sayfa (Canlı Deprem Takibi) | Acil Durum & Düdük | Toplanma Alanları | Panik Yönetimi Modu |
|:---:|:---:|:---:|:---:|
| ![Ana Sayfa](Görsel_Yolu_1) | ![Acil Durum](Görsel_Yolu_2) | ![Harita](Görsel_Yolu_3) | ![Panik Modu](Görsel_Yolu_4) |

---

## ✨ Temel Özellikler

QuakeGuard Assistant, afet yönetimi ve kişisel güvenlik için uçtan uca çözümler sunar:

* [cite_start]🔴 **Canlı Deprem Takibi:** EMSC (Avrupa-Akdeniz Sismoloji Merkezi) API üzerinden anlık güncel deprem verilerinin harita ve liste görünümü[cite: 4520, 4987, 8946].
* [cite_start]🚨 **Tek Tuşla Acil Yardım (SOS):** Saniyeler içinde 112'yi arama ve enkaz altında yer bildirmek için entegre yüksek sesli düdük sistemi[cite: 4521, 4803, 4819].
* [cite_start]🏥 **Konum Bazlı Hizmetler:** GPS kullanılarak en yakın toplanma alanlarının, 100 KM çapındaki hastanelerin ve nöbetçi eczanelerin harita/liste üzerinden dinamik olarak bulunması[cite: 4522, 6918, 7822, 8886].
* [cite_start]🔋 **Akıllı Enerji Asistanı:** Afet sonrası kısıtlı şarjı korumak için sistem parlaklığını kontrol eden ve gereksiz tüketimi engelleyen donanımsal güç tasarruf modları[cite: 4549, 6208, 6246].
* [cite_start]🧘 **Panik Yönetimi Modu:** Kullanıcının sakin kalmasını sağlamak için sesli ve görsel bildirimlerle (Haptic feedback) desteklenen 4-7-8 nefes egzersizleri ve topraklama teknikleri[cite: 4548, 6732, 7553, 7555].
* [cite_start]👨‍👩‍👧 **Aile Acil Planı & Deprem Çantası:** Aile bireylerinin iletişim bilgilerini (AsyncStorage ile) cihazda tutma, toplanma noktası belirleme ve detaylı ilk yardım çantası kontrol listesi oluşturma[cite: 4553, 5420, 6449, 6450].
* [cite_start]📚 **Afet Bilinç Kütüphanesi:** Çök-Kapan-Tutun rehberleri, deprem mitleri/doğruları, bilgilendirici eğitim videoları ve canlı afet haberleri akışı[cite: 4577, 4579, 5958, 7139, 7300].

---

## 🛠️ Kullanılan Teknolojiler & Mimari

[cite_start]Uygulama, hem Android hem de iOS'ta tek kod tabanıyla yüksek performans sunmak üzere bileşen tabanlı, modüler bir mimariyle geliştirilmiştir[cite: 4495, 4514]. [cite_start]Dosya tabanlı yönlendirme (file-based routing) için **Expo Router** tercih edilmiştir[cite: 4497].

| Kategori | Teknoloji / Kütüphane | Kullanım Amacı |
| :--- | :--- | :--- |
| **Frontend Framework** | React Native & Expo | [cite_start]Çapraz platform geliştirme ve donanım API erişimi[cite: 4495, 4496]. |
| **Navigasyon** | Expo Router | [cite_start]Dosya tabanlı, modüler ekran yönetimi[cite: 4497, 4516]. |
| **Durum Yönetimi** | Redux Toolkit & React-Redux | [cite_start]Uygulama içi global verilerin merkezi yönetimi[cite: 4511, 4512]. |
| **Lokal Depolama** | AsyncStorage | [cite_start]Aile planı, rehber ve çevrimdışı ayarların cihazda saklanması[cite: 4509, 6421]. |
| **Donanım & Medya** | Expo-AV, Battery, Location | [cite_start]Ses çalma (düdük/nefes), pil durumu analizi ve GPS konumu alma[cite: 4496, 4500, 4501, 4503]. |
| **Harita & UI** | React Native Maps, Leaflet | [cite_start]Deprem merkez üsleri ve toplanma alanlarının görselleştirilmesi[cite: 4505, 4506, 8886]. |
| **Veri Kaynakları** | EMSC API, NewsAPI | [cite_start]Gerçek zamanlı sismik hareketler ve son dakika haberleri[cite: 4629, 7273, 8946]. |

---

## 🚀 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda yerel olarak çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### Ön Koşullar
* Node.js (v16 veya üzeri önerilir)
* npm veya yarn
* Expo CLI (`npm install -g expo-cli`)
* Fiziksel cihaz testleri için telefonunuzda **Expo Go** uygulaması

### Adımlar

1. **Projeyi Klonlayın:**
   ```bash
   git clone [https://github.com/KULLANICI_ADINIZ/quakeguard-assistant.git](https://github.com/KULLANICI_ADINIZ/quakeguard-assistant.git)
   cd quakeguard-assistant

   Gerekli Paketleri Yükleyin:Bashnpm install
# veya
yarn install
Uygulamayı Başlatın:Bashnpx expo start
Çalıştırma:Açılan terminaldeki veya tarayıcıdaki QR kodu, telefonunuzdaki Expo Go uygulaması ile okutarak projeyi anında test edebilirsiniz.💡 Kullanım DetaylarıAcil Durum Paneli: Alt sekme çubuğundaki (Tab Bar) kırmızı ACİL butonuna basarak her an 112'yi arayabilir veya göçük altında kalma senaryosu için "Düdük Çal" fonksiyonunu aktif edebilirsiniz.  Pil ve Enerji Yönetimi: Menü üzerinden "Enerji & Şarj Yönetimi"ne girdiğinizde, sistem parlaklığını otomatik %10'a çeken 'Ultra Mod'u açarak afet sonrası cihazınızın kapanmasını geciktirebilirsiniz.  Konum İzinleri: Yakındaki hastaneleri ve toplanma alanlarını listelemek için uygulamanın konum izinlerine onay vermeniz gerekmektedir.  🤝 Katkıda Bulunma (Contributing)QuakeGuard Assistant, geliştirilmeye ve büyütülmeye açık bir projedir. Katkıda bulunmak isterseniz:  Bu depoyu (repository) forklayın.Yeni bir özellik dalı oluşturun (git checkout -b feature/YeniOzellik).Değişikliklerinizi commit edin (git commit -m 'Harika bir yeni özellik eklendi').Dalınızı (branch) gönderin (git push origin feature/YeniOzellik).Bir Pull Request (Çekme İsteği) oluşturun.Gelecek planları arasında; gerçek zamanlı push bildirimleri (erken uyarı), offline çalışma desteklerinin artırılması ve resmi kurum API'leriyle tam entegrasyon hedeflenmektedir.   📄 LisansBu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına göz atabilirsiniz.📬 İletişim & GeliştiriciAhmet ÇAÇA   Eğer projeyle ilgili sorularınız, önerileriniz veya iş birliği fikirleriniz varsa benimle bağlantı kurmaktan çekinmeyin:💼 LinkedIn: [Profil Linkinizi Buraya Ekleyin]🐙 GitHub: [https://github.com/KULLANICI_ADINIZ]✉️ E-posta: [E-posta Adresinizi Buraya Ekleyin]Güvenli, bilinçli ve afetlere her an hazırlıklı yarınlar için geliştirildi.
Bu `README.md` dosyası, QuakeGuard projenin ne kadar kapsamlı ve detaylı olduğunu mükemmel 
