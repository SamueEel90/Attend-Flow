import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ACTIONS = [
  { label: 'Začiatok smeny', value: 'shift_start' },
  { label: 'Prestávka', value: 'break' }, // zlúčené
  { label: 'Koniec smeny', value: 'shift_end' },
];

interface Props {
  selectedAction: string;
  onChange: (action: string) => void;
}

const SearchByAction: React.FC<Props> = ({ selectedAction, onChange }) => {
  const handlePress = (value: string) => {
    onChange(selectedAction === value ? '' : value);
  };

  return (
    <View className="mb-4">
      <Text className="text-greenPalette-100 text-center mb-2 font-semibold">Filtrovať podľa akcie</Text>

      <View className="flex-row justify-center   gap-2">
        {ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.value}
            onPress={() => handlePress(action.value)}
            className={`px-3 py-1.5 rounded-full border ${
              selectedAction === action.value
                ? 'bg-greenPalette-200 border-greenPalette-300'
                : 'border-greenPalette-200'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedAction === action.value
                  ? 'text-white'
                  : 'text-greenPalette-100'
              }`}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SearchByAction;