import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

export default function MainScreen() {

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-5xl font-bold text-greenPalette-50 mb-6 text-center">
        Welcome to AttendFlow!
      </Text>

      <Text className="text-2xl text-greenPalette-100 text-center mb-10">
        You are not logged in. Please log in to access the app.
      </Text>

      <TouchableOpacity
        className="bg-greenPalette-500 px-8 py-4 rounded-2xl active:opacity-80"
        onPress={() => router.push('./LoginPage')}
      >
        <Text className="text-white text-2xl font-semibold">Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
