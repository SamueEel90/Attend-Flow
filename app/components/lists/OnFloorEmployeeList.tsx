import { MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import UserShifts from '../../dummyBackend/dummyDB/UserShifts.json';

type Shift = {
  start: string;
  end: string;
  break: number;
};

type EmployeeShift = {
  employee_number: number;
  employee_name: string;
  shifts: Shift[];
};

const OnFloorEmployeeList = () => {
  const [employees, setEmployees] = useState<EmployeeShift[]>([]);
  
  const fetchData = async () => {
    try {
      const data: EmployeeShift[] = UserShifts as EmployeeShift[];
      setEmployees(data);
    } catch (error) {
      console.error('Chyba pri načítaní dát:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get rotating border colors for visual distinction
  const getBorderColor = (index: number) => {
    const colors = [
      'border-l-4 border-green-500',
      'border-l-4 border-blue-400',
      'border-l-4 border-purple-500',
      'border-l-4 border-amber-500'
    ];
    return colors[index % colors.length];
  };



  return (
    <ScrollView className="flex-1 bg-background p-4">
  
      <View className="mb-6">
      
        
      </View>

      {/* Employee Cards */}
      {employees.length === 0 ? (
        <View className="bg-yellow-900/20 rounded-xl p-5 mb-4 flex-row items-center border-l-4 border-yellow-500">
          <MaterialIcons name="group-remove" size={24} className="text-yellow-500 mr-3" />
          <Text className="text-yellow-700 text-lg font-semibold">
            Žiadni zamestnanci na pracovnej ploche
          </Text>
        </View>
      ) : (
        employees.map((emp, index) => (
          <View
            key={emp.employee_number}
            className={clsx(
              'bg-backgroundLight rounded-xl p-4 mb-4 shadow-md',
              getBorderColor(index)
            )}
          >
            {/* Employee Header */}
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-row items-center">
                <View className="bg-greenPalette-200 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <MaterialIcons name="person" size={24} className="text-greenPalette-800" />
                </View>
                <View>
                  <Text className="text-greenPalette-200 text-xl font-bold">
                    {emp.employee_name}
                  </Text>
                  <Text className="text-greenPalette-400 text-sm">
                    #{emp.employee_number.toString().padStart(4, '0')}
                  </Text>
                </View>
              </View>
              
              <View className="bg-greenPalette-600 px-3 py-1 rounded-full">
                <Text className="text-greenPalette-50 text-sm font-medium">
                  Na Pracovisku
                </Text>
              </View>
            </View>

           
            <View className="flex-row justify-between mb-2">
              <View>
                <Text className="text-greenPalette-400 text-sm font-medium mb-1">
                  Oddelenie
                </Text>
                <View className="flex-row items-center">
                  <MaterialIcons 
                    name="business" 
                    size={16} 
                    className="text-greenPalette-600 mr-2" 
                  />
                  <Text className="text-greenPalette-200 font-medium">
                    Non Food
                  </Text>
                </View>
              </View>
              
              <View className="items-end">
                <Text className="text-greenPalette-400 text-sm font-medium mb-1">
                  Zmena
                </Text>
                <Text className="text-greenPalette-200 font-medium">
                  Ranná
                </Text>
              </View>
            </View>

           
         
            
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default OnFloorEmployeeList;