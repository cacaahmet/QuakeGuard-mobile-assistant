import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Redux Hook'ları ve Action'ları import ediyoruz
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addContact,
  deleteContact,
  updateMeetingPoint
} from "@/store/slices/familySlice";

// Renk Paleti
const COLORS = {
  primary: "#2563EB",
  secondary: "#DBEAFE",
  textDark: "#1E293B",
  textLight: "#64748B",
  white: "#FFFFFF",
  danger: "#EF4444",
  success: "#16A34A",
  successBg: "#DCFCE7",
};

export default function FamilyPlanScreen() {
  const dispatch = useAppDispatch();
  
  // Verileri Redux'tan alıyoruz
  const meetingPoint = useAppSelector((state) => state.family.meetingPoint);
  const contacts = useAppSelector((state) => state.family.contacts);

  // Sadece UI kontrolleri (modallar ve inputlar) için yerel state kullanıyoruz
  const [isMeetingModalVisible, setMeetingModalVisible] = useState(false);
  const [tempMeetingPoint, setTempMeetingPoint] = useState("");
  
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Telefon Arama Fonksiyonu
  const handleMakeCall = async (phoneNumber: string) => {
    try {
      const cleanedNumber = phoneNumber.replace(/[^0-9+]/g, "");
      const url = `tel:${cleanedNumber}`;
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Hata", "Bu cihaz arama özelliğini desteklemiyor.");
      }
    } catch (err) {
      console.log("Arama başlatılamadı");
    }
  };

  // Toplanma Noktası Güncelleme (Redux Dispatch)
  const saveMeetingPoint = () => {
    if (tempMeetingPoint.trim()) {
      dispatch(updateMeetingPoint(tempMeetingPoint));
      setMeetingModalVisible(false);
    }
  };

  // Yeni Kişi Ekleme (Redux Dispatch)
  const handleAddContact = () => {
    if (newName.trim() && newPhone.trim()) {
      dispatch(addContact({ 
        id: Date.now().toString(), 
        name: newName, 
        phone: newPhone 
      }));
      setNewName("");
      setNewPhone("");
      setContactModalVisible(false);
    } else {
      Alert.alert("Uyarı", "Lütfen tüm bilgileri eksiksiz girin.");
    }
  };

  // Kişi Silme (Redux Dispatch)
  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header Bölümü */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="shield-checkmark" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Aile Acil Planı</Text>
        <Text style={styles.subtitle}>Güvenliğiniz için hazırlıklı olun</Text>
      </View>

      <View style={styles.content}>
        {/* Toplanma Noktası Kartı */}
        <Text style={styles.sectionLabel}>TOPLANMA NOKTASI</Text>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => { setTempMeetingPoint(meetingPoint); setMeetingModalVisible(true); }}
        >
          <View style={[styles.iconBox, { backgroundColor: COLORS.secondary }]}>
            <Ionicons name="location" size={24} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{meetingPoint}</Text>
            <Text style={styles.cardSub}>Değiştirmek için dokunun</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* Rehber Listesi */}
        <Text style={[styles.sectionLabel, { marginTop: 30 }]}>ACİL DURUM REHBERİ</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <View style={[styles.avatar, { backgroundColor: COLORS.secondary }]}>
                <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleDeleteContact(item.id)} style={styles.smallIconBtn}>
                  <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleMakeCall(item.phone)}
                  style={[styles.smallIconBtn, { backgroundColor: COLORS.successBg }]}
                >
                  <Ionicons name="call" size={18} color={COLORS.success} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Ekleme Butonu (FAB) */}
      <TouchableOpacity style={styles.fab} onPress={() => setContactModalVisible(true)}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Modallar */}
      <Modal visible={isMeetingModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Buluşma Noktası</Text>
            <TextInput 
              style={styles.input} 
              value={tempMeetingPoint} 
              onChangeText={setTempMeetingPoint}
              placeholder="Konum yazın..."
            />
            <TouchableOpacity style={styles.saveBtn} onPress={saveMeetingPoint}>
              <Text style={styles.saveBtnText}>Güncelle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMeetingModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isContactModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
            <Text style={styles.modalHeader}>Yeni Kişi Ekle</Text>
            <TextInput style={styles.input} placeholder="İsim" value={newName} onChangeText={setNewName} />
            <TextInput 
              style={[styles.input, { marginTop: 10 }]} 
              placeholder="Telefon" 
              value={newPhone} 
              onChangeText={setNewPhone} 
              keyboardType="phone-pad" 
            />
            <TouchableOpacity style={styles.saveBtn} onPress={handleAddContact}>
              <Text style={styles.saveBtnText}>Rehbere Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setContactModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>İptal</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5F9" },
  header: { alignItems: 'center', paddingVertical: 40, backgroundColor: 'white', borderBottomRightRadius: 30, borderBottomLeftRadius: 30, elevation: 4 },
  logoCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "800", color: COLORS.textDark },
  subtitle: { fontSize: 14, color: COLORS.textLight },
  content: { flex: 1, padding: 20 },
  sectionLabel: { fontSize: 12, fontWeight: "700", color: COLORS.primary, marginBottom: 10, letterSpacing: 1 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 20, shadowOpacity: 0.05 },
  iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textDark },
  cardSub: { fontSize: 12, color: COLORS.textLight },
  contactItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 15, marginBottom: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  contactName: { fontSize: 16, fontWeight: "600", color: COLORS.textDark },
  contactPhone: { fontSize: 13, color: COLORS.textLight },
  actionButtons: { flexDirection: 'row' },
  smallIconBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  fab: { position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 25, padding: 25 },
  modalHeader: { fontSize: 20, fontWeight: "800", marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: "#F8FAFC", padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  saveBtn: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  saveBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },
  closeBtn: { marginTop: 15, alignItems: 'center' },
  closeBtnText: { color: COLORS.textLight, fontWeight: '600' }
});