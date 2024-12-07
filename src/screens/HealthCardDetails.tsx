import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type HealthDetailsRouteProp = RouteProp<RootStackParamList, 'HealthDetails'>;

const HealthCardDetails: React.FC<{ route: HealthDetailsRouteProp }> = ({ route }) => {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>Health Card Details for ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HealthCardDetails;
    