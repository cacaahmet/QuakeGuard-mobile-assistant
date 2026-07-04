import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Geri",
      }}
    />
  );
}