import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirQualityData } from '../../models/types';

const RISK_COLORS: Record<AirQualityData['riskLevel'], string> = {
  Bajo: '#4caf50',
  Moderado: '#ff9800',
  Alto: '#f44336',
};

interface Props {
  result: AirQualityData;
}

export default function ResultCard({ result }: Props) {
  const color = RISK_COLORS[result.riskLevel];

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>PM2.5 Promedio</Text>
      <Text style={styles.value}>{result.avgPm25.toFixed(2)} µg/m³</Text>

      <Text style={styles.label}>Índice de Exposición</Text>
      <Text style={styles.value}>{result.exposureIndex.toFixed(2)}</Text>

      <Text style={styles.label}>Nivel de Riesgo</Text>
      <Text style={[styles.risk, { color }]}>{result.riskLevel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 6,
    marginTop: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  label: { fontSize: 12, color: '#888', marginTop: 12, textTransform: 'uppercase' },
  value: { fontSize: 20, fontWeight: '600', color: '#1a1a2e' },
  risk: { fontSize: 22, fontWeight: 'bold', marginTop: 4 },
});
