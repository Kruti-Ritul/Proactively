import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


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
      <View style={styles.profileContainer}>
      <Image source={require('../assets/healthscoreprofile.png')} style={styles. profilePic}/>
      <View style={styles.profileText}>
        <Text style={styles.nameText}>Ethan Harkinson</Text>
        <Text style={styles.mailText}>user.example@gmail.com</Text>
      </View>      
      </View>

      <View style={styles.account}>
        <MaterialCommunityIcons name={'account-circle-outline'} size={23} color={'#000000'}/>
        <Text style={styles.accountText}>Account</Text>
      </View>
      <View style={styles.line}/>
      {/* Add more profile-related UI here */}
      <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
        <Text style={styles.loginText}>Logout</Text>
        <AntDesign name= {'right'} size={24} color={'#FD7468'}/>
      </TouchableOpacity>
      <Text style={styles.version}>Proactively version 0.0.1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },  
  // Profile Picture
  profileContainer: { alignItems: 'center', marginBottom: 16, flexDirection: 'row', marginTop: 80, marginLeft:30  },
  profilePic: { width: 59, height: 59, borderRadius: 100, resizeMode: 'cover' },
  profileText:{marginLeft: 10},
  nameText: {fontSize: 20, fontWeight:'600'},
  mailText: {color: '#707070', fontSize: 14},
  account: {marginLeft: 10, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15, marginBottom: -5},
  accountText: {marginLeft: 5, fontSize: 16, fontWeight: '600'},
  logoutContainer: {flexDirection: 'row'},
  loginText: {marginRight: 280, marginLeft: 20, fontSize: 16, color: '#FD7468'},  
  // Horizontal Line
  line: { height: 1, backgroundColor: '#DCDCDC', marginVertical: 16, },
  version: {
    marginTop: 520,
    marginLeft: 120,
    fontSize: 14,
    color: '#707070', // Text color
  },
  
 
});



export default AccountScreen;
