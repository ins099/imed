import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms, vs} from 'react-native-size-matters';
import AppleLogo from '../assets/images/apple.svg';
import GoogleLogo from '../assets/images/google.svg';
import Logo from '../assets/images/logo.svg';
import {TextBigger, TextNormal} from '../components/common/Texts';
import {COLORS} from '../utils/theme';
import {useGoogleLogin} from '../utils/hooks/useGoogleLogin';

const WelcomeScreen: React.FC = () => {
  const {handleGoogleLogin} = useGoogleLogin();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topContainer}>
        <Logo />
        <View style={{gap: 5}}>
          <TextBigger center bold>
            IMed
          </TextBigger>
          <TextNormal center color={COLORS.gray}>
            HEALTH_FOOTSTEP
          </TextNormal>
        </View>
      </View>
      <View style={styles.sheet}>
        <View style={{gap: 10, marginTop: 10}}>
          <TextBigger bold center>
            WELCOME_TO_IMED
          </TextBigger>
          <TextNormal
            center
            color={COLORS.gray}
            textStyle={{paddingHorizontal: 20, lineHeight: 25}}>
            BY_CONTINUING
          </TextNormal>
        </View>
        <View style={{flex: 1, gap: 15, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleLogin}>
            <GoogleLogo />
            <View style={{flex: 1}}>
              <TextNormal center color={COLORS.darkGrey}>
                SIGNIN_GOOGLE
              </TextNormal>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.socialButton}>
            <AppleLogo />
            <View style={{flex: 1}}>
              <TextNormal center color={COLORS.darkGrey}>
                SIGNIN_APPLE
              </TextNormal>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center',
    // paddingTop: vs(30),
    gap: vs(15),
    flex: 1,
    justifyContent: 'center',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 0.7,
    padding: ms(10),
    shadowColor: COLORS.black,
    shadowOpacity: 0.4,
    shadowOffset: {height: 1, width: 1},
    elevation: 10,
    paddingTop: ms(20),
  },
  socialButton: {
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: ms(12),
    paddingHorizontal: ms(20),
    borderColor: COLORS.lightgrey,
  },
});
