import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirQualityData } from '../../models/types';

const RISK_CONFIG: Record<AirQualityData['riskLevel'], { color: string; bg: string; icon: string }> = {
  Bajo:     { color: '#1e8e3e', bg: '#e6f4ea', icon: '✅' },
  Moderado: { color: '#b45309', bg: '#fff7ed', icon: '⚠️' },
  Alto:     { color: '#c0392b', bg: '#fdf2f2', icon: '🚨' },
};

interface Props {
  result: AirQualityData;
}

export default function ResultCard({ result }: Props) {
  const { color, bg, icon } = RISK_CONFIG[result.riskLevel];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Resultados</Text>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>PM2.5 Promedio</Text>
          <Text style={styles.metricValue}>{result.avgPm25.toFixed(2)}</Text>
          <Text style={styles.metricUnit}>µg/m³</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Índice de Exposición</Text>
          <Text style={styles.metricValue}>{result.exposureIndex.toFixed(2)}</Text>
          <Text style={styles.metricUnit}>índice</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={[styles.riskBadge, { backgroundColor: bg }]}>
        <Text style={styles.riskIcon}>{icon}</Text>
        <View>
          <Text style={styles.riskLabel}>Nivel de Riesgo</Text>
          <Text style={[styles.riskValue, { color }]}>{result.riskLevel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: '#9ba8c0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ba8c0',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 48,
    backgroundColor: '#eef2f7',
  },
  metricLabel: {
    fontSize: 11,
    color: '#9ba8c0',
    textAlign: 'center',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  metricUnit: {
    fontSize: 11,
    color: '#9ba8c0',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#eef2f7',
    marginVertical: 16,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  riskIcon: {
    fontSize: 28,
  },
  riskLabel: {
    fontSize: 11,
    color: '#6b7a99',
    marginBottom: 2,
  },
  riskValue: {
    fontSize: 20,
    fontWeight: '800',
  },
});
