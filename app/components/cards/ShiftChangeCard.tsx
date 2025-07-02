import { clsx } from 'clsx';
import React from 'react';
import { Text, View } from 'react-native';
import { getActionArrow } from '../../utils/getActionArrow';

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

  const label = 'text-xl text-greenPalette-50 font-semibold tracking-wide';
  const value = 'text-2xl text-greenPalette-50 font-bold';

  const { arrow, arrowColorClass } = getActionArrow(actionKey);

  return (
    <View className={clsx('bg-backgroundLight rounded-xl p-6 mb-4 shadow-md', borderColor)}>
      <View className="flex-row justify-between items-center mb-4 border-b border-greenPalette-700 pb-3">
        <Text className="text-2xl font-semibold text-greenPalette-50">{formattedDate}</Text>
        <Text className="text-2xl font-semibold text-greenPalette-50">{formattedTime}</Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="text-3xl font-bold text-greenPalette-50 mb-6">{user.name}</Text>
        <Text className={clsx('text-6xl font-bold', arrowColorClass)}>{arrow}</Text>
      </View>
      <View className="flex-row justify-between mb-3">
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

export default MiniCard;
