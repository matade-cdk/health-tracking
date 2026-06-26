import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { SyncProvider } from './src/contexts/SyncContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LanguageProvider>
          <SyncProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </SyncProvider>
        </LanguageProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
