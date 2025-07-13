import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import TTask from '../../types/task';

interface TaskCardProps {
  task: TTask;
  onSwipeRight?: () => void; // Optional callback for swipe right
}

const renderRightActions = (onSwipeRight?: () => void) => (
  <RectButton
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#38b000',
      borderRadius: 20,
      marginVertical: 4,
      width: 80,
      height: '85%',
      alignSelf: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.09,
      shadowRadius: 6,
      elevation: 3
    }}
    onPress={onSwipeRight}
  >
    <MaterialIcons name="check" size={30} color="#fff" />
    <Text style={{ color: '#fff', fontWeight: '700', marginTop: 2, fontSize: 13 }}>Splniť</Text>
  </RectButton>
);

const TaskCard: React.FC<TaskCardProps> = ({ task, onSwipeRight }) => {
  return (
    <Swipeable
      renderRightActions={() => renderRightActions(onSwipeRight)}
      overshootRight={false}
    >
      <View className="bg-green-800/20 rounded-xl p-5 mb-4 shadow-md">
        <View className="flex-row items-start">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <MaterialIcons
                style={{ color: '#d8f3dc'  }}
                name="assignment"
                size={20}
                className="text-greenPalette-400 mr-2"
              />
              <Text className="text-2xl text-greenPalette-400">
                {task.headline}
              </Text>
            </View>
            <Text className="text-greenPalette-50 text-xl ml-8">
              {task.content}
            </Text>
            <View className="flex-row items-center mt-3">
              <MaterialIcons
                style={{ color: '#d8f3dc'  }}
                name="category"
                size={16}
                className="text-greenPalette-400 mr-2"
              />
              <Text className="text-greenPalette-400 ">
                {task.department ?? 'oddelenie nešpecifikované'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default TaskCard;