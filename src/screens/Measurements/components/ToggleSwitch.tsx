import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  options: { label: string; value: string }[];
  active: string;
  onChange: (val: string) => void;
};

const ToggleSwitch: React.FC<Props> = ({ options, active, onChange }) => (
  <View style={styles.container}>
    {options.map(opt => (
      <TouchableOpacity
        key={opt.value}
        style={[styles.button, active === opt.value && styles.activeButton]}
        onPress={() => onChange(opt.value)}
      >
        <Text style={[styles.text, active === opt.value && styles.activeText]}>
          {opt.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 16 },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeButton: { backgroundColor: '#00827E' },
  text: { color: '#333', fontWeight: '500' },
  activeText: { color: '#fff' },
});

export default ToggleSwitch;
