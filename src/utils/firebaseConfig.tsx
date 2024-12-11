import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';

const firebaseConfig = {
  apiKey: " ",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: " ",
  measurementId: "YOUR_MEASUREMENT_ID",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// Initialize Notifications and get Expo push token
export const initializeNotifications = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: requestedStatus } = await Notifications.requestPermissionsAsync();
    if (requestedStatus !== 'granted') {
      console.error('Notification permissions denied');
      return null;
    }
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    // Save the token to Firestore
    await savePushTokenToFirestore(token);

    return token;
  } catch (error) {
    console.error('Error fetching Expo push token', error);
    return null;
  }
};

// Function to save push token to Firestore
const savePushTokenToFirestore = async (token: string) => {
  try {
    const userId = getAuth().currentUser?.uid;  // Assuming the user is logged in

    if (userId) {
      const userTokenRef = doc(firestore, 'push_tokens', userId);  // Save under userId
      await setDoc(userTokenRef, { token: token });
      console.log('Push token saved successfully');
    } else {
      console.log('No user is logged in');
    }
  } catch (error) {
    console.error('Error saving push token:', error);
  }
};

// Send Push Notification (Can be tested via Postman or backend)
export const sendPushNotification = async (expoPushToken: string) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test Notification',
    body: 'This is a test push notification!',
    data: { appointmentId: '12345' },  // Example data
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const responseData = await response.json();
    console.log('Push notification sent successfully', responseData);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};
