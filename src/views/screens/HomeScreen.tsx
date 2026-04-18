import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calidad del Aire</Text>
      <Text style={styles.subtitle}>Próximamente: formulario de consulta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
});
