import { Stack } from "expo-router";
import { SelectedDateProvider } from "./context/SelectedDateContext";

export default function RootLayout() {
  return (
    <SelectedDateProvider> 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="ShiftChangePage" options={{ headerShown: false }} />
      </Stack>
    </SelectedDateProvider>
  );
}