import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MiniCard from './components/cards/MiniCard';
import { useSelectedDate } from './context/SelectedDateContext';
interface User {
  id: number;
  EmployeeNumber: number;
  name: string;
  location: string;
  action: string;
  timestamp: string;
}

interface Shift {
  start: string;
  end: string;
  break: string;
}

interface EmployeeShifts {
  employee_number: number;
  employee_name: string;
  shifts: Shift[];
}

const UserShiftPage = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [userMoves, setUserMoves] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [employeeShifts, setEmployeeShifts] = useState<EmployeeShifts | null>(null);
  const { date } = useSelectedDate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = require("./db/CardInteractions.json");
        const shiftsData: EmployeeShifts[] = require("./db/UserShifts.json");
        const employeeNumber = parseInt(userId ?? '0');
        const selectedDateString = date.toISOString().split('T')[0];

        const filteredMoves = data.filter((u: User) => {
          const userDateString = new Date(u.timestamp).toISOString().split('T')[0];
          return u.EmployeeNumber === employeeNumber && userDateString === selectedDateString;
        });
        setUserMoves(filteredMoves);

        const shiftsForUser = shiftsData.find(s => s.employee_number === employeeNumber) ?? null;
        setEmployeeShifts(shiftsForUser);
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

  const userName = userMoves[0]?.name;
  const userNumber = userMoves[0]?.EmployeeNumber;

  

  const selectedDateString = date.toISOString().split('T')[0];
  const todaysShifts = employeeShifts?.shifts.filter(shift =>
    shift.start.startsWith(selectedDateString) || shift.end.startsWith(selectedDateString)
  ) ?? [];

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
            todaysShifts.map((shift, index) => {
              const startDate = new Date(shift.start);
              const endDate = new Date(shift.end);

              const formattedStart = startDate.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              });
              const formattedEnd = endDate.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <Text
                  key={index}
                  className="text-greenPalette-200 text-xl text-center mb-1"
                >
                  {`${formattedStart} — ${formattedEnd}`}
                </Text>
              );
            })
          )}
            <Text className="text-greenPalette-200 text-xl text-center mb-1">Prestávka: {employeeShifts?.shifts[0].break} minút</Text>
        </View>
      </View>

      {userMoves.length === 0 ? (
        <Text className="text-center text-greenPalette-200 italic mt-10">
          Žiadne záznamy pre vybraný dátum.
        </Text>
      ) : (
        <FlatList
          className='mt-10'
          data={userMoves}
          keyExtractor={(item, index) => `${item.EmployeeNumber}-${index}`}
          renderItem={({ item }) => <MiniCard user={item} />}
          />
      )}
    </SafeAreaView>
  );
};

export default UserShiftPage;
