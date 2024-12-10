import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

type BMIInputRouteProp = RouteProp<RootStackParamList, 'BMIInput'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'BMIInput'>;

const BMIInputScreen: React.FC = () => {
  const route = useRoute<BMIInputRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { updateHealthData } = route.params;

  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<string>('_'); // State for BMI

  // Load the BMI value from AsyncStorage when the screen is first loaded
  useEffect(() => {
    const loadBMI = async () => {
      try {
        const storedBmi = await AsyncStorage.getItem('bmi');
        if (storedBmi) {
          setBmi(storedBmi); // Set BMI if available
        }
      } catch (error) {
        console.error('Error loading BMI from AsyncStorage:', error);
      }
    };

    loadBMI();
  }, []);

  const calculateAndSaveBMI = async () => {
    if (!height.trim() || !weight.trim()) {
      // Handle missing inputs
      setBmi('_'); // Set BMI as "_" if input is missing
      await AsyncStorage.setItem('bmi', '_'); // Save to AsyncStorage
      updateHealthData('2', '_'); // ID for BMI in healthData
      navigation.goBack();
      return;
    }

    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight) || parsedHeight <= 0 || parsedWeight <= 0) {
      // Handle invalid inputs
      setBmi('_');
      await AsyncStorage.setItem('bmi', '_');
      updateHealthData('2', '_');
      navigation.goBack();
      return;
    }

    // Calculate BMI
    const calculatedBmi = (parsedWeight / ((parsedHeight / 100) ** 2)).toFixed(1);

    // Save the calculated BMI to AsyncStorage and state
    setBmi(calculatedBmi);
    await AsyncStorage.setItem('bmi', calculatedBmi); // Save to AsyncStorage
    updateHealthData('2', calculatedBmi); // Assuming '2' is the ID for BMI in healthData
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your height (in cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholder="Height in cm"
      />
      <Text style={styles.label}>Enter your weight (in kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight in kg"
      />
      <Button title="Save" onPress={calculateAndSaveBMI} />
      <Text style={styles.result}>Your BMI: {bmi}</Text>
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
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
    padding: 8,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default BMIInputScreen;
