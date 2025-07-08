import { MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import User from '../../types/User';
import formatToHHMM from '../../utils/formatHHMM';
import setCardBackgroundColor from '../../utils/setCardBackgroundColor';

interface ShiftChangeCardProps {
  user: User;
}

const ShiftChangeCard: React.FC<ShiftChangeCardProps> = ({ user }) => {
  const date = new Date(user.timestamp);
  const formattedDate = date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
  });
  const formattedTime = formatToHHMM(user.timestamp); // ⬅️ tu použitie helpera

  const status = setCardBackgroundColor(user.action);


  return (
    <View className={clsx(
      'rounded-lg p-4 mb-3 shadow-lg mx-2',
      'transition-all duration-200 ease-in-out transform hover:scale-[1.01]',
      status.backgroundColor,
      status.borderColor
    )}>
      <View className="flex-row justify-between items-center mb-3 pb-2 border-b border-gray-700">
        <View className="flex-row items-center">
          <MaterialIcons 
            name={status.icon} 
            size={20} 
            className={status.textColor} 
          />
          <Text className={clsx('ml-2 text-sm font-semibold uppercase tracking-wider', status.textColor)}>
            {status.label}
          </Text>
        </View>

        <View className="bg-gray-700/50 px-2 py-1 rounded-full">
          <Text className="text-xs text-gray-300 font-mono">
            #{user.EmployeeNumber.toString().padStart(4, '0')}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-start mb-4">
        <View>
          <Text className="text-xl font-bold text-gray-100 mb-1">{user.name}</Text>
          <View className="flex-row items-center">
            <MaterialIcons name="place" size={16} className="text-gray-400 mr-1" />
            <Text className="text-gray-400 text-xl">{user.location}</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-gray-300 text-sm">{formattedDate}</Text>
          <Text className="text-gray-100 text-xl font-bold">{formattedTime}</Text>
        </View>
      </View>

      <View className={clsx(
        'flex-row justify-between items-center p-3 rounded-lg',
        'bg-gray-800/50 backdrop-blur-sm'
      )}>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() =>
            router.push({
              pathname: './UserShiftPage',
              params: { userId: String(user.EmployeeNumber) },
            })
          }>
            <Text className={clsx('font-semibold text-right mr-2 text-greenPalette-200')}>
              Prehľad smeny
            </Text>
          </TouchableOpacity>
          <View className={clsx(
            'w-8 h-8 rounded-full items-center justify-center',
            status.textColor.replace('text', 'bg').replace('400', '400/20')
          )}>
            <MaterialIcons 
              name="arrow-forward" 
              size={18} 
              className={status.textColor} 
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShiftChangeCard;
