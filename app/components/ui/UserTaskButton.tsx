import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSelectedUser } from '../../context/SelectedUserContext';
import TTask from '../../types/task';


const UserTasksButton: React.FC = () => {
  const { selectedUserId } = useSelectedUser();
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedUserId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://192.168.100.11:5000/api/tasks/userID?userId=${selectedUserId}`
        );

        if (!response.ok) {
          throw new Error('Nepodarilo sa načítať úlohy.');
        }

        const data: TTask[] = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message || 'Neznáma chyba');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedUserId]);

  const handlePress = () => {
    router.push({
      pathname: './UserTaskPage',
    });
  };

  return (
    <View className="p-2">
      <TouchableOpacity
        className="bg-greenPalette-600 rounded-lg px-4 py-2 active:bg-green-700"
        onPress={handlePress}
        disabled={loading || !!error}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : error ? (
          <Text className="text-red-200 text-center text-xl">{error}</Text>
        ) : (
          <Text className="text-2xl font-semibold text-green-100 text-center">
            Naplánované úlohy: {tasks.length}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserTasksButton;
