import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../config/constants';

// Screens
import DashboardScreen from '../screens/home/DashboardScreen';
import HealthReadingsScreen from '../screens/health/HealthReadingsScreen';
import HealthChartScreen from '../screens/health/HealthChartScreen';
import AddReadingScreen from '../screens/health/AddReadingScreen';
import RemindersScreen from '../screens/reminders/RemindersScreen';
import AddReminderScreen from '../screens/reminders/AddReminderScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="AddReading" 
      component={AddReadingScreen}
      options={{ title: 'Add Reading' }}
    />
  </Stack.Navigator>
);

// Health Stack
const HealthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HealthReadings" 
      component={HealthReadingsScreen}
      options={{ title: 'Health Readings' }}
    />
    <Stack.Screen 
      name="HealthChart" 
      component={HealthChartScreen}
      options={{ title: 'Health Chart' }}
    />
  </Stack.Navigator>
);

// Reminders Stack
const RemindersStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="RemindersList" 
      component={RemindersScreen}
      options={{ title: 'Reminders' }}
    />
    <Stack.Screen 
      name="AddReminder" 
      component={AddReminderScreen}
      options={{ title: 'Add Reminder' }}
    />
  </Stack.Navigator>
);

// Settings Stack
const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="SettingsList" 
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="Health" 
        component={HealthStack}
        options={{
          tabBarLabel: 'Health',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>❤️</Text>,
        }}
      />
      <Tab.Screen 
        name="Reminders" 
        component={RemindersStack}
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🔔</Text>,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
