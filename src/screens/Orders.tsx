import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextNormal} from '../components/common/Texts';

interface OrdersScreenProps {}

export const OrdersScreen: React.FC<OrdersScreenProps> = props => {
  const {} = props;
  return (
    <View style={styles.container}>
      <TextNormal>Orders</TextNormal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
