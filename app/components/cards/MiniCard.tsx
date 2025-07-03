import { clsx } from 'clsx';
import React from 'react';
import { Text, View } from 'react-native';
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

const MiniCard: React.FC<ShiftChangeCardProps> = ({ user }) => {
  const actionKey = user.action.toLowerCase();

  const date = new Date(user.timestamp);
  const formattedDate = date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const borderColor = clsx({
    'border-l-8 border-green-500': actionKey === 'shift_start',
    'border-l-8 border-red-500': actionKey === 'shift_end',
    'border-l-8 border-yellow-400': actionKey === 'break_start' || actionKey === 'break_end',
    'border-l-8 border-greenPalette-500': !['shift_start', 'shift_end', 'break_start', 'break_end'].includes(actionKey),
  });

  const actionColor = clsx('text-2xl font-semibold capitalize tracking-wide', {
    'text-yellow-200': actionKey === 'break_start' || actionKey === 'break_end',
    'text-green-200': actionKey === 'shift_start',
    'text-red-200': actionKey === 'shift_end',
    'text-greenPalette-50': !['shift_start', 'shift_end', 'break_start', 'break_end'].includes(actionKey),
  });

  const label = 'text-base text-greenPalette-50 font-semibold tracking-wide';
  const value = 'text-2xl text-greenPalette-50 font-bold';

  return (
    <View className={clsx('bg-backgroundLight rounded-xl p-2 px-5 mb-2 shadow-md', borderColor)}>
      <View className="flex-row justify-between mb-6">
        <View>
          <Text className={label}>Dátum</Text>
          <Text className={value}>{formattedDate}</Text>
        </View>
        <View className="items-end">
          <Text className={label}>Čas</Text>
          <Text className={value}>{formattedTime}</Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        <View>
          <Text className={label}>Miesto</Text>
          <Text className={value}>{user.location}</Text>
        </View>
        <View className="items-end">
          <Text className={label}>Akcia</Text>
          <Text className={actionColor}>{user.action.replace('_', ' ')}</Text>
        </View>
      </View>
    </View>
  );
};

export default MiniCard;
