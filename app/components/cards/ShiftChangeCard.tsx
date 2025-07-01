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
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const cardStyle = clsx(
    'rounded-2xl p-5 mb-4 shadow border-x-8 bg-white',
    {
      'border-yellow-400': actionKey === 'break_start' || actionKey === 'break_end',
      'border-green-500': actionKey === 'shift_start',
      'border-red-500': actionKey === 'shift_end',
    }
  );

  const actionTextColor = clsx('font-semibold capitalize tracking-wide', {
    'text-yellow-800': actionKey === 'break_start' || actionKey === 'break_end',
    'text-green-800': actionKey === 'shift_start',
    'text-red-700': actionKey === 'shift_end',
  });

  const labelStyle = 'text- text-gray-600 font-medium';
  const valueStyle = 'text-xl text-gray-900 font-semibold';

return (
  <View className={cardStyle}>
    <View className="flex-row justify-between items-center mb-4 border-b border-gray-300 pb-3">
      <Text className="text-2xl font-semibold text-gray-800">{formattedDate}</Text>
      <Text className="text-2xl font-semibold text-gray-700">{formattedTime}</Text>
    </View>
    <Text className="text-2xl font-bold text-gray-900 mb-4">{user.name}</Text>
    <View className="flex-row justify-between  border-b border-gray-200">
      <Text className={labelStyle}>Action</Text>
      <Text className={clsx(valueStyle, actionTextColor)}>
        {user.action.replace('_', ' ')}
      </Text>
    </View>
    <View className="flex-row justify-between  border-b border-gray-200">
      <Text className={labelStyle}>Employee id</Text>
      <Text className={valueStyle}>{user.EmployeeNumber}</Text>
    </View>
    <View className="flex-row justify-between py-0.5 border-b border-gray-200">
      <Text className={labelStyle}>Location</Text>
      <Text className={valueStyle}>{user.location}</Text>
    </View>
  </View>
);
};
export default ShiftChangeCard;
