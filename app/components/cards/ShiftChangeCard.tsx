import { clsx } from 'clsx';
import React from 'react';
import { Text, View } from 'react-native';
import getActionArrow from '../../utils/getActionArrow';

interface User {
  id: number;
  EmployeeNumber: number;
  name: string;
  location: string;
  action: string;
  timestamp: string;
}

interface ShiftChangeCardProps {
  user: User;
}

const ShiftChangeCard: React.FC<ShiftChangeCardProps> = ({ user }) => {
  const actionKey = user.action.toLowerCase();

  const date = new Date(user.timestamp);
  const formattedDate = date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });



const borderColor = clsx({
  'border-l-8 border-green-500': actionKey === 'začiatok_zmeny',
  'border-l-8 border-red-500': actionKey === 'koniec_zmeny',
  'border-l-8 border-yellow-400': actionKey === 'začiatok_prestávky' || actionKey === 'koniec_prestávky',
  'border-l-8 border-greenPalette-500': !['začiatok_zmeny', 'koniec_zmeny', 'začiatok_prestávky', 'koniec_prestávky'].includes(actionKey),
});

const actionColor = clsx('text-2xl font-semibold capitalize tracking-wide', {
  'text-yellow-200': actionKey === 'začiatok_prestávky' || actionKey === 'koniec_prestávky',
  'text-green-200': actionKey === 'začiatok_zmeny',
  'text-red-200': actionKey === 'koniec_zmeny',
  'text-greenPalette-50': !['začiatok_zmeny', 'koniec_zmeny', 'začiatok_prestávky', 'koniec_prestávky'].includes(actionKey),
});

  const label = 'text-xl text-greenPalette-50 font-semibold tracking-wide';
  const value = 'text-2xl text-greenPalette-50 font-bold';

  const { arrow, arrowColorClass } = getActionArrow(actionKey);

  return (
    <View className={clsx('bg-backgroundLight rounded-xl p-2 mb-2 shadow-md', borderColor)}>
      <View className="flex-row justify-between items-center mb-2 border-b border-gray-400 pb-2">
        <Text className="text-2xl font-semibold text-greenPalette-50">{formattedDate}</Text>
       
         
        <Text className="text-2xl font-semibold text-greenPalette-50">{formattedTime}</Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="text-3xl font-bold text-greenPalette-50 mb-2">{user.name}</Text>
        <Text className={clsx('text-6xl font-bold', arrowColorClass)}>{arrow}</Text>
      </View>
      <View className="flex-row justify-between mb-2">
        <Text className={label}>Miesto</Text>
        <Text className={value}>{user.location}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className={label}>Akcia</Text>
        <View className="flex-row items-center space-x-3">
          <Text className={actionColor}>{user.action.replace('_', ' ')}</Text>
        </View>
      </View>
    </View>
  );
};

export default ShiftChangeCard;
