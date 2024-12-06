import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (email === 'user@example.com' && password === 'pass') {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.loginText}>Login to</Text>
        <Image
          source={require('../assets/brand.png')} // Replace with your logo path
          style={styles.brandImage}
        />
        <Text style={styles.lightText}>Login as a patient using your registered email.</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showPassword} // Conditionally hide/show password
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#757575" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Long Line Divider */}
      <View style={styles.lineContainer}>
        <Image style={styles.line} source={require('../assets/or.png')} />
      </View>

      {/* Social Login Buttons */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButtonG}>
          <View style={styles.buttonContent}>
            <Image style={styles.gIcon} source={require('../assets/Google Logo.png')} />
            <Text style={styles.socialButtonTextG}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtonA}>
          <View style={styles.buttonContent}>
            <Image style={styles.gIcon} source={require('../assets/Apple Logo.png')} />
            <Text style={styles.socialButtonTextA}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  headerContainer: {
    position: 'absolute', // Fix the position to the top-left corner
    top: 50, // Adjust this value to position the text and image from the top
    bottom: 0,
    left: 16, // Adjust this value to position the text and image from the left
    flexDirection: 'column', // Stack the text and image vertically
    alignItems: 'flex-start', // Align items to the left
  },
  loginText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222222',
    marginTop: 20,
    marginBottom: -5, // Space between text and image
  },
  brandImage: {
    width: 200, // Adjust width of the logo
    height: 65, // Adjust height of the logo
    resizeMode: 'contain', // Maintain aspect ratio
  },
  lightText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#707070',
    marginTop: 15,
    marginBottom: -5,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: -10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  button: {
    backgroundColor: '#4384E6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    marginTop: 8,
    width: '100%',
  },
  socialButtonsContainer: {
    width: '106%',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  socialButtonG: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  socialButtonA: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  socialButtonTextG: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '600',
  },
  socialButtonTextA: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gIcon: {
    marginRight: 10,
  },
});

export default LoginScreen;
