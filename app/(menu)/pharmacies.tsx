import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// JSON dosyalarınızı @ işareti ile import ediyoruz
import ilDataRaw from '@/assets/data/il.json';
import ilceDataRaw from '@/assets/data/ilce.json';

// JSON yapısına göre veriyi temizleme
const ILLER =
  ilDataRaw.find((item: any) => item.type === 'table' && item.name === 'il')
    ?.data || [];
const ILCELER =
  ilceDataRaw.find((item: any) => item.type === 'table' && item.name === 'ilce')
    ?.data || [];

export default function Pharmacies() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedCity, setSelectedCity] = useState<{ id: string; name: string } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{ id: string; name: string } | null>(null);

  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [distModalVisible, setDistModalVisible] = useState(false);

  const API_URL =
    'https://n8n.emniva.com/webhook/da5a9fd8-ddcf-4a10-b8c5-bab0c23fb107';

  // Türkçe → İngilizce karakter dönüşümü
  const trToEn = (text: string) => {
    return text
      .trim()
      .replace(/İ/g, 'i')
      .replace(/I/g, 'i')
      .replace(/ı/g, 'i')
      .replace(/Ğ/g, 'g')
      .replace(/ğ/g, 'g')
      .replace(/Ü/g, 'u')
      .replace(/ü/g, 'u')
      .replace(/Ş/g, 's')
      .replace(/ş/g, 's')
      .replace(/Ö/g, 'o')
      .replace(/ö/g, 'o')
      .replace(/Ç/g, 'c')
      .replace(/ç/g, 'c')
      .toLowerCase();
  };

  const handleCitySelect = (city: any) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
    setCityModalVisible(false);
  };

  const fetchEczaneler = async () => {
    if (!selectedCity) {
      Alert.alert('Hata', 'Lütfen önce bir şehir seçiniz.');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setData([]);

    try {
      const cityPath = trToEn(selectedCity.name);
      const districtPath = selectedDistrict
        ? `&district=${trToEn(selectedDistrict.name)}`
        : '';

      const url = `${API_URL}?city=${cityPath}${districtPath}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error('Sunucu yanıt vermedi');

      const json = await response.json();
      const result = Array.isArray(json) ? json : json.data || [];

      setData(result);
    } catch (err) {
      console.error('API Hatası:', err);
      Alert.alert('Hata', 'Eczane verileri alınırken bir sorun oluştu.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const makeCall = (num?: string) => {
    if (num) {
      const cleanNum = num.replace(/\s+/g, '');
      Linking.openURL(`tel:${cleanNum}`);
    }
  };

  const filteredDistricts = ILCELER.filter(
    (d: any) => d.il_id === selectedCity?.id
  );

  const renderPharmacy = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.name || item.isim}</Text>
        <Text style={styles.address}>{item.address || item.adres}</Text>
        {(item.phone || item.telefon) && (
          <Text style={styles.phoneText}>{item.phone || item.telefon}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.callBtn}
        onPress={() => makeCall(item.phone || item.telefon)}
      >
        <Text style={styles.callBtnText}>ARA</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Expo Router Stack Screen */}
      <Stack.Screen options={{ title: ' ' }} />

      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Nöbetçi Eczaneler</Text>
        <Text style={styles.subtitle}>
          Şehir ve ilçe seçerek sorgulama yapın
        </Text>

        <View style={styles.selectionRow}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCityModalVisible(true)}
          >
            <Text style={styles.dropdownLabel}>ŞEHİR</Text>
            <Text style={styles.dropdownValue}>
              {selectedCity ? selectedCity.name : 'Seçiniz...'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dropdown, !selectedCity && { opacity: 0.5 }]}
            onPress={() => selectedCity && setDistModalVisible(true)}
            disabled={!selectedCity}
          >
            <Text style={styles.dropdownLabel}>İLÇE</Text>
            <Text style={styles.dropdownValue}>
              {selectedDistrict ? selectedDistrict.name : 'Tümü'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={fetchEczaneler}>
          <Text style={styles.searchBtnText}>ECZANE BUL</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E31837" />
          <Text style={styles.loadingText}>Eczaneler listeleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderPharmacy}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            hasSearched ? (
              <View style={styles.center}>
                <Text style={styles.emptyText}>
                  Aradığınız kriterlerde eczane bulunamadı.
                </Text>
              </View>
            ) : (
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeText}>
                  Lütfen yukarıdan il seçimi yaparak sorgulama yapınız.
                </Text>
              </View>
            )
          }
        />
      )}

      {/* MODALLAR */}
      <Modal visible={cityModalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Şehir Seçin</Text>
          <TouchableOpacity onPress={() => setCityModalVisible(false)}>
            <Text style={styles.closeBtn}>Kapat</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ILLER}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleCitySelect(item)}
            >
              <Text style={styles.modalItemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </Modal>

      <Modal visible={distModalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {selectedCity?.name} - İlçe Seçin
          </Text>
          <TouchableOpacity onPress={() => setDistModalVisible(false)}>
            <Text style={styles.closeBtn}>Kapat</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.modalItem}
          onPress={() => {
            setSelectedDistrict(null);
            setDistModalVisible(false);
          }}
        >
          <Text style={[styles.modalItemText, { color: '#E31837', fontWeight: 'bold' }]}>
            TÜM İLÇELER
          </Text>
        </TouchableOpacity>

        <FlatList
          data={filteredDistricts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setSelectedDistrict(item);
                setDistModalVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: '900', color: '#E31837', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 15 },
  selectionRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  dropdown: {
    flex: 1,
    backgroundColor: '#F1F3F5',
    padding: 12,
    borderRadius: 12,
  },
  dropdownLabel: { fontSize: 10, color: '#868E96', fontWeight: 'bold' },
  dropdownValue: { fontSize: 14, fontWeight: '600' },
  searchBtn: {
    backgroundColor: '#E31837',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  card: {
    flexDirection: 'row',
    padding: 18,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
  cardInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold' },
  address: { fontSize: 13, color: '#636E72' },
  phoneText: { color: '#E31837', marginTop: 8 },
  callBtn: {
    backgroundColor: '#28A745',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callBtnText: { color: '#fff', fontWeight: 'bold' },
  center: { alignItems: 'center', marginTop: 50 },
  loadingText: { marginTop: 10 },
  emptyText: { textAlign: 'center', color: '#999' },
  welcomeView: { padding: 40 },
  welcomeText: { textAlign: 'center', color: '#ADB5BD' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  closeBtn: { color: '#E31837', fontWeight: 'bold' },
  modalItem: { padding: 20 },
  modalItemText: { fontSize: 16 },
});
