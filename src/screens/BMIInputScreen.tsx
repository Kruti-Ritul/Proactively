import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
      <Text style={styles.text}>Body weight:</Text>
      <View style={styles.inputContainer}>        
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Text style={styles.hint}>kgs</Text>
      </View>
      <Text style={styles.text}>Body Height:</Text>
      <View style={styles.inputContainer}>        
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <Text style={styles.hint}>cms</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={calculateAndSaveBMI}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: -240,
    marginBottom: 10,
    marginTop: 30
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
    marginLeft: -155,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    height: 76,
    width: 173,
  },
  input: {
    marginVertical: 10,
    textAlign: 'left',
    fontSize: 32,
    minWidth: 60
  },
  hint: {
    textAlign: 'left',
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 18,
    color: '#999999'
    
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    width: 335,
    height: 54,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BMIInputScreen;
