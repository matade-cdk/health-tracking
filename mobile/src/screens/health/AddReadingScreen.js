import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SPACING, FONTS, HEALTH_METRICS } from '../../config/constants';
import healthService from '../../services/healthService';
import { validateHealthReading } from '../../utils/validators';

const AddReadingScreen = ({ navigation }) => {
  const [type, setType] = useState('BP');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const validation = validateHealthReading(type, value);
    if (!validation.valid) {
      Alert.alert('Invalid Value', validation.message);
      return;
    }

    setLoading(true);
    try {
      await healthService.addHealthReading({
        type,
        value: parseFloat(value),
        date: new Date().toISOString(),
        notes,
      });
      Alert.alert('Success', 'Reading saved successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Info', error.message || 'Reading saved locally');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={setType}
          style={styles.picker}
        >
          {Object.keys(HEALTH_METRICS).map(key => (
            <Picker.Item
              key={key}
              label={`${HEALTH_METRICS[key].icon} ${HEALTH_METRICS[key].name}`}
              value={key}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>
        Value ({HEALTH_METRICS[type].unit})
      </Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${HEALTH_METRICS[type].name}`}
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <Text style={styles.label}>Notes (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add any notes..."
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Saving...' : 'Save Reading'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  label: {
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  picker: {
    height: 50,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.medium,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: SPACING.sm,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontWeight: 'bold',
  },
});

export default AddReadingScreen;
