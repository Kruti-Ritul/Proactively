import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

/**
 * Requests notification permissions and retrieves the Expo push token.
 */
export const getFcmToken = async (): Promise<string | null> => {
  try {
    // Ensure the device is physical (push notifications only work on physical devices)
    if (!Constants.isDevice) {
      console.warn('Push notifications are only supported on physical devices.');
      return null;
    }

    // Check for existing notification permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      // Request permission if not already granted
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Notification permissions not granted.');
      return null;
    }

    // Get the Expo Push Token
    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Expo Push Token:', token.data);
    return token.data;
  } catch (error) {
    console.error('Error fetching Expo push token:', error);
    return null;
  }
};

/**
 * Sends a push notification using Expo's API.
 * @param token - Expo push token to send the notification to.
 */
export const sendPushNotification = async (token: string) => {
  try {
    const message = {
      to: token,
      sound: 'default',
      title: 'Upcoming Appointment',
      body: 'You have an upcoming appointment with Laurie Simons.',
      data: { screen: 'AppointmentDetails' }, // Optional: send data payload
    };

    // Send notification via Expo Push API
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Failed to send notification: ${response.statusText}`);
    }

    console.log('Notification sent successfully:', await response.json());
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

/**
 * Listens for foreground notifications and schedules them for display.
 */
export const listenForNotifications = () => {
  // Listen for foreground notifications
  Notifications.addNotificationReceivedListener((notification) => {
    console.log('Notification received in foreground:', notification);

    Notifications.scheduleNotificationAsync({
      content: {
        title: notification.request.content.title || 'Notification',
        body: notification.request.content.body || 'You have a new message.',
        data: notification.request.content.data,
      },
      trigger: null, // Trigger immediately
    });
  });

  // Add listener for when the notification is opened (in case the user taps on the notification)
  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('Notification opened:', response);

    // You can navigate to the specific screen here if needed
    const { screen } = response.notification.request.content.data;
    if (screen) {
      // Navigate to the screen (use your app's navigation method here)
      console.log(`Navigate to: ${screen}`);
    }
  });
};

/**
 * Configures notification behavior and settings for the app.
 */
export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};
