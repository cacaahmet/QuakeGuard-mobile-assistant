# 🌍 QuakeGuard Assistant

### Deprem Öncesi, Sırası ve Sonrasında Yanınızda

*Panik anında doğru davranışları hatırlatan, güncel deprem verilerini takip eden ve acil durumlarda hızlıca yardım çağırmanızı sağlayan çok fonksiyonlu mobil afet yardım uygulaması.*

[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](#)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?style=for-the-badge)](#)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](#)

</div>

---

## 📑 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Projenin Amacı](#-projenin-amacı)
- [Kullanılan Teknolojiler](#-kullanılan-teknolojiler)
- [Uygulama Mimarisi](#-uygulama-mimarisi)
- [Özellikler](#-özellikler)
- [Kullanıcı Arayüzü (UI/UX)](#-kullanıcı-arayüzü-uiux)
- [Backend Yapısı](#-backend-yapısı)
- [Kurulum](#-kurulum)
- [Sonuç ve Değerlendirme](#-sonuç-ve-değerlendirme)
- [Yol Haritası](#-yol-haritası)
- [Geliştirici](#-geliştirici)

---

## 📱 Proje Hakkında

**QuakeGuard Assistant**, deprem öncesi, sırası ve sonrasında kullanıcıya bilgi, yönlendirme ve acil destek sunmayı amaçlayan çok fonksiyonlu bir **mobil afet yardım uygulamasıdır**. Uygulama, olası bir deprem anında kullanıcının ihtiyaç duyabileceği tüm kritik araçları tek bir platformda birleştirir.

> 🎓 **Öğrenci No:** 220912021 &nbsp;|&nbsp; **Adı Soyadı:** Ahmet Çaça

---

## 🎯 Projenin Amacı

Bu proje, deprem öncesi, sırası ve sonrasında kullanıcıların ihtiyaç duyabileceği temel bilgi ve araçları tek bir platformda toplamak amacıyla geliştirilmiştir.

Uygulama;

- 🧠 Panik anında doğru davranışların hatırlatılmasını,
- 📡 Güncel deprem bilgilerinin takip edilmesini,
- 🆘 Acil durumlarda hızlıca yardım çağrılabilmesini

sağlayan önemli ihtiyaçlara çözüm sunar. Ayrıca **toplanma alanları**, **ilk yardım çantası kontrolü**, **yakın hastaneler**, **acil durumlar için nöbetçi eczaneler**, **önceden hazırlanabilecek acil planlar**, **deprem simülasyonları** ve daha birçok özellik ile kullanıcıların afetlere daha hazırlıklı ve bilinçli olmalarını sağlamayı hedefler.

---

## 🛠 Kullanılan Teknolojiler

**Geliştirme Ortamı:** Visual Studio Code (VS Code)

Uygulama, **React Native** altyapısı kullanılarak geliştirilmiştir. Bu sayede uygulama hem **Android** hem de **iOS** platformlarında tek bir kod tabanı üzerinden çalışabilmektedir. Geliştirme sürecini daha hızlı ve verimli hale getirmek için **Expo** kullanılmış, böylece cihazın ses, konum, pil ve parlaklık gibi donanım özelliklerine kolayca erişim sağlanmıştır. Uygulama içerisindeki sayfa geçişleri ve ekran yapısı ise **Expo Router** ile yönetilmiş, bu sayede düzenli, okunabilir ve modüler bir navigasyon yapısı oluşturulmuştur.

### 📦 Kullanılan Diğer Kütüphaneler

| Kütüphane | Kütüphane |
|---|---|
| `expo-av` | `@react-native-async-storage/async-storage` |
| `expo-battery` | `react-native-volume-manager` |
| `expo-brightness` | `@reduxjs/toolkit` |
| `expo-location` | `react-redux` |
| `expo-linear-gradient` | |
| `react-native-maps` | |
| `leaflet` | |
| `react-leaflet` | |
| `@react-native-picker/picker` | |

---

## 🏗 Uygulama Mimarisi

Uygulama, **modüler ve bileşen tabanlı bir mimari** ile geliştirilmiştir.

- Uygulama; **ana ekran**, **acil durum** ve **menü** bölümleri olacak şekilde bölümlere ayrılmıştır.
- Sayfa yapısı ve yönlendirmeler **Expo Router** kullanılarak **dosya tabanlı** olarak organize edilmiştir.
- Ortak kullanılan bileşenler, ekranlar ve yardımcı fonksiyonlar ayrı klasörlerde tutularak kodun **okunabilirliği ve sürdürülebilirliği** sağlanmıştır.

Bu yapı sayesinde uygulama kolayca geliştirilebilir ve yeni özellikler eklenebilir hale getirilmiştir.

```
📁 proje-kök-dizini
├── 📁 app/                # Expo Router — dosya tabanlı sayfa yapısı
│   ├── 📁 (ana-sayfa)/
│   ├── 📁 (acil-durum)/
│   └── 📁 (menu)/
├── 📁 components/         # Ortak/paylaşılan bileşenler
├── 📁 store/              # Redux Toolkit ile durum yönetimi
├── 📁 services/           # Harici API çağrıları ve veri işleme
├── 📁 assets/             # Görseller, ikonlar, medya dosyaları
└── 📁 utils/              # Yardımcı fonksiyonlar
```

---

## ✨ Özellikler

<table>
<tr>
<td width="50%" valign="top">

### 🏠 Ana Sayfa
- 📊 Güncel deprem verilerinin **liste** ve **harita** üzerinden görüntülenmesi
- 📰 Haberler
- 🩹 Nöbetçi eczane sorgulama (şehir/ilçe bazlı arama ve arama tuşu)

### 🆘 Acil Durum
- ☎️ Tek tuşla **112 arama**
- 📣 **Düdük çal** — enkaz altında yerinizi belli etmek için sesli uyarı sistemi

</td>
<td width="50%" valign="top">

### 📋 Menü
- 🧩 Deprem Simülasyonu & Bilgi Testi
- 📄 Eylem Planı
- ⚠️ Acil Durum Rehberi
- 🧰 İlk Yardım Çantası
- 🗺️ Risk Haritaları & Fay Hatları
- 👥 Toplanma Alanları
- 🏥 Yakınımdaki Hastaneler
- 💊 Nöbetçi Eczaneler
- ❤️ Panik Yönetimi Modu
- 🔋 Enerji & Şarj Yönetimi Asistanı
- 👨‍👩‍👧‍👦 Aile Acil Planı
- 🧘 Deprem Sonrası Psikolojik Destek Rehberi
- ❓ Deprem Mitleri & Doğrular
- 🎓 Deprem Eğitimi (Mini Dersler)
- 🎬 Bilgilendirici Videolar
- 💬 Sık Sorulan Sorular (SSS)

</td>
</tr>
</table>

Rehber, ilk yardım çantası kontrolü, yakın hastaneler, nöbetçi eczaneler, önceden hazırlanabilen acil planlar, deprem simülasyonları ve daha birçok yardımcı özellik uygulama içerisinde yer almaktadır.

---

## 🎨 Kullanıcı Arayüzü (UI/UX)

Uygulama, **sade, modern ve kullanıcı dostu** bir arayüz anlayışıyla tasarlanmıştır.

- 🎯 Acil durumlarda kullanıcıyı yormayacak **net ve sakin renkler**
- 🔘 **Büyük butonlar** ve kolay anlaşılır **ikonlar**
- 🌊 Akıcı uygulama içi geçişler
- 🧭 Kullanıcıların ihtiyaç duyduğu bilgilere **hızlı ve kolay** ulaşımı hedefleyen navigasyon yapısı

Arayüz tasarımında hem **estetik** hem de **kullanılabilirlik** ön planda tutulmuştur.

<div align="center">

| Ana Sayfa | Menü | Menü (Devamı) |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/b8ba8f44-ab15-4497-9386-5dc5617d240f" width="250"/> | <img src="https://github.com/user-attachments/assets/3edf15eb-d2b2-4343-b28e-e2994589ec62" width="250"/> | <img src="https://github.com/user-attachments/assets/cd335057-3865-4290-bb2d-ae024b511242" width="250"/> |
| Son depremler haritası ve listesi | Simülasyon, eylem planı, rehberler | Nöbetçi eczane, haberler, panik modu |

| Acil Durum | Video Rehber | Nöbetçi Eczaneler |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/0ef29563-55da-43b0-9c3e-0d3dbc523b4e" width="250"/> | <img src="https://github.com/user-attachments/assets/bffa7359-a4d8-4bbd-9f7a-2e10c56d9bd2" width="250"/> | <img src="https://github.com/user-attachments/assets/b3fab4fb-4b18-47a9-bc89-a7bf42c1b511" width="250"/> |
| 112 Ara / Düdük Çal | Afet bilinç kütüphanesi | Şehir/ilçe bazlı sorgulama |

</div>
---

## 🗄 Backend Yapısı

QuakeGuard Assistant uygulamasında backend yapısı, **farklı veri kaynaklarının birlikte kullanıldığı** bir mimari üzerine kurulmuştur. Klasik bir sunucu tabanlı backend yerine, **harici servisler**, **API'ler** ve **sunucu tabanlı kaynaklar** kullanılarak veri akışı sağlanmaktadır.

| Veri Türü | Kaynak |
|---|---|
| Güncel deprem verileri | Harici API |
| Acil durum bilgileri | Harici API |
| Hastaneler / iller | Hazır veri setleri |
| Nöbetçi eczaneler | Sunucu üzerinden (dinamik) |

Nöbetçi eczaneler gibi dinamik veriler sunucu üzerinden çekilmekte ve uygulamada arka planda **Redux** kullanılarak merkezi bir şekilde yönetilmektedir. Backend mantığı; **veri çekme → işleme → durum yönetimi → arayüze aktarma** şeklinde organize edilmiştir. Dosya yapısında bu işlemler ayrı klasörlerde tutulmuştur.

```
Harici API'ler ──┐
Veri Setleri ────┼──► Servisler ──► Redux Store ──► UI Bileşenleri
Sunucu Kaynağı ──┘
```

---

## ⚙️ Kurulum

```bash
# 1. Depoyu klonlayın
git clone <repo-url>
cd quakeguard-assistant

# 2. Bağımlılıkları yükleyin
npm install

# 3. Expo geliştirme sunucusunu başlatın
npx expo start
```

> 💡 Uygulamayı fiziksel bir cihazda test etmek için **Expo Go** uygulamasını kullanabilir, ya da Android/iOS emülatöründe çalıştırabilirsiniz.

---

## ✅ Sonuç ve Değerlendirme

QuakeGuard Assistant, deprem gibi afet durumlarında kullanıcıların ihtiyaç duyabileceği temel bilgi ve araçları tek bir mobil uygulama altında toplayarak önemli bir problemi çözmeyi amaçlamıştır. Proje sürecinde;

- 📱 Mobil uygulama geliştirme
- 🧱 Bileşen tabanlı mimari
- 🌐 Harici API kullanımı
- 🔄 State yönetimi
- 🎨 Kullanıcı odaklı arayüz tasarımı

konularında önemli deneyimler kazanılmıştır. Uygulama; teknik açıdan **modüler**, **sürdürülebilir** ve **geliştirilmeye açık** bir yapı ile tamamlanmıştır.

---

## 🚀 Yol Haritası

Gelecekte proje kapsamı daha da genişletilerek aşağıdaki geliştirmeler planlanmaktadır:

- 🔔 Gerçek zamanlı bildirim sistemleri
- ⚡ Deprem anında otomatik uyarı mekanizmaları
- 🌙 Arka planda çalışan servisler
- 📍 Kullanıcı konumuna göre daha akıllı yönlendirmeler
- 📴 Offline çalışma desteğinin ilerletilmesi
- 🎛️ Kişiselleştirilebilir ayarlar
- 🧭 Daha detaylı acil durum senaryoları
- 🧪 Gerçek kullanıcılarla test süreçleri, performans ve kullanılabilirlik iyileştirmeleri
- 🏛️ Resmi kurumlarla entegre çalışabilecek bir yapıya dönüşüm

---

## 👤 Geliştirici

**Ahmet Çaça**
Öğrenci No: 220912021

---

<div align="center">

*Bu proje, deprem afetlerine karşı toplumsal farkındalığı ve hazırlığı artırmak amacıyla geliştirilmiştir.* 🇹🇷

</div>
