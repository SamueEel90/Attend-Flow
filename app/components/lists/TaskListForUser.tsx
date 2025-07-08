import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { clsx } from 'clsx';
import userTasksData from '../../dummyBackend/dummyDB/UserTasks.json';

const TaskListForUser = () => {
  const { username } = useLocalSearchParams<{ username: string }>();

  const user = userTasksData.find((u) => u.employee_name === username);
  
  
  const getStatusColor = (index: number) => {
    const colors = [
      'border-l-4 border-red-500',
      'border-l-4 border-yellow-400',
      'border-l-4 border-blue-400',
      'border-l-4 border-purple-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="pb-16"> 
        {!user ? (
          <View className="bg-red-900/20 rounded-lg p-6 mb-4 border-l-4 border-red-500">
            <Text className="text-red-100 text-xl font-semibold text-center">
              Užívateľ nenájdený
            </Text>
          </View>
        ) : user.tasks.length === 0 ? (
          <View className="bg-yellow-900/20 rounded-lg p-6 mb-4 border-l-4 border-yellow-500 flex-row items-center justify-center">
            <MaterialIcons name="warning" size={24} className="text-yellow-400 mr-2" />
            <Text className="text-yellow-100 text-xl font-semibold">
              Žiadne úlohy pre tohto užívateľa
            </Text>
          </View>
        ) : (
          user.tasks.map((task, index) => (
            <View
              key={index}
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
                    {task}
                  </Text>
                  
                  <View className="flex-row items-center mt-3">
                    <MaterialIcons 
                      name="person" 
                      size={16} 
                      className="text-greenPalette-400 mr-2" 
                    />
                    <Text className="text-greenPalette-400 text-sm">
                      {user.employee_name}
                    </Text>
                    
                    <View className="mx-3 w-1 h-1 bg-greenPalette-400 rounded-full" />
                    
                    <MaterialIcons 
                      name="category" 
                      size={16} 
                      className="text-greenPalette-400 mr-2" 
                    />
                    <Text className="text-greenPalette-400 text-sm">
                      department
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default TaskListForUser;