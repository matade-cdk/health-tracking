import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏥 Health Tracker</Text>
      <Text style={styles.subtext}>App is running!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 18,
    color: '#666',
  },
});
