import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, FONTS, HEALTH_METRICS } from '../../config/constants';
import healthService from '../../services/healthService';

const HealthReadingsScreen = ({ navigation }) => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      const allReadings = await healthService.getHealthRecords();
      setReadings(allReadings);
    } catch (error) {
      console.error('Error loading readings:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Health Readings</Text>
        {Object.keys(HEALTH_METRICS).map(type => (
          <TouchableOpacity
            key={type}
            style={styles.card}
            onPress={() => navigation.navigate('HealthChart', { type })}
          >
            <Text style={styles.icon}>{HEALTH_METRICS[type].icon}</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{HEALTH_METRICS[type].name}</Text>
              <Text style={styles.cardSubtitle}>View chart →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  title: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: '600',
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.primary,
  },
});

export default HealthReadingsScreen;
