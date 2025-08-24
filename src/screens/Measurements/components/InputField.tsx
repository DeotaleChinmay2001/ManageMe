import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (val: string) => void;
};

const InputField: React.FC<Props> = ({ label, placeholder, value, onChangeText }) => (
  <View style={styles.inputCard}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontSize: 14, color: '#555', marginBottom: 8 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
});

export default InputField;
