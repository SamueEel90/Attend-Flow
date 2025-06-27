import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftChangeCard from './components/ui/ShiftChangeCard';

interface User {
  id: number;
  EmployeeNumber: number;
  name: string;
  location: string;
  action: string;
  timestamp: string;  
}

const ShiftChangePage = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [userMoves, setUserMoves] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = require('./users.json') as User[];
        const employeeNumber = parseInt(userId ?? '0');
        const filtered = data.filter((u) => u.EmployeeNumber === employeeNumber);
        setUserMoves(filtered);
      } catch (error) {
        console.error('Chyba pri načítaní JSON súboru:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-greenPalette-100 text-lg">Načítavam...</Text>
      </SafeAreaView>
    );
  }

  const userName = userMoves[0]?.name;
  const userNumber = userMoves[0]?.EmployeeNumber;

  return (
    <SafeAreaView className="flex-1 bg-background px-4 py-4">
      <Text className="text-greenPalette-100 text-2xl font-bold mb-2 text-center">
        EN: {userNumber}
      </Text>
      <Text className="text-greenPalette-200 text-xl font-semibold mb-4 text-center">
        {userName}
      </Text>

      <FlatList
        className='mt-10'
        data={userMoves}
        keyExtractor={(item, index) => `${item.EmployeeNumber}-${index}`}
        renderItem={({ item }) => <ShiftChangeCard user={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default ShiftChangePage;
