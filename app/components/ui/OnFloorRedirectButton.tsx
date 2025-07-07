import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const OnFloorRedirectButton: React.FC = () => {
    return (
      <TouchableOpacity onPress={() => {
        router.push('./OnFloorEmployeesDisplay');
      }} className='flex items-center justify-center bg-greenPalette-400 rounded-xl px-3'>
        <Text className='text-greenPalette-50 text-2xl'>Plocha</Text>
      </TouchableOpacity>
    );
};

export default OnFloorRedirectButton;
