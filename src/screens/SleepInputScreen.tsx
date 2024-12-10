import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';

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
          const parsedSleep = parseInt(storedSleep, 10);
          // Only set if parsed value is a valid number
          if (!isNaN(parsedSleep)) {
            setSleepHours(parsedSleep);
          } else {
            setSleepHours(0); // fallback if stored value is invalid
          }
        }
      } catch (error) {
        console.error('Error loading sleep data from AsyncStorage:', error);
        setSleepHours(0); // fallback in case of error
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
      <View style={styles.hoursContainer}>
        <TouchableOpacity style={styles.adjustButton} onPress={() => setSleepHours(Math.max(0, sleepHours - 1))}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <View style={styles.sleepInfo}>
          <Ionicons name='moon-outline' size={25} color={'#707070'} />
          <Text>{'  '}</Text>
          <Text style={styles.sleepHours}>{sleepHours} hours</Text>
        </View>

        <TouchableOpacity style={styles.adjustButton} onPress={() => setSleepHours(sleepHours + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={saveSleepHours}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  hoursContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 10,
    height: 81,
    width: 335,
  },
  adjustButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4F65CB',
    backgroundColor: '#E9F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#4F65CB',
    alignSelf: 'center'
  },
  sleepInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  sleepIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  sleepHours: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    width: 335,
    height: 54,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SleepInputScreen;
