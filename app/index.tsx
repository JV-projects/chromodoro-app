// app/index.tsx
import React from 'react';
import App from '../App'; // Importando o App.tsx da raiz do projeto
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App is loaded!</Text>
      <App />
    </View>
  );
}
