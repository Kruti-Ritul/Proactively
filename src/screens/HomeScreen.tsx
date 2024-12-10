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
import { Checkbox } from 'expo-checkbox';


type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Task {
  id: string;
  text: string;
  completed: boolean;
  author: string;
  date: string;
}

interface HealthData {
  id: string;
  title: string;
  state: string;
  value: string;
  color: string;
  stateTextColor: string;
  valueTextColor: String;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      text: 'Achieve 30k steps every week for blood sugar',
      completed: false,
      author: 'Laurie Simons',
      date: 'Sep 5, 2024',
    },
    {
      id: '2',
      text: 'Take up health Coaching',
      completed: false,
      author: 'Laurie Simons',
      date: 'Sep 5, 2024',
    },
    {
      id: '3',
      text: 'Go to a nearby gym and workout for 30 mins',
      completed: false,
      author: 'Laurie Simons',
      date: 'Sep 5, 2024',
    },
    {
      id: '4',
      text: 'Complete 2 courses of Dr. Laurie Simons',
      completed: true,
      author: 'Laurie Simons',
      date: 'Aug 30, 2024',
    },
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
      profilePic: require('../assets/appointmentProfile.png'), // Use the uploaded image for profile
    },
  ]);

  //Appointment
  useEffect(() => {
    getFcmToken().then((token) => {
      console.log('FCM Token:', token);
    });
  }, []);



  //Health Card
  const [healthData, setHealthData] = useState<HealthData[]>([
    {
      id: '1',
      title: 'Steps',
      state: 'No Data',
      value: '_',
      color: '#E9F0FF',
      stateTextColor: '#4F65CB',
      valueTextColor: '#4F65CB',
    },
    {
      id: '2',
      title: 'BMI',
      state: 'No data',
      value: '_',
      color: '#FBFFC8',
      stateTextColor: '#7B8400',
      valueTextColor: '#7B8400',
    },
    {
      id: '3',
      title: 'Sleep',
      state: 'No data',
      value: '_',
      color: '#FFECC8',
      stateTextColor: '#B27500',
      valueTextColor: '#B27500',
    },
  ]);

  const updateHealthData = (id: string, newValue: string) => {
    setHealthData((prevData) =>
      prevData.map((data) =>
        data.id === id 
          ? {
            ...data,
            value: newValue,
            state: newValue === '_' ? 'No data' : 'Updated',

           }
          : data
      )
    );
  };


  //To do
  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    setProgress(totalTasks > 0 ? completedTasks / totalTasks : 0);
  }, [tasks]);

  //To do
  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.healthScoreContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/healthscoreprofile.png')}
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
                {/*<Image source={appointment.arrow} style={styles.arrowIcon}/>*/}
                <Image source={appointment.profilePic} style={styles.profileImageA} />
              </View>
            </View>
          </TouchableOpacity>
        ))}


        {/* Health Cards */}
        <Text style={styles.sectionTitle}>Health Overview</Text>
        <FlatList
          horizontal
          data={healthData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.healthCard, { backgroundColor: item.color }]}
              onPress={() => {
                if (item.id === '1') navigation.navigate('StepsInput', { updateHealthData: updateHealthData, });
                if (item.id === '2') navigation.navigate('BMIInput', { updateHealthData: updateHealthData });
                if (item.id === '3') navigation.navigate('SleepInput', { updateHealthData: updateHealthData });
              }
              }
            >
              <Text style={styles.healthCardTitle}>{item.title}</Text>
              <Text style={[styles.healthCardState, { color: item.stateTextColor}]}>{item.state}</Text>
              <Text style={[styles.healthCardValue, { color: item.stateTextColor}]}>{item.value}</Text>
            </TouchableOpacity>            
          )}
          showsHorizontalScrollIndicator={false}
        />


        {/* Task Progress Section */}

        <Text style={styles.sectionTitle}>Let’s check off your to-dos</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {tasks.filter((task) => task.completed).length}/{tasks.length} Completed
        </Text>
        <ProgressBar progress={progress} color="#4CAF50" style={styles.progressBar} />
      </View>

      {tasks.map((task) => (
        <View key={task.id} style={styles.taskContainer}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleTask(task.id)}
            color={task.completed ? '#4CAF50' : '#BDBDBD'}
            style={styles.checkBox}
          />
          <View>
            <Text
              style={[styles.taskText, task.completed && styles.taskTextCompleted]}
            >
              {task.text}
            </Text>
            <Text style={styles.taskMetadata}>
              {task.author} • {task.date}
            </Text>
          </View>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};



export default HomeScreen;
