import { MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React from 'react';
import { Text, View } from 'react-native';
import User from '../../types/User';
import setCardBackgroundColor from '../../utils/setCardBackgroundColor';


interface ShiftChangeCardProps {
  user: User;
}

const MiniCard: React.FC<ShiftChangeCardProps> = ({ user }) => {
  const { backgroundColor, borderColor, textColor, label, icon } = setCardBackgroundColor(user.action);

  const date = new Date(user.timestamp);
  const formattedDate = date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View className={clsx('rounded-lg p-4 mb-3 shadow-lg mx-2', backgroundColor, borderColor)}>
      {/* Date/Time Header */}
      <View className="flex-row justify-between mb-2 pb-2 border-b border-gray-600">
        <Text className="text-sm font-medium text-gray-400">Dátum</Text>
        <Text className="text-sm font-medium text-gray-400">Čas</Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <Text className="text-xl font-bold text-white">{formattedDate}</Text>
        <Text className="text-xl font-bold text-white">{formattedTime}</Text>
      </View>

      <View className="flex-row justify-between items-end">
        <Text className="text-base font-semibold text-gray-400">{user.location}</Text>
        <View className="items-end flex-row gap-x-1">
          <MaterialIcons name={icon} size={18} color="currentColor" />
          <Text className={clsx('text-base font-semibold capitalize tracking-wide', textColor)}>
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MiniCard;
