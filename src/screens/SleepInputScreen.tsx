import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

type SleepInputRouteProp = RouteProp<RootStackParamList, 'SleepInput'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'SleepInput'>;

const SleepInputScreen: React.FC = () => {
  const route = useRoute<SleepInputRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { updateHealthData } = route.params;

  const [sleepHours, setSleepHours] = useState<number>(0);

  // Load the sleep data from AsyncStorage on initial render
  useEffect(() => {
    const loadSleepData = async () => {
      try {
        const storedSleep = await AsyncStorage.getItem('sleep');
        if (storedSleep) {
          setSleepHours(parseInt(storedSleep, 10)); // Set the sleep hours from AsyncStorage
        }
      } catch (error) {
        console.error('Error loading sleep data from AsyncStorage:', error);
      }
    };

    loadSleepData();
  }, []);

  // Function to save the sleep hours to AsyncStorage and update the parent state
  const saveSleepHours = async () => {
    try {
      const status = sleepHours > 0 ? 'Updated' : 'No data';
      const value = sleepHours > 0 ? sleepHours.toString() : '_';

      // Save the value to AsyncStorage
      await AsyncStorage.setItem('sleep', value);

      // Update the health data in the parent component
      updateHealthData('3', value); // Assuming '3' is the ID for sleep

      // Navigate back to the HomeScreen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving sleep hours:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sleep Hours: {sleepHours}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add Hour" onPress={() => setSleepHours(sleepHours + 1)} />
        <Button title="Remove Hour" onPress={() => setSleepHours(Math.max(0, sleepHours - 1))} />
      </View>
      <Button title="Save" onPress={saveSleepHours} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
});

export default SleepInputScreen;
