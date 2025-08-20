import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {OrdersScreen} from '../../screens/Orders';

interface OrderStackProps {}

const Stack = createStackNavigator();

const OrdersStack: React.FC<OrderStackProps> = props => {
  const {} = props;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

export default OrdersStack;
