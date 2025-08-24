import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeightEntry, MeasurementEntry } from '../types/entries';

type Props = {
  type: 'weight' | 'measurement';
  data: WeightEntry | MeasurementEntry;
};

const HistoryCard: React.FC<Props> = ({ type, data }) => {
  const isWeight = type === 'weight';
  const w = data as WeightEntry;
  const m = data as MeasurementEntry;

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{data.date}</Text>

      {isWeight ? (
        <>
          <Text style={styles.value}>Weight: {w.weight} kg</Text>
          {w.imageUri ? (
            <Image source={{ uri: w.imageUri }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: '#666' }}>No Image</Text>
            </View>
          )}
        </>
      ) : (
        <>
          <Text style={styles.value}>Chest: {m.chest ?? '-'}</Text>
          <Text style={styles.value}>Waist: {m.waist ?? '-'}</Text>
          <Text style={styles.value}>Height: {m.height ?? '-'}</Text>
          <Text style={styles.value}>Biceps: {m.biceps ?? '-'}</Text>
          <Text style={styles.value}>Shoulder: {m.shoulder ?? '-'}</Text>
          <Text style={styles.value}>Neck: {m.neck ?? '-'}</Text>
          <Text style={styles.value}>Butt: {m.butt ?? '-'}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  date: { fontSize: 12, color: '#888', marginBottom: 8 },
  value: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  image: { width: '100%', height: 180, borderRadius: 8, marginTop: 8 },
  imagePlaceholder: {
    height: 180,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default HistoryCard;
