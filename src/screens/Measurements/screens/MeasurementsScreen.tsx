import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { WeightEntry, MeasurementEntry } from '../types/entries';
import ToggleSwitch from '../components/ToggleSwitch';
import WeightInputs from './WeightInputs';
import MeasurementInputs from './MeasurementInputs';
import HistorySection from './HistorySection';
import {
  initDatabase,
  insertMeasurement,
  insertWeight,
  fetchMeasurements,
  fetchWeights,
} from '../storage/database';

const MeasurementsScreen: React.FC = () => {
  const [activeType, setActiveType] = useState<'weight' | 'measurement'>('measurement');
  const [activeTab, setActiveTab] = useState<'history' | 'chart'>('history');

  // Inputs
  const [weight, setWeight] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [biceps, setBiceps] = useState('');
  const [shoulder, setShoulder] = useState('');
  const [neck, setNeck] = useState('');
  const [butt, setButt] = useState('');

  // Histories (from DB)
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const [measurementHistory, setMeasurementHistory] = useState<MeasurementEntry[]>([]);

  const loadHistories = useCallback(async () => {
    const [w, m] = await Promise.all([fetchWeights(), fetchMeasurements()]);
    setWeightHistory(w);
    setMeasurementHistory(m);
  }, []);

  useEffect(() => {
    initDatabase()
      .then(loadHistories)
      .catch((e) => console.warn('DB init error', e));
  }, [loadHistories]);

  const addEntry = async () => {
    try {
      const today = new Date().toLocaleDateString();

      if (activeType === 'weight') {
        if (!weight) return Alert.alert('Weight is required');
        await insertWeight({ date: today, weight: parseFloat(weight), imageUri: photoUri });
        setWeight('');
        setPhotoUri(null);
      } else {
        await insertMeasurement({
          date: today,
          chest: chest ? parseFloat(chest) : undefined,
          waist: waist ? parseFloat(waist) : undefined,
          height: height ? parseFloat(height) : undefined,
          biceps: biceps ? parseFloat(biceps) : undefined,
          shoulder: shoulder ? parseFloat(shoulder) : undefined,
          neck: neck ? parseFloat(neck) : undefined,
          butt: butt ? parseFloat(butt) : undefined,
        });
        setChest(''); setWaist(''); setHeight('');
        setBiceps(''); setShoulder(''); setNeck(''); setButt('');
      }

      await loadHistories();
    } catch (e) {
      Alert.alert('Error', 'Could not save entry.');
      console.warn(e);
    }
  };

  const historyData: (WeightEntry | MeasurementEntry)[] =
    activeType === 'weight' ? weightHistory : measurementHistory;

  return (
    <View style={styles.container}>
      <ToggleSwitch
        options={[{ label: 'Weight', value: 'weight' }, { label: 'Measurement', value: 'measurement' }]}
        active={activeType}
        onChange={(val) => setActiveType(val as any)}
      />

      <ScrollView style={styles.inputSection} contentContainerStyle={{ paddingBottom: 12 }}>
        {activeType === 'weight' ? (
          <WeightInputs
            weight={weight}
            setWeight={setWeight}
            photoUri={photoUri}
            setPhotoUri={setPhotoUri}
          />
        ) : (
          <MeasurementInputs
            chest={chest} setChest={setChest}
            waist={waist} setWaist={setWaist}
            height={height} setHeight={setHeight}
            biceps={biceps} setBiceps={setBiceps}
            shoulder={shoulder} setShoulder={setShoulder}
            neck={neck} setNeck={setNeck}
            butt={butt} setButt={setButt}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={addEntry}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>

      <ToggleSwitch
        options={[{ label: 'History', value: 'history' }, { label: 'Chart', value: 'chart' }]}
        active={activeTab}
        onChange={(val) => setActiveTab(val as any)}
      />

      <HistorySection activeType={activeType} activeTab={activeTab} historyData={historyData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  inputSection: { maxHeight: 280, marginBottom: 16 },
  addButton: {
    backgroundColor: '#00827E',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default MeasurementsScreen;
