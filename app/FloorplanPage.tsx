import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FloorplanShiftCard from './components/cards/FloorplanShiftCard';
import { useSelectedDate } from './context/SelectedDateContext';
import TShift from './types/shift';

const Floorplan = () => {
  const { date } = useSelectedDate();
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
      <View>
        <Text>Načítavam zmeny...</Text>
      </View>
    );
  }

  if (shifts.length === 0) {
    return (
      <View>
        <Text>Žiadne zmeny pre vybraný dátum.</Text>
      </View>
    );
  }

return (
  <ScrollView>
    <Text className="text-2xl font-bold mt-20 mb-4">Zmeny pre {date.toLocaleDateString('sk-SK')}</Text>
    {shifts
      .slice() // create a copy so original state isn't mutated
      .sort((a, b) => new Date(a.shiftStart).getTime() - new Date(b.shiftStart).getTime())
      .map((shift) => (
        <FloorplanShiftCard key={shift._id} shift={shift} />
      ))}
  </ScrollView>
);
};

export default Floorplan;
