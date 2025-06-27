import { router } from 'expo-router';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login = () => {
  return (
    <View className="flex justify-center items-center h-full bg-background px-4">
      <Text className="text-5xl text-greenPalette-50">Welcome to</Text>
      <Text className="text-6xl text-greenPalette-400 font-semibold mb-6">
        AttendFlow
      </Text>
      <Text className="self-start text-2xl text-greenPalette-100 ml-2">
        Login with credentials provided by{'\n'}your facility manager
      </Text>

      <View className="flex flex-col bg-greenPalette-50 rounded-2xl w-full h-1/3 items-center justify-center p-6 mt-4">
        <Text className="text-lg font-semibold self-start text-greenPalette-800 ml-3">
          Username
        </Text>
        <TextInput
          className="border-2 border-greenPalette-400 text-xl rounded-xl p-3 w-full bg-white text-greenPalette-800"
          placeholder="Username"
          placeholderTextColor="#999"
        />

        <Text className="text-lg font-semibold self-start text-greenPalette-800 mt-4 ml-3">
          Password
        </Text>
        <TextInput
          className="border-2 border-greenPalette-400 text-xl rounded-xl p-3 w-full bg-white text-greenPalette-800"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-greenPalette-600 rounded-xl w-full h-14 mt-6"
          onPress={() => {
            router.push('./Home');
          }}
        >
          <Text className="text-center text-3xl font-bold my-auto text-white">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
