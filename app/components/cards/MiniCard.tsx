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
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Definovanie farieb pozadia a bordúry podľa akcie
  const backgroundColor = clsx({
    'bg-green-800/20': actionKey === 'začiatok_zmeny',
    'bg-red-800/20': actionKey === 'koniec_zmeny',
    'bg-yellow-800/20': actionKey === 'začiatok_prestávky',
    'bg-amber-800/20': actionKey === 'koniec_prestávky',
    'bg-blue-800/20': !['začiatok_zmeny', 'koniec_zmeny', 'začiatok_prestávky', 'koniec_prestávky'].includes(actionKey),
  });

  const borderColor = clsx({
    'border-l-4 border-green-500': actionKey === 'začiatok_zmeny',
    'border-l-4 border-red-500': actionKey === 'koniec_zmeny',
    'border-l-4 border-yellow-500': actionKey === 'začiatok_prestávky',
    'border-l-4 border-amber-500': actionKey === 'koniec_prestávky',
    'border-l-4 border-blue-500': !['začiatok_zmeny', 'koniec_zmeny', 'začiatok_prestávky', 'koniec_prestávky'].includes(actionKey),
  });

  const actionColor = clsx('text-base font-semibold capitalize tracking-wide', {
    'text-yellow-400': actionKey === 'začiatok_prestávky' || actionKey === 'koniec_prestávky',
    'text-green-400': actionKey === 'začiatok_zmeny',
    'text-red-400': actionKey === 'koniec_zmeny',
    'text-blue-400': !['začiatok_zmeny', 'koniec_zmeny', 'začiatok_prestávky', 'koniec_prestávky'].includes(actionKey),
  });

  return (
    <View className={clsx(
      'rounded-lg p-4 mb-3 shadow-lg mx-2',
      backgroundColor,
      borderColor
    )}>
      {/* Date/Time Header */}
      <View className="flex-row justify-between mb-2 pb-2 border-b border-gray-600">
        <Text className="text-sm font-medium text-gray-400">Dátum</Text>
        <Text className="text-sm font-medium text-gray-400">Čas</Text>
      </View>
      
      <View className="flex-row justify-between mb-2">
        <Text className="text-xl font-bold text-white">{formattedDate}</Text>
        <Text className="text-xl font-bold text-white">{formattedTime}</Text>
      </View>

      {/* Location/Action Section */}
      <View className="flex-row justify-between items-end">
        <View>
        
          <Text className="text-base font-semibold text-gray-400">
            {user.location}
          </Text>
        </View>
        
        <View className="items-end">
         
          <Text className={actionColor}>
            {user.action.replace('_', ' ')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MiniCard;
