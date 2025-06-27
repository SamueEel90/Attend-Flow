import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SearchByName from './components/search/SearchByName';
import ShiftChangeCard from './components/ui/ShiftChangeCard';

interface User {
  id: number;
  EmployeeNumber: number;
  name: string;
  location: string;
  action: string;
  timestamp: string; // predpoklad: formát ISO napr. '2025-06-27T08:00:00'
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date());

  const selectedDay = date.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = require('./users.json') as User[];
        setUsers(data);
      } catch (error) {
        console.error('Chyba pri načítaní používateľov:', error);
      }
    };

    fetchUsers();
  }, []);

  // Konvertuj dátum na porovnateľný formát (len dátumová časť)
  const selectedDateString = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

  const filteredUsers = users.filter((user) => {
    const userDate = new Date(user.timestamp).toISOString().split('T')[0];
    const matchesDate = userDate === selectedDateString;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesSearch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeA - timeB;
  });

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }} className="bg-background px-4">
      <View className="flex flex-row justify-center mt-20 mb-6 space-x-2">
        <Text className="text-greenPalette-100 font-semibold text-4xl mb-2">
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
      <View>
        {sortedUsers.length === 0 && (
          <Text className="text-center mt-4 text-greenPalette-200 italic">
            Žiadne uzivatelske smeny
          </Text>
        )}
        {sortedUsers.map((user) => (
          <TouchableOpacity
            key={user.id.toString()}
            onPress={() =>
              router.push({
                pathname: './ShiftChangePage',
                params: { userId: String(user.EmployeeNumber) },
              })
            }
          >
            <ShiftChangeCard user={user} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
