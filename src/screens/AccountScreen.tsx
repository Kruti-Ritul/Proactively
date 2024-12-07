import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import styles from './Accounts.styles';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Accounts'>; // Specify the type for the Account screen

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the correctly typed navigation prop

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove any stored authentication token
      navigation.navigate('Login'); // Navigate to the login screen (you can adjust as needed)
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <View>
      <Text>Profile Details</Text>
      {/* Add more profile-related UI here */}
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
