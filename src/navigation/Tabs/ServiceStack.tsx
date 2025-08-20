import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ServicesScreen} from '../../screens/Services';
import {PlaceOrderScreen} from '../../screens/PlaceOrder';

interface ServiceStackProps {}

const Stack = createStackNavigator();

export const ServiceStack: React.FC<ServiceStackProps> = props => {
  const {} = props;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
    </Stack.Navigator>
  );
};
