// src/screens/DietScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DietScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Diet Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});

export default DietScreen;
