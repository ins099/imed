import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import NotificationBellSVG from '../assets/images/notibell.svg';
import CustomButton from '../components/common/CustomButton';
import {TextBigger, TextNormal, TextSmall} from '../components/common/Texts';
import {COLORS} from '../utils/theme';

interface RequestNotificationPermissionProps {
  navigation: NavigationProp<any>;
}

export const RequestNotificationRequestScreen: React.FC<
  RequestNotificationPermissionProps
> = props => {
  const {navigation} = props;

  const onPressLater = () => {
    navigation.navigate('Terms');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <NotificationBellSVG />
        <TextBigger bold>TURN_ON_NOTIFICATIONS</TextBigger>
        <TextSmall center>BE_AWARE_OF_NEWS</TextSmall>
        <CustomButton title="TURN_ON_NOTIFICATIONS" onPress={onPressLater} />
        <TextNormal color={COLORS.primary} onPress={onPressLater}>
          MAYBE_LATER
        </TextNormal>
        <TextSmall>ADJUST_NOTIFICATIONS</TextSmall>
      </View>
    </SafeAreaView>
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
