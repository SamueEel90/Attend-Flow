import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MiniCard from './components/cards/MiniCard';
import UserTasksCount from './components/ui/UserTasksCount';
import { useSelectedDate } from './context/SelectedDateContext';
import { EmployeeShifts } from './types/ShiftTypes';
import User from './types/User';
import filterCardInteractionsForUsers from './utils/filterCardInteracionsForUser';
import getShiftsForSelectedDay from './utils/getShiftsForSelectedDay';

const UserShiftPage = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [userMoves, setUserMoves] = useState<User[]>([]);
  const [employeeShifts, setEmployeeShifts] = useState<EmployeeShifts | null>(null);
  const [loading, setLoading] = useState(true);
  const { date } = useSelectedDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = require('./dummyBackend/dummyDB/CardInteractions.json');
        const shiftsData: EmployeeShifts[] = require('./dummyBackend/dummyDB/UserShifts.json');
        const employeeNumber = parseInt(userId ?? '0');

        setUserMoves(filterCardInteractionsForUsers(rawData, employeeNumber, date));
        setEmployeeShifts(
          shiftsData.find((s) => s.employee_number === employeeNumber) ?? null
        );
      } catch (error) {
        console.error('Chyba pri načítaní JSON súboru:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, date]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-greenPalette-100 text-lg">Načítavam...</Text>
      </SafeAreaView>
    );
  }

  const userName = userMoves[0]?.name ?? 'Neznámy';
  const userNumber = userMoves[0]?.EmployeeNumber ?? '';
  const todaysShifts = getShiftsForSelectedDay(employeeShifts, date);
  const breakDuration = employeeShifts?.shifts[0]?.break ?? null;

  return (
    <SafeAreaView className="flex-1 bg-background px-4 py-4">
      <Text className="text-greenPalette-200 text-3xl font-bold mb-2 text-center">
        EN: {userNumber}
      </Text>
      <Text className="text-greenPalette-100 text-4xl font-semibold mb-4 text-center">
        {userName}
      </Text>

      <View className="mb-6 px-2 flex-row justify-around">
        <View className="flex-1 ml-2">
          <Text className="text-greenPalette-100 text-xl font-semibold mb-2 text-center">
            Plán smeny
          </Text>
          
          {todaysShifts.length === 0 ? (
            <Text className="text-greenPalette-200 italic text-center">
              Žiadne plánované zmeny pre tento deň.
            </Text>
          ) : (
            todaysShifts.map((t, i) => (
              <Text key={i} className="text-greenPalette-200 text-xl text-center mb-1">
                {t}
              </Text>
            ))
          )}

          {breakDuration && (

            <Text className="text-greenPalette-200 text-xl text-center mb-1">
              Prestávka: {breakDuration} minút
            </Text>
            
          )}
          <View className='flex items-center'>
            <View className= 'flex flex-row gap-2 justify-center'>
              <Text className='text-xl text-greenPalette-200'>Differencia :</Text>
              <Text className='text-xl text-greenPalette-200'>- 2 hodiny </Text>
            </View>
            
             <UserTasksCount username = {userName} />
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
          keyExtractor={(item, index) => `${item.EmployeeNumber}-${index}`}
          renderItem={({ item }) => <MiniCard user={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default UserShiftPage;
