import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { useSync } from '../../contexts/SyncContext';
import { COLORS, SPACING, FONTS, HEALTH_METRICS } from '../../config/constants';
import healthService from '../../services/healthService';
import { formatDate, getRelativeTime } from '../../utils/dateUtils';
import { formatHealthValue } from '../../utils/formatters';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { isOnline, isSyncing, lastSync, sync } = useSync();
  const [latestReadings, setLatestReadings] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLatestReadings();
  }, []);

  const loadLatestReadings = async () => {
    try {
      const readings = {};
      for (const key in HEALTH_METRICS) {
        const latest = await healthService.getLatestReading(key);
        if (latest) {
          readings[key] = latest;
        }
      }
      setLatestReadings(readings);
    } catch (error) {
      console.error('Error loading readings:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLatestReadings();
    if (isOnline) {
      await sync();
    }
    setRefreshing(false);
  };

  const getStatusColor = (type, value) => {
    const metric = HEALTH_METRICS[type];
    if (!metric || !metric.normalRange) return COLORS.gray;
    
    const num = parseFloat(value);
    if (num < metric.normalRange.min) return COLORS.warning;
    if (num > metric.normalRange.max) return COLORS.danger;
    return COLORS.success;
  };

  const HealthCard = ({ type, data }) => {
    const metric = HEALTH_METRICS[type];
    if (!metric || !data) return null;

    return (
      <View style={styles.healthCard}>
        <View style={styles.healthCardHeader}>
          <Text style={styles.healthIcon}>{metric.icon}</Text>
          <View style={styles.healthCardInfo}>
            <Text style={styles.healthCardTitle}>{metric.name}</Text>
            <Text style={styles.healthCardDate}>
              {getRelativeTime(data.date)}
            </Text>
          </View>
        </View>
        <View style={styles.healthCardBody}>
          <Text style={[
            styles.healthCardValue,
            { color: getStatusColor(type, data.value) }
          ]}>
            {formatHealthValue(type, data.value)}
          </Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(type, data.value) }
          ]}>
            <Text style={styles.statusText}>
              {data.value >= metric.normalRange.min && data.value <= metric.normalRange.max
                ? 'Normal'
                : data.value < metric.normalRange.min ? 'Low' : 'High'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: isOnline ? COLORS.success : COLORS.danger }
            ]} />
            <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Sync Status */}
        {lastSync && (
          <View style={styles.syncBanner}>
            <Text style={styles.syncText}>
              Last synced: {getRelativeTime(lastSync)}
            </Text>
            {isSyncing && <Text style={styles.syncingText}> (Syncing...)</Text>}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('AddReading')}
            >
              <Text style={styles.actionIcon}>➕</Text>
              <Text style={styles.actionText}>Add Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Health')}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>View Charts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Latest Readings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Readings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Health')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {Object.keys(latestReadings).length > 0 ? (
            Object.keys(latestReadings).map(type => (
              <HealthCard key={type} type={type} data={latestReadings[type]} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>No health data available</Text>
              <Text style={styles.emptySubtext}>
                Start tracking by adding your first reading
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.white,
    opacity: 0.8,
  },
  userName: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  statusText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.white,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  syncBanner: {
    backgroundColor: COLORS.lightGray,
    padding: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.gray,
  },
  syncingText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  section: {
    padding: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  viewAllText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    padding: SPACING.lg,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginHorizontal: SPACING.sm,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  actionText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    fontWeight: '600',
  },
  healthCard: {
    backgroundColor: COLORS.cardBg,
    padding: SPACING.lg,
    borderRadius: 20,
    marginBottom: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  healthCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  healthIcon: {
    fontSize: 32,
    marginRight: SPACING.sm,
  },
  healthCardInfo: {
    flex: 1,
  },
  healthCardTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  healthCardDate: {
    fontSize: FONTS.sizes.small,
    color: COLORS.gray,
  },
  healthCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthCardValue: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONTS.sizes.large,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default DashboardScreen;
