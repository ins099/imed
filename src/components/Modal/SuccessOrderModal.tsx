/* eslint-disable react/jsx-no-duplicate-props */
import {CommonActions, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import TickSVG from '../../assets/images/tick.svg';
import {COLORS} from '../../utils/theme';
import CustomButton from '../common/CustomButton';
import {TextBigger, TextNormal, TextSmall} from '../common/Texts';

interface SuccessOrderModalProps {
  navigation?: NavigationProp<any>;
  closeModal: () => void;
  isVisible: boolean;
}

export const SuccessOrderModal: React.FC<SuccessOrderModalProps> = props => {
  const {navigation, isVisible, closeModal} = props;

  return (
    <Modal isVisible={isVisible} style={{margin: 0, backgroundColor: 'white'}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <TickSVG />
          <TextBigger bold>ORDER_RECIEVED</TextBigger>
          <TextSmall center>REACH_OUT_TO_HOSPITAL</TextSmall>
          <CustomButton
            title="GO_MY_ORDERS"
            onPress={() => {
              closeModal();
              navigation?.goBack();
              navigation?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Orders', params: {screen: 'OrderScreen'}}],
                }),
              );
            }}
          />
          <TextNormal
            onPress={() => {
              closeModal();
              navigation?.goBack();
              navigation?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Home', params: {screen: 'HomeScreen'}}],
                }),
              );
            }}
            color={COLORS.primary}>
            GO_TO_HOMEPAGE
          </TextNormal>
        </View>
        {/* <CustomIcon
          name="cross"
          type="entypo"
          color={COLORS.gray}
          containerStyle={{position: 'absolute', top: 60, left: 10}}
          onPress={closeModal}
        /> */}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(12),
  },
  subContainer: {
    alignItems: 'center',
    gap: 25,
  },
});
// We'll forward it to the hospital, and they’ll reach out to you directly.
