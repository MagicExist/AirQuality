import dayjs, { Dayjs } from 'dayjs';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

import { COLOMBIAN_CITIES } from '../../models/cities';
import { AirQualityData, City } from '../../models/types';
import { createAirQualityPresenter } from '../../presenters/AirQualityPresenter';
import CityPicker from '../components/CityPicker';
import ResultCard from '../components/ResultCard';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState<City>(COLOMBIAN_CITIES[0]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hours, setHours] = useState('');
  const [result, setResult] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presenter = useRef(
    createAirQualityPresenter({
      onLoading: () => { setLoading(true); setError(null); setResult(null); },
      onSuccess: (data) => { setLoading(false); setResult(data); },
      onError: (msg) => { setLoading(false); setError(msg); },
    })
  ).current;

  const handleSubmit = () => {
    presenter.handleSubmit(
      selectedCity,
      date ? date.format('YYYY-MM-DD') : '',
      parseFloat(hours)
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🌬️</Text>
          </View>
          <Text style={styles.title}>Calidad del Aire</Text>
          <Text style={styles.subtitle}>Estima tu exposición diaria a la contaminación del aire</Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>

          <Text style={styles.label}>Ciudad</Text>
          <CityPicker selected={selectedCity} onSelect={setSelectedCity} />

          <View style={styles.divider} />

          <Text style={styles.label}>Fecha</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={date ? styles.dateText : styles.datePlaceholder}>
              {date ? date.format('DD [de] MMMM [de] YYYY') : 'Seleccionar fecha'}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.label}>Horas al aire libre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 3"
            placeholderTextColor="#b0bec5"
            value={hours}
            onChangeText={setHours}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Calendar modal — works on Android, iOS, and web */}
        <Modal visible={showDatePicker} transparent animationType="slide">
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setShowDatePicker(false)}
          />
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Seleccionar fecha</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.doneButton}>Listo</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              mode="single"
              date={date ?? dayjs()}
              maxDate={dayjs()}
              onChange={({ date: picked }) => {
                if (picked) {
                  setDate(dayjs(picked));
                  setShowDatePicker(false);
                }
              }}
              styles={{
                selected: { backgroundColor: '#4361ee', borderRadius: 8 },
                selected_label: { color: '#fff', fontWeight: '700' },
                today: { borderWidth: 1, borderColor: '#4361ee', borderRadius: 8 },
              }}
            />
          </View>
        </Modal>

        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Calcular Exposición</Text>
          )}
        </TouchableOpacity>

        {result && <ResultCard result={result} />}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#eef2f7',
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 28,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4361ee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#4361ee',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  headerIconText: { fontSize: 32 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7a99',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },

  // Form card
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#9ba8c0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ba8c0',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eef2f7',
    marginVertical: 16,
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: '#1a1a2e',
  },

  // Date trigger button
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a2e',
    fontWeight: '500',
  },
  datePlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#b0bec5',
  },
  calendarIcon: { fontSize: 18 },

  // Calendar modal / bottom sheet
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#dde3ec',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sheetTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ba8c0',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  doneButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4361ee',
  },

  // Error banner
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff0f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffd0d0',
  },
  errorIcon: { fontSize: 16, marginRight: 8 },
  errorText: {
    flex: 1,
    color: '#c0392b',
    fontSize: 13,
    fontWeight: '500',
  },

  // Submit button
  button: {
    backgroundColor: '#4361ee',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#4361ee',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonDisabled: { opacity: 0.55 },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
