import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MiniCard from './components/cards/MiniCard';
import UserTasksCount from './components/ui/UserTasksCount';
import { useSelectedDate } from './context/SelectedDateContext';
import { useSelectedUser } from './context/SelectedUserContext';
import TCardInteraction from './types/cardInteraction';

const UserShiftPage = () => {
  const { selectedUserId: userId } = useSelectedUser();
  const { date } = useSelectedDate();

  const [userMoves, setUserMoves] = useState<TCardInteraction[]>([]);
  const [userName, setUserName] = useState<string>('Používateľ');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!userId) {
          throw new Error('Nebolo vybrané ID používateľa.');
        }

        const response = await fetch(
          `http://192.168.100.11:5000/api/cardinteractions/userID?userId=${userId}`
        );

        

        if (!response.ok) {
          throw new Error('Chyba pri načítaní používateľských pohybov');
        }

        const rawData: TCardInteraction[] = await response.json();
        setUserName(rawData[0]?.name ?? 'Používateľ');
        
        setUserMoves(rawData);
      } catch (error) {
        console.error('Chyba pri načítaní dát:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, date]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-greenPalette-100 text-lg">Načítavam...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-4 py-4">
      <Text className="text-greenPalette-200 text-xl font-bold mb-2 text-center">
        EN: {userId}
      </Text>
      <Text className="text-greenPalette-100 text-4xl font-semibold mb-4 text-center">
        {userName}
      </Text>

      <View className="mb-6 px-2 flex-row justify-around">
        <View className="flex-1 ml-2">
          <Text className="text-greenPalette-100 text-xl font-semibold mb-2 text-center">
            Plán smeny
          </Text>
          <View className="flex items-center">
            <View className="flex flex-row gap-2 justify-center">
              <Text className="text-xl text-greenPalette-200">Differencia :</Text>
              <Text className="text-xl text-greenPalette-200"></Text>
              
            </View>
            <UserTasksCount />
          </View>
        </View>
      </View>

      {userMoves.length === 0 ? (
        <Text className="text-center text-greenPalette-200 italic mt-10">
          Žiadne záznamy pre vybraný dátum.
        </Text>
      ) : (
        <FlatList
          className="mt-10"
          data={userMoves}
          keyExtractor={(item, index) => `${item.employeeNumber}-${index}`}
          renderItem={({ item }) => <MiniCard user={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default UserShiftPage;
