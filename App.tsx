import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AppointmentDetails from './src/screens/AppointmentDetails';
import HealthCardDetails from './src/screens/HealthCardDetails';
import BottomTabs from './src/screens/BottomTabs'; 
import * as Notifications from 'expo-notifications';
import './src/utils/firebaseConfig'; 
import AccountScreen from './src/screens/AccountScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  AppointmentDetails: undefined;
  HealthDetails: { id: string };
  Accounts: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    // Request notification permissions
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        console.log('Notification permissions granted');
      } else {
        console.log('Notification permissions denied');
      }
    };

    requestNotificationPermission();

    // Listener for receiving notifications
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    // Cleanup listener on unmount
    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Accounts" component={AccountScreen} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
        <Stack.Screen name="HealthDetails" component={HealthCardDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
