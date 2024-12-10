import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

type StepsInputRouteProp = RouteProp<RootStackParamList, 'StepsInput'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'StepsInput'>;

const StepsInput: React.FC = () => {
  const route = useRoute<StepsInputRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { updateHealthData } = route.params;

  const [steps, setSteps] = useState<string>('');
  const [status, setStatus] = useState<string>('No data');
  const [value, setValue] = useState<string>('_');

  // Load the steps value from AsyncStorage when the screen is first loaded
  useEffect(() => {
    const loadSteps = async () => {
      try {
        const storedSteps = await AsyncStorage.getItem('steps');
        if (storedSteps) {
          setSteps(storedSteps); // Set steps if available
          setValue(storedSteps); // Display the stored steps
        }
      } catch (error) {
        console.error('Error loading steps from AsyncStorage:', error);
      }
    };

    loadSteps();
  }, []);

  const handleSave = async () => {
    if (steps.trim()) {
      setStatus('Updated');
      setValue(steps);
      updateHealthData('1', steps); // Update health data for steps
      await AsyncStorage.setItem('steps', steps); // Save steps to AsyncStorage
    } else {
      setStatus('No data');
      setValue('_');
      updateHealthData('1', '_');
      await AsyncStorage.setItem('steps', '_'); // Save empty value to AsyncStorage
    }
    navigation.goBack(); // Go back to HomeScreen
  };

  return (
    <View>
      <Text>Enter Steps:</Text>
      <TextInput
        value={steps}
        onChangeText={setSteps}
        placeholder="Enter steps"
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} />
      <Text>Status: {status}</Text>
      <Text>Stored Steps: {value}</Text>
    </View>
  );
};

export default StepsInput;
