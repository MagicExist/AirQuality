import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLOMBIAN_CITIES } from '../../models/cities';
import { City } from '../../models/types';

interface Props {
  selected: City;
  onSelect: (city: City) => void;
}

export default function CityPicker({ selected, onSelect }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>{selected.name}</Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Selecciona una ciudad</Text>
          <FlatList
            data={COLOMBIAN_CITIES}
            keyExtractor={(c) => c.name}
            renderItem={({ item }) => {
              const active = item.name === selected.name;
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => { onSelect(item); setVisible(false); }}
                  activeOpacity={0.65}
                >
                  <Text style={[styles.itemText, active && styles.itemTextActive]}>
                    {item.name}
                  </Text>
                  {active && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  triggerText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a2e',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 18,
    color: '#9ba8c0',
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#dde3ec',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ba8c0',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
  },
  itemText: {
    flex: 1,
    fontSize: 17,
    color: '#1a1a2e',
  },
  itemTextActive: {
    color: '#4361ee',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#4361ee',
    fontWeight: '700',
  },
});
