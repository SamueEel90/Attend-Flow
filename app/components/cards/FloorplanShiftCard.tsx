import React from 'react';
import { Text, View } from 'react-native';
import TShift from '../../types/shift';

type FloorplanShiftCardProps = {
  shift: TShift;
};

const FloorplanShiftCard: React.FC<FloorplanShiftCardProps> = ({ shift }) => {
  const shiftStart = new Date(shift.shiftStart);
  const shiftEnd = new Date(shift.shiftEnd);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' });

  // Výpočet pozície na osi 6:00 - 22:00 (0% - 100%)
  const getPositionPercent = (date: Date) => {
    const hours = date.getHours() + date.getMinutes() / 60;
    return Math.min(Math.max(((hours - 6) / 16) * 100, 0), 100);
  };

  const timeLabels = ['6:00', '10:00', '14:00', '18:00', '22:00'];

  return (
    <View className="bg-white px-8 py-4 w-full ">
     
      <View className="flex-row ">
        <Text className="text-green-600  font-semibold">{shift.username} | {formatTime(shiftStart)}–{formatTime(shiftEnd)}</Text>
       
      </View>

      {/* Časová os s opacitou pod menom */}
      <View className="relative h-14 mb-2 opacity-60">
        {/* Základná línia */}
        <View className="absolute top-8 left-0 right-0 h-[3px] bg-green-200 rounded-full" />

        {/* Časové značky */}
        {timeLabels.map((time, index) => (
          <View
            key={time}
            className="absolute top-10 w-[1px] h-2 bg-green-400"
            style={{ left: `${index * 25}%` }}
          />
        ))}

        {/* Popisky časov pod osou */}
        {timeLabels.map((time, index) => (
          <Text
            key={time}
            className="absolute top-14 text-green-600 text-xs "
            style={{ left: `${index * 25}%`, marginLeft: -15 }}
          >
            {time}
          </Text>
        ))}

        {/* Začiatok zmeny */}
        <View
          className="absolute top-4 w-2 h-8 bg-green-700 rounded-lg shadow-inner"
          style={{ left: `${getPositionPercent(shiftStart)}%`, marginLeft: -8 }}
        />

        {/* Koniec zmeny */}
        <View
          className="absolute top-4 w-2 h-8  bg-green-400 rounded-lg shadow-inner"
          style={{ left: `${getPositionPercent(shiftEnd)}%`, marginLeft: -8 }}
        />
      </View>

     
    </View>
  );
};

export default FloorplanShiftCard;
