import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/*  MENÜ BUTONU BİLEŞENİ */
const MenuItem = ({
  title,
  iconName,
  iconBg,
  onPress,
}: {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={22} color="#333" />
      </View>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Menu() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 🔝 HEADER  */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menü</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={22} color="#2BB0A6" />
          </TouchableOpacity>
        </View>
      </View>

      {/*  MENÜ LİSTESİ */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuItem
          title="Deprem Simülasyonu & Bilgi Testi"
          iconName="pulse"
          iconBg="#16af8e8a"
          onPress={() => router.push("/simulation")}
        />

        <MenuItem
          title="Eylem Planı"
          iconName="document-text-outline"
          iconBg="#e28ee2ff"
          onPress={() => router.push("/todo")}
        />

        <MenuItem
          title="Acil Durum Rehberi"
          iconName="warning-outline"
          iconBg="#db4949ff"
          onPress={() => router.push("/emergency-guide")}
        />

        <MenuItem
          title="İlk Yardım Çantası"
          iconName="briefcase-outline"
          iconBg="#cfeba5ff"
          onPress={() => router.push("/aid-bag")}
        />

        <MenuItem
          title="Risk Haritaları & Fay Hatları"
          iconName="map-outline"
          iconBg="#439bd1ff"
          onPress={() => router.push("/risk-maps")}
        />

        <MenuItem
          title="Toplanma Alanları"
          iconName="people-outline"
          iconBg="#9dbff3ff"
          onPress={() => router.push("/areas")}
        />

        <MenuItem
          title="Yakınımdaki Hastaneler"
          iconName="business-outline"
          iconBg="#e68d3bff"
          onPress={() => router.push("/hospital")}
        />
        
        <MenuItem
          title="Nöbetçi Eczaneler"
          iconName="medkit-outline"
          iconBg="#f3a6adff"
          onPress={() => router.push("/pharmacies")}
        />

        <MenuItem
          title="Haberler"
          iconName="newspaper-outline"
          iconBg="#c9c1e9ff"
          onPress={() => router.push("/news")}
        />

        <MenuItem
          title="Panik Yönetimi Modu"
          iconName="heart-outline"
          iconBg="#ee538fab"
          onPress={() => router.push("/panic-mode")}
        />

        <MenuItem
          title="Enerji & Şarj Yönetimi Asistanı"
          iconName="battery-half-outline"
          iconBg="#F1F5E8"
          onPress={() => router.push("/energy-manager")}
        />

        <MenuItem
          title="Aile Acil Planı"
          iconName="home-outline"
          iconBg="#97def0fa"
          onPress={() => router.push("/family-plan")}
        />

        <MenuItem
          title="Deprem Sonrası Psikolojik Destek Rehberi"
          iconName="happy-outline"
          iconBg="#fbff0aff"
          onPress={() => router.push("/psychological")}
        />

        <MenuItem
          title="Deprem Mitleri & Doğrular"
          iconName="alert-circle-outline"
          iconBg="#ff7c7cff"
          onPress={() => router.push("/myths")}
        />

        <MenuItem
          title="Deprem Eğitimi (Mini Dersler)"
          iconName="school-outline"
          iconBg="#7f7f80ff"
          onPress={() => router.push("/education")}
        />

        <MenuItem
          title="Bilgilendirici Videolar"
          iconName="videocam-outline"
          iconBg="#707fdaff"
          onPress={() => router.push("/videos")}
        />

        <MenuItem
          title="Sık Sorulan Sorular (SSS)"
          iconName="help-circle-outline"
          iconBg="#2ab2caff"
          onPress={() => router.push("/faq")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/*  STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA", 
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});