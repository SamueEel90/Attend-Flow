import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import OnFloorEmployeeList from './components/lists/OnFloorEmployeeList';
import { useSelectedDate } from './context/SelectedDateContext';





const OnFloorEmployeesPage = () => {
 const { date } = useSelectedDate();

  return (
  <View className='h-full bg-background'>   
  <Text className="text-2xl text-center font-bold text-greenPalette-50 mb-1 mt-20">
    Zamestnanci na pracovnej ploche
    </Text>
      <View className="flex-row items-center justify-center">
          <MaterialIcons name="date-range" size={20} className="text-greenPalette-700 mr-2" />
          <Text className="flex text-greenPalette-200 font-medium justify-center text-2xl">
            {date.toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
        </View>
    <OnFloorEmployeeList />
  </View>
  )
}
export default OnFloorEmployeesPage;