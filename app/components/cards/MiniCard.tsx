import clsx from 'clsx';
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

  const cardBackground = clsx(
    'rounded-2xl p-5 mb-4 shadow-lg border-l-4',
    {
      'bg-yellow-100 border-yellow-400': actionKey === 'break_start' || actionKey === 'break_end',
      'bg-green-100 border-green-500': actionKey === 'shift_start',
      'bg-red-100 border-red-500': actionKey === 'shift_end',
    }
  );

  const actionColor = clsx('font-semibold capitalize tracking-wide', {
    'text-yellow-700': actionKey === 'break_start',
    'text-yellow-800': actionKey === 'break_end',
    'text-green-700': actionKey === 'shift_start',
    'text-red-700': actionKey === 'shift_end',
  });

  const label = 'text-sm text-gray-600 font-semibold tracking-wide';
  const value = 'text-base text-gray-900 font-semibold';

  return (
    <View className={cardBackground}>
      <View className="flex-row justify-between mb-4">
        <View>
          <Text className={label}>Dátum</Text>
          <Text className="text-base text-gray-800 font-semibold">{formattedDate}</Text>
        </View>
        <View>
          <Text className={label}>Čas</Text>
          <Text className="text-base text-gray-800 font-semibold">{formattedTime}</Text>
        </View>
      </View>

      <View className="space-y-3">
        <View>
          <Text className={label}>Miesto</Text>
          <Text className={value}>{user.location}</Text>
        </View>
        <View>
          <Text className={label}>Akcia</Text>
          <Text className={actionColor}>{user.action.replace('_', ' ')}</Text>
        </View>
      </View>
    </View>
  );
};

export default MiniCard;
