import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ShiftChangeCard from './components/cards/ShiftChangeCard';
import SearchByAction from './components/search/SearchByAction';
import SearchByName from './components/search/SearchByName';
import { useSelectedDate } from './context/SelectedDateContext';
interface User {
  id: number;
  EmployeeNumber: number;
  name: string;
  location: string;
  action: string;
  timestamp: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { date, setDate } = useSelectedDate();
  const [selectedAction, setSelectedAction] = useState('');
  const selectedDay = useMemo(
    () =>
      date.toLocaleDateString('en-US', {
        weekday: 'long',
      }),
    [date]
  );
  const selectedDateString = useMemo(
    () => date.toISOString().split('T')[0],
    [date]
  );

  const fetchUsers = useCallback(async () => {
    try {
      const data: User[] = (await import('./db/CardInteractions.json')).default;
      setUsers(data);
    } catch (error) {
      console.error('Chyba pri načítaní používateľov:', error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  

const filteredUsers = useMemo(
  () =>
    users.filter((user) => {
      const userDate = new Date(user.timestamp).toISOString().split('T')[0];
      const matchesDate = userDate === selectedDateString;
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesAction =
        selectedAction === '' ||
        (selectedAction === 'break'
          ? user.action === 'break_start' || user.action === 'break_end'
          : user.action === selectedAction);
      return matchesDate && matchesSearch && matchesAction;
    }),
  [users, selectedDateString, searchTerm, selectedAction]
);
  const sortedUsers = useMemo(
    () =>
      [...filteredUsers].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
    [filteredUsers]
  );

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }} className="bg-background px-4">
      <View className="flex flex-col items-center justify-center mt-20 mb-6 space-x-2">
        <Text className="text-greenPalette-100 font-semibold text-5xl mb-2">
          {selectedDay}
        </Text>
        <DateTimePicker
      
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
          }}
        />
      </View>
     <SearchByName value={searchTerm} onChange={setSearchTerm} />
    <SearchByAction selectedAction={selectedAction} onChange={setSelectedAction} />
      <View>
        {sortedUsers.length === 0 ? (
          <Text className="text-center mt-4 text-greenPalette-200 italic">
            Žiadne používateľské zmeny
          </Text>
        ) : (
          sortedUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() =>
                router.push({
                  pathname: './UserShiftPage',
                  params: { userId: String(user.EmployeeNumber) },
                })
              }
            >
              <ShiftChangeCard user={user} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
