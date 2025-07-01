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

const ShiftChangeCard: React.FC<ShiftChangeCardProps> = ({ user }) => {
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
      'bg-yellow-200 border-yellow-400': actionKey === 'break_start' || actionKey === 'break_end',
      'bg-green-200 border-green-500': actionKey === 'shift_start',
      'bg-red-200 border-red-500': actionKey === 'shift_end',
    }
  );

  const actionColor = clsx('font-semibold capitalize', {
    'text-green-700': actionKey === 'break_start',
    'text-red-800': actionKey === 'break_end',
    'text-green-800': actionKey === 'shift_start',
    'text-red-700': actionKey === 'shift_end',
  });

  const label = 'text-base text-gray-500 font-medium';
  const value = 'text-xl text-gray-900 font-semibold';

  return (
    <View className={cardBackground}>
      
      <View className="flex-row justify-between mb-4">
        <View>
          <Text className={label}>Date</Text>
          <Text className="text-base text-gray-800">{formattedDate}</Text>
        </View>
        <View>
          <Text className={label}>Time</Text>
          <Text className="text-base text-gray-800">{formattedTime}</Text>
        </View>
      </View>

      <View className="space-y-2">
        <View>
          <Text className={label}>Name</Text>
          <Text className={value}>{user.name}</Text>
        </View>
        <View>
          <Text className={label}>Employee #</Text>
          <Text className={value}>{user.EmployeeNumber}</Text>
        </View>
        <View>
          <Text className={label}>Location</Text>
          <Text className={value}>{user.location}</Text>
        </View>
        <View>
          <Text className={label}>Action</Text>
          <Text className={clsx(value, actionColor)}>{user.action.replace('_', ' ')}</Text>
        </View>
      </View>
    </View>
  );
};

export default ShiftChangeCard;
