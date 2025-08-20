import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeScreen} from '../../screens/Home';

interface HomeStackProps {}

const Stack = createStackNavigator();

export const HomeStack: React.FC<HomeStackProps> = props => {
  const {} = props;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
