import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import SearchByAction from './components/search/SearchByAction';
import SearchByName from './components/search/SearchByName';
import OnFloorRedirectButton from './components/ui/FloorplanButton';
import { useSelectedDate } from './context/SelectedDateContext';
import TCardInteraction from './types/cardInteraction';

import InteractionCard from './components/cards/InteractionCard';
import filterUsers from './utils/filterUsers';
import sortUsersByTime from './utils/sortUsersByTime';

const HomePage: React.FC = () => {
  const [cardInteractions, setCardInteractions] = useState<TCardInteraction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [areAllMinimized, setAreAllMinimized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const { date, setDate } = useSelectedDate();

  const selectedDay = useMemo(() =>
    date.toLocaleDateString('sk-SK', { weekday: 'long' }), [date]
  );
  const selectedDateString = useMemo(() =>
    date.toISOString().split('T')[0], [date]
  );

  useEffect(() => {
    setLoading(true);
    setFetchError('');
    const fetchCardInteractions = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.11:5000/api/cardinteractions?date=${selectedDateString}`
        );
        if (!response.ok) throw new Error('Server error');
        const data: TCardInteraction[] = await response.json();
        setCardInteractions(data);
      } catch (error) {
        console.error('Chyba pri načítaní interakcií:', error);
        
      } finally {
        setLoading(false);
      }
    };
    fetchCardInteractions();
  }, [selectedDateString]);

  const filteredInteractions = useMemo(() =>
    filterUsers(cardInteractions, selectedDateString, searchTerm, selectedAction),
    [cardInteractions, selectedDateString, searchTerm, selectedAction]
  );
  const sortedInteractions = useMemo(() =>
    sortUsersByTime(filteredInteractions), [filteredInteractions]
  );

  // Handlers
  const handleDateChange = useCallback((_: any, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
  }, [setDate]);

  const handleToggleMinimize = useCallback(() => {
    setAreAllMinimized(prev => !prev);
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Header Card */}
      <View className="mt-20 mx-4 rounded-2xl bg-background shadow-lg elevation-4 p-2 flex flex-col items-center">
        <Text className="text-greenPalette-600 font-semibold text-3xl mb-1 capitalize">
          filiálka: 1420
        </Text>
        <Text className="text-greenPalette-100 font-semibold text-4xl mb-3 capitalize">
          {selectedDay}
        </Text>
        <View className="flex-row items-center gap-2">
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
          <OnFloorRedirectButton />
        </View>
      </View>

      {/* Sticky search bar */}
      <View className="sticky top-0 z-10 bg-background px-4 pb-2">
        <SearchByName value={searchTerm} onChange={setSearchTerm} />
        <SearchByAction selectedAction={selectedAction} onChange={setSelectedAction} />
        <TouchableOpacity
          onPress={handleToggleMinimize}
          className="bg-greenPalette-600 rounded-2xl py-2 px-4 self-center mt-2 mb-2"
          accessibilityLabel="Zbaliť/rozbaliť všetky karty"
        >
          <Text className="text-white font-semibold text-center">
            {areAllMinimized ? 'Rozbaliť' : 'Zbaliť'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} className="px-4">
        {loading ? (
          <View className="mt-10 items-center">
            <ActivityIndicator size="large" color="#34d399" />
            <Text className="mt-4 text-greenPalette-200 italic">Načítavam údaje...</Text>
          </View>
        ) : fetchError ? (
          <View className="mt-10 items-center">
            <Ionicons name="alert-circle-outline" size={48} color="#f87171" />
            <Text className="text-center mt-4 text-red-400 font-semibold">{fetchError}</Text>
          </View>
        ) : sortedInteractions.length === 0 ? (
          <View className="mt-10 items-center">
            <Ionicons name="people-outline" size={48} color="#9ca3af" />
            <Text className="text-center mt-4 text-greenPalette-200 italic">
              Žiadne používateľské zmeny
            </Text>
          </View>
        ) : (
          sortedInteractions.map((interaction) => (
            <View
              key={interaction._id}
              style={{
                opacity: 0.98,
                transform: [{ scale: areAllMinimized ? 0.97 : 1 }]
              }}
            >
              <InteractionCard user={interaction} isMinimized={areAllMinimized} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HomePage;