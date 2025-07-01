import React from 'react';
import { TextInput, View } from 'react-native';

const SearchByName = ({ value, onChange }: { value: string; onChange: (text: string) => void }) => {
  return (
    <View className="p-4">
      <TextInput
      placeholder="Hľadaj podľa mena"
      value={value}
      onChangeText={onChange}
      className="border border-gray-300 rounded-xl px-4 py-2 text-base text-gray-800 bg-white"
      placeholderTextColor="#999"
      />
    </View>
  );
};

export default SearchByName;