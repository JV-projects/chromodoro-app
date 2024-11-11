import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Inicio from './chromo-screens/Inicio';
import Configuracoes from './chromo-screens/Configuracoes';
import Relatorio from './chromo-screens/Relatorio';
import Conta from './chromo-screens/Conta';

export default function App() {

  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>

          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#fff',
                height: 60,
              },
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'gray',
            }}>

            <Tab.Screen
              name="Pomodoro"
              component={Inicio}
              options={{
                tabBarLabelStyle: {
                  display: 'none',  
                },
                tabBarIcon: ({focused}) => {
                  return (
                    <MaterialCommunityIcons style={focused && styles.icon} name="timer-outline" size={28} color={focused ? "#fff" : "#535353"} />
                  );
                },
              }}
            />

            <Tab.Screen
              name="Relatório"
              component={Relatorio}
              options={{
                tabBarLabelStyle: {
                  display: 'none',  
                },
                tabBarIcon: ({focused}) => {
                  return (
                    <FontAwesome6 style={focused && styles.icon} name="chart-simple" size={28} color={focused ? "#fff" : "#535353"} />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Configurações"
              component={Configuracoes}
              options={{
                tabBarLabelStyle: {
                  display: 'none',  
                },
                tabBarIcon: ({focused}) => {
                  return (
                    <Octicons style={focused && styles.icon} name="gear" size={28} color={focused ? "#fff" : "#535353"} />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Conta"
              component={Conta}
              options={{
                tabBarLabelStyle: {
                  display: 'none',  
                },
                tabBarIcon: ({focused}) => {
                  return (
                    <MaterialIcons style={focused && styles.icon} name="account-circle" size={28} color={focused ? "#fff" : "#535353"} />
                  );
                },
              }}
            />
          </Tab.Navigator>

        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon:{
    backgroundColor: "#D1717B",
    padding: 10,
    borderRadius: 12,
  }
});
