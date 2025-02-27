import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import ReduxProvider from './src/redux/provider';

export default function App() {
  return (
    <ReduxProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </ReduxProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
