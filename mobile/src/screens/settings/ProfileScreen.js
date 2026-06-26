import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, SPACING, FONTS } from '../../config/constants';

const ProfileScreen = () => {
  const { user } = useAuth();

  const InfoRow = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || 'Not set'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <InfoRow label="Name" value={user?.name} />
        <InfoRow label="Phone" value={user?.phone} />
        <InfoRow label="Age" value={user?.age} />
        <InfoRow label="Gender" value={user?.gender} />
        <InfoRow label="Village/Area" value={user?.village} />
        <InfoRow label="Blood Group" value={user?.bloodGroup} />
        <InfoRow label="Emergency Contact" value={user?.emergencyContact} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  row: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  label: {
    fontSize: FONTS.sizes.small,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  value: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    fontWeight: '500',
  },
});

export default ProfileScreen;
