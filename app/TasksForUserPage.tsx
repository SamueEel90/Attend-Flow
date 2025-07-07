import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import userTasksData from './dummyBackend/dummyDB/UserTasks.json';

const TasksForUserPage = () => {
  const { username } = useLocalSearchParams<{ username: string }>();

  const user = userTasksData.find((u) => u.employee_name === username);

  return (
    <ScrollView className="flex-1 pt-20 bg-background p-4">
      <Text className="text-base text-center  mb-6 text-greenPalette-300">
        Pre dokoncenie ulohy potihni ulohu dolava
      </Text>

      {!user ? (
        <Text className="text-red-400 text-lg">Užívateľ nenájdený.</Text>
      ) : user.tasks.length === 0 ? (
        <Text className="text-yellow-300 text-lg">Žiadne úlohy pre tohto užívateľa.</Text>
      ) : (
        user.tasks.map((task, index) => (
          <View
            key={index}
            className="mb-4 p-4 border-b border-greenPalette-400 rounded-lg bg-greenPalette-900 shadow-md"
          >
            <Text className="text-greenPalette-50 text-xl">{task}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default TasksForUserPage;
