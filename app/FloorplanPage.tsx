import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Floorplan from './components/Floorplan';
import { useSelectedDate } from './context/SelectedDateContext';
import TShift from './types/shift';

const FloorplanPage= () => {
  const { date, setDate } = useSelectedDate();
  const [shifts, setShifts] = useState<TShift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        setLoading(true);
        const isoDate = date.toISOString().split('T')[0];
        const res = await fetch(`http://192.168.100.11:5000/api/shifts/date/${isoDate}`);
        const data = await res.json();
        console.log('Fetched shifts:', data);
        setShifts(data);
      } catch (error) {
        console.error('Chyba pri fetchnutí zmien:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, [date]);

  if (loading) {
    return (
      <View className='flex-1 items-center justify-center bg-background'>
        <Text>Načítavam zmeny...</Text>
      </View>
    );
  }

  if (shifts.length === 0) {
    return (
      <View className='flex-1 items-center justify-center bg-background'>
        <Text className='text-greenPalette-600'>Žiadne zmeny pre vybraný dátum skus iny datum.</Text>
          <View className="mt-20">
          <DateTimePicker
          
            value={date}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              if (selectedDate) setDate(selectedDate);
            }}
          />
         </View>
      </View>
    );
  }


  
  const sortedShifts = shifts
    .slice()
    .sort((a, b) => new Date(a.shiftStart).getTime() - new Date(b.shiftStart).getTime());

  return (
    <ScrollView className='bg-background '  >
      
      
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-2xl text-center font-bold mt-20  text-greenPalette-50">
        Floorplan
        </Text>
        <View className="mt-20">
          <DateTimePicker
          
            value={date}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              if (selectedDate) setDate(selectedDate);
            }}
          />
         </View>
        </View>
      <Floorplan shifts={sortedShifts} />
    </ScrollView>
  );
};

export default FloorplanPage;