import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import TTask from '../../types/task';

interface TaskCardProps {
  task: TTask;
 
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <View className="bg-backgroundLight rounded-xl p-5 mb-4 shadow-md">
      <View className="flex-row items-start">
        <View className="bg-gray-700/30 w-8 h-8 rounded-full items-center justify-center mr-3">
          
        </View>

        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <MaterialIcons
              name="assignment"
              size={20}
              className="text-greenPalette-400 mr-2"
            />
            <Text className="text-greenPalette-400 text-sm font-medium uppercase tracking-wider">
              
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
