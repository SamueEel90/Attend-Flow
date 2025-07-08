
import React from 'react';

import { Text, View } from 'react-native';
import TaskListForUser from './components/lists/TaskListForUser';


const TasksForUserPage = () => {
  return (
      <View className="h-full flex-1 bg-background p-4 ">
        <Text className="text-2xl font-semibold text-greenPalette-300 text-center mt-20 ">
          Týždenné úlohy
        </Text>
         <Text className="text-xl font-semibold text-greenPalette-600 text-center">
          Potiahnutím doľava označíte úlohu ako hotovú.
        </Text>
        <TaskListForUser />
      </View>
    
  );
};

export default TasksForUserPage;
