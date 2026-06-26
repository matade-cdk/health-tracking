import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, SPACING, FONTS } from '../../config/constants';
import storageService from '../../services/storageService';
import { formatTime } from '../../utils/dateUtils';

const RemindersScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const data = await storageService.getReminders();
    setReminders(data);
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = reminders.filter(r => r.id !== id);
            await storageService.saveReminders(updated);
            loadReminders();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {reminders.length > 0 ? (
          reminders.map(reminder => (
            <View key={reminder.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{reminder.title}</Text>
                <TouchableOpacity onPress={() => handleDelete(reminder.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cardMessage}>{reminder.message}</Text>
              <Text style={styles.cardTime}>
                {reminder.hour}:{reminder.minute.toString().padStart(2, '0')}
                {reminder.repeat && ' • Daily'}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No reminders set</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddReminder')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: FONTS.sizes.medium,
  },
  cardMessage: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  cardTime: {
    fontSize: FONTS.sizes.small,
    color: COLORS.gray,
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING.xl,
    marginTop: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONTS.sizes.large,
    color: COLORS.gray,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: COLORS.white,
  },
});

export default RemindersScreen;
