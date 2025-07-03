import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ShiftChangeCard from './components/cards/ShiftChangeCard';
import SearchByAction from './components/search/SearchByAction';
import SearchByName from './components/search/SearchByName';
import { useSelectedDate } from './context/SelectedDateContext';
import filterUsers from './utils/filterUsers';
import sortUsersByTime from './utils/sortUsersByTime';
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
      date.toLocaleDateString('sk-SK', {
        weekday: 'long',
      }),
    [date]
  );
  const selectedDateString = useMemo(
    () => date.toISOString().split('T')[0],
    [date]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = (await import('./dummyBackend/dummyDB/CardInteractions.json')).default;
        setUsers(data);
      } catch (error) {
        console.error('Chyba pri načítaní používateľov:', error);
      }
    };

    fetchUsers();
  }, []);

const filteredUsers = useMemo(
  () => filterUsers(users, selectedDateString, searchTerm, selectedAction),
  [users, selectedDateString, searchTerm, selectedAction]
);
const sortedUsers = useMemo(
  () => sortUsersByTime(filteredUsers),
  [filteredUsers]
);

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }} className="bg-background px-4">
      <View className="flex flex-col items-center justify-center mt-20 mb-6 space-x-2">
        <Text className="text-greenPalette-100 font-semibold text-5xl mb-2 capitalize">
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
