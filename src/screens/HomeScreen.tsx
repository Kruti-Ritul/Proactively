import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { getFcmToken } from '../utils/notifications';
//import { sendPushNotification } from '../utils/notifications';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import styles from './HomeScreen.styles'; 

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface HealthData {
  id: string;
  title: string;
  value: string;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Achieve 30k steps weekly', completed: false },
    { id: '2', text: 'Take up health coaching', completed: false },
    { id: '3', text: 'Workout for 30 mins', completed: false },
    { id: '4', text: 'Complete 2 courses', completed: true },
  ]);

  const [progress, setProgress] = useState<number>(0.91);
  const [healthScore, setHealthScore] = useState<number>(2000);

  const getArrowColor = (normalizedValue: number) => {
    if (normalizedValue <= 33) {
      return '#FF8090'; // Red
    } else if (normalizedValue <= 66) {
      return '#FFDA68'; // Orange
    } else {
      return '#75DE8D'; // Green
    }
  };

  const normalizedScore = Math.min(100, Math.max(0, (healthScore / 3000) * 100)); // Normalize the health score to between 0 and 100

  const [appointments, setAppointments] = useState([
    {
      id: '1',
      name: 'Laurie Simons',
      qualification: '   MD, DipABLM',
      specialization: 'Internal Medicine',
      date: 'Thu, Dec 21, 2024',
      time: '10:00 AM',
      arrow: require('../assets/arrow.png'),
      profilePic: require('../assets/image.png'), // Use the uploaded image for profile
    },
  ]);

  useEffect(() => {
    getFcmToken().then((token) => {
      console.log('FCM Token:', token);
    });
  }, []);

  const healthData: HealthData[] = [
    { id: '1', title: 'Steps', value: '—' },
    { id: '2', title: 'BMI', value: '—' },
    { id: '3', title: 'Sleep', value: '—' },
  ];

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    setProgress(completedTasks / tasks.length);
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.healthScoreContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/image.png')}
            style={styles.profileImage}
          />
          <Text style={styles.header}>Ethan Harkinson</Text>
          <TouchableOpacity onPress={() => Alert.alert('Notifications clicked')}>
            <MaterialIcons name="notifications-none" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.healthScoreSection}>
          <Text style={styles.healthScoreTitle}>Health Score</Text>
          <Text style={styles.healthScoreValue}>{healthScore.toLocaleString()}</Text>
          <Text style={styles.healthScoreDescription}>
            This score is for information purposes only.
          </Text>
          <View style={styles.progressContainer}>
            <LinearGradient
              colors={['#FF8090', '#FFDA68', '#75DE8D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressGradient}
            >

              {/* Arrow */}
              
              <View
                style={[
                  styles.arrowIndicator,
                  { 
                    left: `${normalizedScore}%`,
                    borderBottomColor: getArrowColor(normalizedScore), // Color based on position 
                  },
                  
                ]}
              />
            </LinearGradient>
          </View>

          {/* Progress Bar Numbers */}
          <View style={styles.progressNumbers}>
          {[0, 600, 1200, 1800, 2400, 3000].map((num, index) => (
            <Text key={index} style={styles.progressNumber}>
              {num}
            </Text>
          ))}
          </View>


        </View>
      </View>

      <ScrollView style={styles.scrollableContainer}>
        {/* Upcoming Appointment Card */}
        {appointments.map((appointment) => (
          <TouchableOpacity
            key={appointment.id}
            style={styles.card}
            onPress={() => navigation.navigate('AppointmentDetails')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>UPCOMING</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardDetails}>
                <Text style={styles.cardName}>
                  {appointment.name}
                  <Text style={styles.qualificationText}>
                  {appointment.qualification.length > 5 ? `${appointment.qualification.slice(0, 13)}...` : appointment.qualification}
                  </Text>
                </Text>
                <Text style={styles.specializationText}>{appointment.specialization}</Text>
                <Text style={styles.cardDate}>{appointment.date} | {appointment.time}</Text>
              </View>
              <View style={styles.profilePicContainer}>
                <Image source={appointment.arrow} style={styles.arrowIcon}/>
                <Image source={appointment.profilePic} style={styles.profileImageA} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Health Overview</Text>
        <FlatList
          horizontal
          data={healthData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.healthCard}
              onPress={() =>
                navigation.navigate('HealthDetails', { id: item.id })
              }
            >
              <Text style={styles.healthCardTitle}>{item.title}</Text>
              <Text style={styles.healthCardValue}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.sectionTitle}>Let’s check off your to-dos</Text>
        <ProgressBar
          progress={progress}
          color="#4CAF50"
          style={styles.progressBar}
        />
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskItem}
            onPress={() => toggleTask(task.id)}
          >
            <Text
              style={[
                styles.taskText,
                task.completed && styles.taskTextCompleted,
              ]}
            >
              {task.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};



export default HomeScreen;
