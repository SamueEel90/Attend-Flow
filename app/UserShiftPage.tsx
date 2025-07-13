import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MiniCard from './components/cards/MiniInteractionCard';
import UserTasksButton from './components/ui/UserTaskButton';
import { useSelectedDate } from './context/SelectedDateContext';
import { useSelectedUser } from './context/SelectedUserContext';
import TCardInteraction from './types/cardInteraction';
import TShift from './types/shift';

const UserShiftPage = () => {
  const { selectedUserId: userId } = useSelectedUser();
  const { date } = useSelectedDate();

  const [userMoves, setUserMoves] = useState<TCardInteraction[]>([]);
  const [shift, setShift] = useState<TShift | null>(null);
  const [userName, setUserName] = useState<string>('Používateľ');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!userId) {
          throw new Error('Nebolo vybrané ID používateľa.');
        }

        // Format the date to yyyy-mm-dd for backend
        const selectedDate = new Date(date);
        const isoDate = selectedDate.toISOString().slice(0, 10);

        
        const [movesRes, shiftRes] = await Promise.all([
          fetch(`http://192.168.100.11:5000/api/cardinteractions/userID?userId=${userId}`),
          fetch(`http://192.168.100.11:5000/api/shifts/user/${userId}/date/${isoDate}`)
        ]);

        if (!movesRes.ok) {
          throw new Error('Chyba pri načítaní používateľských pohybov');
        }
        if (!shiftRes.ok) {
          throw new Error('Chyba pri načítaní smeny používateľa');
        }

        const movesData: TCardInteraction[] = await movesRes.json();
        setUserName(movesData[0]?.name ?? 'Používateľ');
        setUserMoves(movesData);

        const shiftData = await shiftRes.json();
        setShift(Array.isArray(shiftData) ? (shiftData[0] ?? null) : shiftData);

        console.log('Fetched shift data:', shiftData);
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
      <Text className="text-greenPalette-600 text-xl font-bold mb-2 text-center">
        EN: {userId}
      </Text>
      <Text className="text-greenPalette-50 text-4xl font-semibold mb-4 text-center">
        {userName}
      </Text>

      <View className="mb-6 px-2 flex-row justify-around">
        <View className="flex-1 ml-2">
          <Text className="text-greenPalette-100 text-xl font-semibold mb-2 text-center">
            Plán smeny : 
            {shift
              ? ` ${new Date(shift.shiftStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Smena nenájdená'} - 
            {shift
              ? (shift.shiftEnd
                ? ` ${new Date(shift.shiftEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Smena nenájdená')
              : 'Smena nenájdená'}
          </Text>
          <View className="flex items-center">
            <View className="flex flex-row gap-2 justify-center">
              <Text className="text-xl text-greenPalette-200">Prestávka: 35 min</Text>
            </View>
            <UserTasksButton />
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