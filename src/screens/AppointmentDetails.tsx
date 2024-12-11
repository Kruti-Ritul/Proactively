import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

type AppointmentDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'AppointmentDetails'>;

const AppointmentDetails: React.FC = () => {
  const navigation = useNavigation<AppointmentDetailsNavigationProp>();


  // Function to open Google Meet
  const openGoogleMeet = () => {
    const meetLink = 'https://meet.google.com/nhz-yyyb-dyr'; // Replace with actual Google Meet URL
    //Alert.alert('Opening Google Meet...');
    Linking.openURL(meetLink).catch((err) => Alert.alert('Error', 'Unable to open Google Meet.'));
  };

  return (
    <View style={styles.container}>
      {/* Green Banner for Upcoming */}
      <View style={styles.upcomingBanner}>
        <Text style={styles.upcomingText}>UPCOMING</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image 
          source={require('../assets/appointmentProfile.png')} // Replace with actual profile image URL
          style={styles.profilePic}
        />
      </View>

      {/* Appointment Information */}
      <Text style={styles.appointmentText}>Your upcoming appointment with</Text>
      <Text style={styles.doctorName}>Laurie Simons, MD, DipABLM</Text>

      {/* Purple Appointment Banner */}
      <View style={styles.appointmentBanner}>
        <Text style={styles.appointmentBannerText}>Appointment</Text>
      </View>

      {/* Date and Time */}
      <Text style={styles.detail}>Thu,December 21, 2024 | 10:00 AM PST</Text>

      {/* Horizontal Line */}
      <View style={styles.line} />

      {/* Meeting Link */}
      <Text style={styles.meetingLinkText}>Meeting Link:</Text>
      <Text style={styles.meetingLink}>https://meet.google.com/nhz-yyyb-dyr</Text>

      {/* Join Meeting Button */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openGoogleMeet} style={styles.joinButton}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Join meeting  </Text>
          <Feather name='arrow-up-right' size={22} color={'#fff'}/>          
        </View>
        </TouchableOpacity>
      </View>

      {/*<Button title="Join Meeting" onPress={openGoogleMeet} />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  
  // Green Banner for Upcoming
  upcomingBanner: {
    backgroundColor: '#3A9B78',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    width: 95,
    marginTop: 10,
    marginBottom: -20,
  },
  upcomingText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  
  // Profile Picture
  profileContainer: { alignItems: 'center', marginBottom: 16 },
  profilePic: { width: 200, height: 200, borderRadius: 100, resizeMode: 'cover' },
  
  // Appointment Information
  appointmentText: { fontSize: 18, textAlign: 'center', marginBottom: 8, fontWeight: '500', marginTop: -50 },
  doctorName: { fontSize: 16, fontWeight: '500', textAlign: 'center', marginBottom: 16, color: '#707070' },
  
  // Purple Appointment Banner
  appointmentBanner: {
    backgroundColor: '#CBC3E3',
    //opacity: 0.2,
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    width: 130,
    marginLeft: 110
  },
  appointmentBannerText: { color: '#7A3DB6', fontSize: 18 },
  
  // Date and Time
  detail: { fontSize: 16, marginBottom: 8, marginLeft: 35 },
  
  // Horizontal Line
  line: { height: 1, backgroundColor: '#DCDCDC', marginVertical: 16 },
  
  // Meeting Link
  meetingLinkText: { fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
  meetingLink: { fontSize: 16, color: '#707070', marginBottom: 16 },

  buttonContainer: {backgroundColor: '#F9F9F9', width: '100%', marginTop: 210},
  joinButton: {   
    backgroundColor: '#4384E6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonContent: {flexDirection: 'row', alignItems: 'center',},
  buttonText: {    
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppointmentDetails;
