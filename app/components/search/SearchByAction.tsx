import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ACTIONS = [
  { label: 'Príchod', value: 'začiatok_zmeny' },
  { label: 'Prestávky', value: 'začiatok_prestávky' },
  { label: 'Odchod', value: 'koniec_zmeny' },
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