import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HistoryCard from '../components/HistoryCard';
import { WeightEntry, MeasurementEntry } from '../types/entries';

type Props = {
  activeType: 'weight' | 'measurement';
  activeTab: 'history' | 'chart';
  historyData: (WeightEntry | MeasurementEntry)[];
};

const HistorySection: React.FC<Props> = ({ activeType, activeTab, historyData }) => (
  <View style={styles.container}>
    {activeTab === 'history' ? (
      historyData.length > 0 ? (
        <FlatList
          data={historyData}
          keyExtractor={(item, index) =>
            (item as any).id ? String((item as any).id) : `${(item as any).date}-${index}`
          }
          renderItem={({ item }) => <HistoryCard type={activeType} data={item as any} />}
        />
      ) : (
        <Text style={styles.noDataText}>No {activeType} history yet</Text>
      )
    ) : (
      <View style={styles.chartPlaceholder}>
        <Text style={{ color: '#666' }}>Chart will be displayed here</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  noDataText: { textAlign: 'center', color: '#888', marginTop: 16 },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistorySection;
