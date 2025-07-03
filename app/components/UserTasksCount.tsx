import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import userTasksData from '../dummyBackend/dummyDB/UserTasks.json';

type UserTasksCountProps = {
  username: string;
};

const UserTasksCount: React.FC<UserTasksCountProps> = ({ username }) => {
  const user = userTasksData.find((u) => u.employee_name === username);
  const tasksCount = user?.tasks.length ?? 0;

  return (
    <View className="p-2">
      <TouchableOpacity
        className="bg-greenPalette-600 rounded-lg px-4 py-2 active:bg-green-700"
        onPress={() =>
          router.push({
            pathname: './TasksForUserPage',
            params: { username },
          })
        }
      >
        <Text className="text-2xl font-semibold text-green-300 text-center">
          Naplánovane Úlohy: {tasksCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserTasksCount;
