import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import TaskCard from './components/cards/TaskCard';
import { useSelectedUser } from './context/SelectedUserContext';
import TTask from './types/task';

const TasksForUserPage = () => {
  const { selectedUserId } = useSelectedUser();
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedUserId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://192.168.100.11:5000/api/tasks/userID?userId=${selectedUserId}`)

        console.log(`Fetching tasks for user ID: ${selectedUserId}`);

        if (!response.ok) {
          throw new Error('Nepodarilo sa načítať úlohy.');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message || 'Neznáma chyba');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedUserId]);

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-2xl font-semibold text-greenPalette-300 text-center mt-20">
        Týždenné úlohy {selectedUserId ?? ''}
      </Text>
      <Text className="text-xl font-semibold text-greenPalette-600 text-center mb-4">
        Potiahnutím doľava označíte úlohu ako hotovú.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#16a34a" className="mt-10" />
      ) : error ? (
        <View className="bg-red-900/20 rounded-lg p-6 mb-4 border-l-4 border-red-500">
          <Text className="text-red-100 text-xl font-semibold text-center">
            {error}
          </Text>
        </View>
      ) : tasks.length === 0 ? (
        <View className="bg-yellow-900/20 rounded-lg p-6 mb-4 border-l-4 border-yellow-500 flex-row items-center justify-center">
          <MaterialIcons name="warning" size={24} className="text-yellow-400 mr-2" />
          <Text className="text-yellow-100 text-xl font-semibold">
            Žiadne úlohy pre tohto užívateľa
          </Text>
        </View>
      ) : (
        tasks.map((task, index) => (
          <TaskCard key={task._id ?? index} task={task} index={index} />
        ))
      )}
    </ScrollView>
  );
};

export default TasksForUserPage;
