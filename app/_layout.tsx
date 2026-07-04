import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Redux Importları
import { Provider } from "react-redux";
import { store } from "../store/store"; // store.ts dosyanızın yolu

export default function RootLayout() {
  return (
    // 1. Adım: Tüm uygulamayı Redux Provider ile sarmalıyoruz
    <Provider store={store}>
      <SafeAreaProvider>
        {/* Durum çubuğu simgelerini koyu renk yapar */}
        <StatusBar style="dark" />

        <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
          <Stack
            screenOptions={{
              // Tüm ekranlarda varsayılan başlığı gizler
              headerShown: false,
              // Arka plan rengini tüm sayfalarda sabitler
              contentStyle: { backgroundColor: "#FAFAFA" },
            }}
          />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}