import { Tabs } from "expo-router";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8B0000",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0, 
          height: 80, 
          paddingBottom: 12,

          // Tab bar gölgesi
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 20,
        },
        headerShown: false,
      }}
    >
      {/* 🏠 ANA SAYFA */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
          tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
        }}
      />

      {/* ACİL DURUM  */}
      <Tabs.Screen
        name="emergency-screen"
        options={{
          title: "",
          tabBarIcon: () => <EmergencyTabButton />,
        }}
      />

      {/* ☰ MENÜ */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menü",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/menu.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
          tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
        }}
      />
    </Tabs>
  );
}

/*  ACİL BUTON */
function EmergencyTabButton() {
  return (
    <View style={styles.emergencyWrapper}>
      <View style={styles.emergencyButton}>
        {/* Parlama Efekti İçin Gradient veya Overlay simülasyonu */}
        <View style={styles.innerCircle}>
          <Image
            source={require("@/assets/images/emergency.png")}
            style={{ width: 32, height: 32, tintColor: "#fff" }}
            resizeMode="contain"
          />
          <Text style={styles.emergencyText}>ACİL</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emergencyWrapper: {
    alignItems: "center",
    justifyContent: "center",
    
    top: -10, 
    height: 90,
    width: 90,
  },
  emergencyButton: {
    width: 80, 
    height: 80, 
    borderRadius: 40,
    backgroundColor: "#8B0000",
    
    ...Platform.select({
      ios: {
        shadowColor: "#8B0000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 12,
      },
    }),
    padding: 4,
  },
  innerCircle: {
    flex: 1,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)", 
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 2,
    letterSpacing: 0.5,
  },
});