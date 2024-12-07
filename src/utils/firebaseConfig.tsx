import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // If using authentication
import { getFirestore } from 'firebase/firestore'; // If using Firestore
import { getMessaging, isSupported } from 'firebase/messaging'; // For Messaging

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

/**
 * Async function to check if messaging is supported and return the messaging instance.
 */
export const initializeMessaging = async () => {
  const messagingInstance = await (await isSupported() ? getMessaging(firebaseApp) : null);
  return messagingInstance;
};

// You can then call `initializeMessaging` when you need the messaging instance:
initializeMessaging().then(messaging => {
  if (messaging) {
    console.log('Firebase Messaging is supported and initialized.');
  } else {
    console.warn('Firebase Messaging is not supported.');
  }
});
