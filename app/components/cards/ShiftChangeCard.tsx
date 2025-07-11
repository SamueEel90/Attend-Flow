import { MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelectedUser } from '../../context/SelectedUserContext';
import TCardInteraction from '../../types/cardInteraction';
import formatToHHMM from '../../utils/formatHHMM';
import setCardBackgroundColor from '../../utils/setCardBackgroundColor';

interface ShiftChangeCardProps {
  user: TCardInteraction;
}

const ShiftChangeCard: React.FC<ShiftChangeCardProps> = ({ user }) => {
  const { setSelectedUserId } = useSelectedUser();
  const [isMinimized, setIsMinimized] = useState(false);

  const date = new Date(user.timestamp);
  const formattedDate = date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
  });
  const formattedTime = formatToHHMM(user.timestamp);

  const status = setCardBackgroundColor(user.action);

  const handlePress = () => {
    setSelectedUserId(String(user.userId)); // nastavujeme ID do kontextu
    router.push({
      pathname: './UserShiftPage',
      params: { userId: String(user.userId) },
    });
  };

  const handleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <View
      className={clsx(
        'rounded-lg p-4 mb-3 shadow-lg mx-2',
        'transition-all duration-200 ease-in-out transform hover:scale-[1.01]',
        status.backgroundColor,
        status.borderColor,
        isMinimized && 'p-2'
      )}
      style={{ width: isMinimized ? 'auto' : 'auto' }} 
    >
      <View className="flex-row justify-between items-center mb-3 pb-2 border-b border-gray-700">
        <View className="flex-row items-center">
          <MaterialIcons name={status.icon} size={20} className={status.textColor} />
          <Text
            className={clsx(
              'ml-2 text-sm font-semibold uppercase tracking-wider',
              status.textColor
            )}
          >
            {status.label}
          </Text>
        </View>
        <TouchableOpacity onPress={handleMinimize} className="flex-row items-center">
          <Text className="mr-1 text-gray-400">{isMinimized ? '' : ''}</Text>
          <MaterialIcons
            name={isMinimized ? "unfold-more" : "unfold-less"}
            size={20}
            className="text-gray-400"
            style={{ color: 'gray' }}
          />
        </TouchableOpacity>
      </View>

      {isMinimized ? (
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-white">{user.name}</Text>
          <Text className="text-white font-mono">{formattedTime}</Text>
        </View>
      ) : (
        <>
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

          <View
            className={clsx(
              'flex-row justify-between items-center p-3 rounded-lg',
              'bg-gray-800/50 backdrop-blur-sm'
            )}
          >
            <View className="flex-row items-center">
              <TouchableOpacity onPress={handlePress}>
                <Text className={clsx('font-semibold text-right mr-2 text-greenPalette-200')}>
                  Prehľad smeny
                </Text>
              </TouchableOpacity>
              <View
                className={clsx(
                  'w-8 h-8 rounded-full items-center justify-center',
                  status.textColor.replace('text', 'bg').replace('400', '400/20')
                )}
              >
                <MaterialIcons name="arrow-forward" size={18} className={status.textColor} />
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ShiftChangeCard;
