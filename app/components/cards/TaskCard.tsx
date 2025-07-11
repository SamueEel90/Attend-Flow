import { MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React from 'react';
import { Text, View } from 'react-native';
import TTask from '../../types/task';

interface TaskCardProps {
  task: TTask;
  index: number;
}

const getStatusColor = (index: number) => {
  const colors = [
    'border-l-4 border-red-500',
    'border-l-4 border-yellow-400',
    'border-l-4 border-blue-400',
    'border-l-4 border-purple-500',
  ];
  return colors[index % colors.length];
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <View
      className={clsx(
        'bg-backgroundLight rounded-xl p-5 mb-4 shadow-md',
        getStatusColor(index)
      )}
    >
      <View className="flex-row items-start">
        <View className="bg-gray-700/30 w-8 h-8 rounded-full items-center justify-center mr-3">
          <Text className="text-greenPalette-50 font-bold text-lg">
            {index + 1}
          </Text>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <MaterialIcons 
              name="assignment" 
              size={20} 
              className="text-greenPalette-400 mr-2" 
            />
            <Text className="text-greenPalette-400 text-sm font-medium uppercase tracking-wider">
              Úloha #{index + 1}
            </Text>
          </View>

          <Text className="text-greenPalette-50 text-lg font-semibold leading-6">
            {task.content}
          </Text>

          <View className="flex-row items-center mt-3">
            <MaterialIcons 
              name="person" 
              size={16} 
              className="text-greenPalette-400 mr-2" 
            />
            <Text className="text-greenPalette-400 text-sm">
              {task.userId}
            </Text>

            <View className="mx-3 w-1 h-1 bg-greenPalette-400 rounded-full" />

            <MaterialIcons 
              name="category" 
              size={16} 
              className="text-greenPalette-400 mr-2" 
            />
            <Text className="text-greenPalette-400 text-sm">
              {task.department ?? 'oddelenie nešpecifikované'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
