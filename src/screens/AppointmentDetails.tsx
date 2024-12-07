import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';


const AppointmentDetails: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Details</Text>
      <Text style={styles.detail}>Doctor: Laurie Simons</Text>
      <Text style={styles.detail}>Specialization: Internal Medicine</Text>
      <Text style={styles.detail}>Date: December 21, 2024</Text>
      <Text style={styles.detail}>Time: 10:00 AM</Text>
      <Button title="Join Meeting" onPress={() => openGoogleMeet()} />
    </View>
  );
};

// Function to open Google Meet
const openGoogleMeet = () => {
  Alert.alert('Opening Google Meet...');
  // Here, you can use Linking API to open a Google Meet URL
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 18, marginBottom: 5 },
});

export default AppointmentDetails;
