import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const FloorplanButton: React.FC = () => {
    return (
      <TouchableOpacity onPress={() => {
        router.push('./FloorplanPage');
      }} className='flex items-center justify-center bg-greenPalette-400 h-10 rounded-xl px-3'>
        <Text className='text-greenPalette-50 text-2xl'>Floorplan</Text>
      </TouchableOpacity>
    );
};

export default FloorplanButton;
