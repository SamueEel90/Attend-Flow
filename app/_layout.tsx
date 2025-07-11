import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SelectedDateProvider } from "./context/SelectedDateContext";
import { SelectedUserProvider } from "./context/SelectedUserContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SelectedUserProvider>
        <SelectedDateProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="LoginPage" options={{ headerShown: false }} />
            <Stack.Screen name="HomePage" options={{ headerShown: false }} />
            <Stack.Screen name="UserShiftPage" options={{ headerShown: false }} />
            <Stack.Screen name="TasksForUserPage" options={{ headerShown: false }} />
            <Stack.Screen name="OnFloorEmployeesPage" options={{ headerShown: false }} />
          </Stack>
        </SelectedDateProvider>
      </SelectedUserProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
