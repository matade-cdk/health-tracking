import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { COLORS, SPACING, FONTS } from '../../config/constants';
import storageService from '../../services/storageService';
import notificationService from '../../services/notificationService';

const AddReminderScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [hour, setHour] = useState('9');
  const [minute, setMinute] = useState('0');
  const [repeat, setRepeat] = useState(true);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    const reminder = {
      id: Date.now().toString(),
      title,
      message,
      hour: parseInt(hour),
      minute: parseInt(minute),
      repeat,
      localOnly: true,
    };

    await storageService.addReminder(reminder);
    await notificationService.scheduleReminder(reminder);

    Alert.alert('Success', 'Reminder created successfully');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Take Medicine"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Reminder message..."
        multiline
        numberOfLines={3}
        value={message}
        onChangeText={setMessage}
      />

      <Text style={styles.label}>Time</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={[styles.input, styles.timeInput]}
          placeholder="HH"
          keyboardType="number-pad"
          maxLength={2}
          value={hour}
          onChangeText={setHour}
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          style={[styles.input, styles.timeInput]}
          placeholder="MM"
          keyboardType="number-pad"
          maxLength={2}
          value={minute}
          onChangeText={setMinute}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Repeat Daily</Text>
        <Switch value={repeat} onValueChange={setRepeat} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Reminder</Text>
      </TouchableOpacity>
    </View>
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.medium,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: SPACING.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    width: 80,
  },
  timeSeparator: {
    fontSize: FONTS.sizes.xlarge,
    marginHorizontal: SPACING.sm,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontWeight: 'bold',
  },
});

export default AddReminderScreen;
