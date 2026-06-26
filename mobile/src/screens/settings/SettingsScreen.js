import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSync } from '../../contexts/SyncContext';
import { COLORS, SPACING, FONTS, LANGUAGES } from '../../config/constants';
import { getRelativeTime } from '../../utils/dateUtils';

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { locale, changeLanguage } = useLanguage();
  const { lastSync, sync, isOnline } = useSync();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleLanguageChange = () => {
    const newLocale = locale === LANGUAGES.EN ? LANGUAGES.HI : LANGUAGES.EN;
    changeLanguage(newLocale);
    Alert.alert('Success', 'Language changed successfully');
  };

  const handleSync = async () => {
    if (!isOnline) {
      Alert.alert('Offline', 'Please connect to internet to sync');
      return;
    }
    await sync();
    Alert.alert('Success', 'Data synced successfully');
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightText }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemIcon}>{icon}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
      </View>
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.profileName}>{user?.name || 'User'}</Text>
        <Text style={styles.profilePhone}>{user?.phone || ''}</Text>
      </View>

      {/* Settings Items */}
      <View style={styles.section}>
        <SettingItem
          icon="👤"
          title="Profile"
          subtitle="View and edit your profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <SettingItem
          icon="🌐"
          title="Language"
          subtitle="Change app language"
          onPress={handleLanguageChange}
          rightText={locale === LANGUAGES.EN ? 'English' : 'हिन्दी'}
        />
        <SettingItem
          icon="🔄"
          title="Sync Data"
          subtitle={lastSync ? `Last synced: ${getRelativeTime(lastSync)}` : 'Never synced'}
          onPress={handleSync}
        />
        <SettingItem
          icon="ℹ️"
          title="About"
          subtitle="Version 1.0.0"
          onPress={() => Alert.alert('Health Tracker', 'Version 1.0.0\n\nTrack your health, anytime, anywhere.')}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileSection: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: FONTS.sizes.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  profilePhone: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.gray,
  },
  section: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  itemIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemSubtitle: {
    fontSize: FONTS.sizes.small,
    color: COLORS.gray,
    marginTop: 2,
  },
  rightText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.gray,
    marginRight: SPACING.sm,
  },
  chevron: {
    fontSize: 24,
    color: COLORS.gray,
  },
  logoutButton: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoutText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.danger,
    fontWeight: '600',
  },
});

export default SettingsScreen;
