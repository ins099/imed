import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabStack from './BottomTabStack';
import {DashStackParamList} from './interface';
import {PlaceOrderScreen} from '../screens/PlaceOrder';

interface DashProps {}

const Stack = createStackNavigator<DashStackParamList>();

const DashStack: React.FC<DashProps> = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabBar" component={BottomTabStack} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
    </Stack.Navigator>
  );
};

export default DashStack;
