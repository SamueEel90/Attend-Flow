import { router, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import '../global.css';
export default function HomeScreen() {
  const navigation = useNavigation();


  const user = {
    id: 'u12345',
    name: 'Samuel',
  };



  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${user.name} (${user.id})`,
    });
  }, [navigation, user]);

  return (
    <View className="flex-1 items-center justify-center bg-background ">
      <Text className='text-primary'>Welcome, {user.name}!</Text>
      <button onClick={() => router.push('./login')}>login</button>
    </View>
  );
}