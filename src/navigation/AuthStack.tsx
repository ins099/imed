import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AuthStackParamList} from './interface';
import WelcomeScreen from '../screens/Welcome';
import {OnboardingScreen} from '../screens/Onboarding';
import {RegisterScreen} from '../screens/Register';
import {TermsConditionsScreen} from '../screens/TermsConditions';
import {RequestNotificationRequestScreen} from '../screens/RequestNotificationPermission';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Terms" component={TermsConditionsScreen} />
      <Stack.Screen
        name="RequestNotification"
        component={RequestNotificationRequestScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
