import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const OnFloorRedirectButton: React.FC = () => {
    return (
      <TouchableOpacity onPress={() => {
        router.push('./OnFloorEmployeesPage');
      }} className='flex items-center justify-center bg-greenPalette-400 h-10 rounded-xl px-3'>
        <Text className='text-greenPalette-50 text-2xl'>Plocha</Text>
      </TouchableOpacity>
    );
};

export default OnFloorRedirectButton;
