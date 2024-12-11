import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; // No need to import useNavigation here
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRef } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import AppointmentDetails from './src/screens/AppointmentDetails';
import StepsInputScreen from './src/screens/StepsInputScreen';
import BMIInputScreen from './src/screens/BMIInputScreen';
import SleepInputScreen from './src/screens/SleepInputScreen';
import BottomTabs from './src/screens/BottomTabs';
import * as Notifications from 'expo-notifications';
import { navigationRef } from './src/utils/navigationRef'; // Import navigationRef
import { initializeNotifications, sendPushNotification } from './src/utils/firebaseConfig';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Main: undefined; // Main app layout (BottomTabs)
  Accounts: undefined;
  AppointmentDetails: undefined;
  StepsInput: { updateHealthData: (id: string, newValue: string) => void };
  BMIInput: { updateHealthData: (id: string, newValue: string) => void };
  SleepInput: { updateHealthData: (id: string, newValue: string) => void };
  HealthDetails: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {

    const getNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to receive notifications was denied!');
      }
    };
    // Initialize notifications and get token
    const setupNotifications = async () => {
      await getNotificationPermissions();
      const expoPushToken = await initializeNotifications();
      if (expoPushToken) {
        console.log('Expo Push Token:', expoPushToken);

        // Send test push notification
        await sendPushNotification(expoPushToken); // This sends the test notification to the device
      }
    };

    setupNotifications();

    // Listener for background notifications
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const notificationData = response.notification.request.content.data;
        console.log('Notification data received in background:', notificationData);

        if(notificationData?.screen === 'AppointmentDetails'){
          navigationRef.current?.navigate('AppointmentDetails');
        }       
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const notificationData = notification.request.content.data;
        console.log('Notification received in foreground:', notificationData);
        // Handle foreground notification
      }
    );

    // Cleanup listener on unmount
    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Accounts" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
          options={{ title: 'Appointment Details' }}
        />
        <Stack.Screen name="StepsInput" component={StepsInputScreen} options={{ title: 'Steps Entry' }} />
        <Stack.Screen name="BMIInput" component={BMIInputScreen} options={{ title: 'BMI Entry' }} />
        <Stack.Screen name="SleepInput" component={SleepInputScreen} options={{ title: 'Sleep Entry' }} />
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
