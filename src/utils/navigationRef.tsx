import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Import RootStackParamList from your main App file

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();
