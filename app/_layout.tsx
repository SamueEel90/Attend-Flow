import { Stack } from "expo-router";
import { SelectedDateProvider } from "./context/SelectedDateContext";

export default function RootLayout() {
  return (
    <SelectedDateProvider> 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" options={{ headerShown: false }} />
        <Stack.Screen name="UserShiftPage" options={{ headerShown: false }} />
         <Stack.Screen name="TasksForUserPage" options={{ headerShown: false }} />
        <Stack.Screen name="OnFloorEmployeesDisplay" options={{ headerShown: false }} />
      </Stack>
    </SelectedDateProvider>
  );
}