import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms, vs} from 'react-native-size-matters';
import Logo from '../assets/images/logo.svg';
import CustomButton from '../components/common/CustomButton';
import LanguageSelector from '../components/common/LanguageSelector';
import {TextBigger, TextSmall} from '../components/common/Texts';
import CountrySelector from '../components/CountrySelector';
import {COLORS} from '../utils/theme';

interface OnboardingProps {}

export const OnboardingScreen: React.FC<OnboardingProps> = props => {
  const {navigation} = props;

  const [selectedCountry, setSelectedCountry] = useState<string>('AZ');
  const handleNext = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View>
        <LanguageSelector />
      </View>
      <View style={styles.centerContainer}>
        <Logo size={20} />
        <TextSmall color={COLORS.gray}>HEALTH_FOOTSTEP</TextSmall>
        <TextBigger bold>EXPERIENCE_PREMIUM_HEALTH</TextBigger>
        <TextSmall color={COLORS.gray}>SELECT_COUNTRY_SERVICE</TextSmall>

        <CountrySelector
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        <TextSmall color={COLORS.primary} underline>
          DIDNT_FIND_COUNTRY
        </TextSmall>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title="NEXT"
          disabled={!!!selectedCountry}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(20),
  },
  centerContainer: {flex: 1, gap: vs(12), zIndex: 1},
  btnContainer: {justifyContent: 'flex-end', paddingBottom: 20},
});
