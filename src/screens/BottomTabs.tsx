import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            const iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Accounts') {
            const iconName = focused ? 'account-circle' : 'account-circle-outline'; // Corrected names
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#6156B2',
        tabBarInactiveTintColor: '#707070',
        tabBarLabelStyle: {paddingBottom: 2, fontSize: 12},
        tabBarStyle: {padding:10, height:60, backgroundColor: 'white', elevation: 15, shadowColor: '#000', shadowOffset: {width: 0, height: -2}, shadowOpacity: 0.3, shadowRadius: 4 }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Accounts" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

})

