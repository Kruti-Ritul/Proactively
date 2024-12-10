import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.text}>Steps Count:</Text>
      <View style={styles.inputContainer}>        
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={steps}
          onChangeText={setSteps}
        />
        <Text style={styles.hint}>steps</Text>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
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
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    height: 81,
    width: 335,
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
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StepsInput;
