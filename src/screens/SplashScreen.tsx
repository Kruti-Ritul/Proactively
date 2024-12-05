import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient'; // Gradient background
import { RootStackParamList } from '../../App';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login'); // Type-safe navigation
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#204CBB', '#00AB9A']} // Gradient colors
      start={{ x: 0, y: 1 }} // Start gradient from top-left
      end={{ x: 1, y: 0 }} // End gradient at bottom-right
      style={styles.container}
    >
      <Image
        source={require('../assets/splash.png')} // Replace with your logo/image
        style={styles.logo}
      />
      <Text style={styles.poweredText}>Powered by Proactively</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    resizeMode: 'contain', // Ensure the image maintains aspect ratio
  },
  poweredText: {
    position: 'absolute',
    bottom: 20, // Position at the bottom
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff', // Text color
  },
});

export default SplashScreen;
