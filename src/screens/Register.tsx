import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale, vs} from 'react-native-size-matters';
import CustomIcon from '../components/common/CustomIcon';
import {RegisterStep1} from '../components/Registeration/RegisterStep1';
import {COLORS} from '../utils/theme';
import {RegisterStep2} from '../components/Registeration/RegisterStep2';
import {useForm} from 'react-hook-form';
import {RegisterStep4} from '../components/Registeration/RegisterStep4';
import {RegisterStep3} from '../components/Registeration/RegisterStep3';
import {useRegister} from '../utils/hooks/useRegister';

interface RegisterScreenProps {
  navigation: NavigationProp<any>;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = props => {
  const {navigation} = props;
  const {handleUpdateUser, registerLoading} = useRegister();
  const {control, handleSubmit, trigger} = useForm();

  const [step, setStep] = useState<number>(0);
  const pagerRef = useRef<PagerView>(null);

  const onPressBack = () => {
    decrementPage();
  };

  const onBackPress = useCallback(() => {
    if (step === 0) {
      Alert.alert('Exit App?', 'Are you sure you want to close App?', [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    } else {
      decrementPage();
      return true;
    }
  }, [step]);

  useEffect(() => {
    const subscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => subscribe.remove();
  }, [onBackPress]);

  const decrementPage = () => pagerRef.current?.setPage(step - 1);
  const incrementPageState = async () => {
    if (step === 0) {
      const isValid = await trigger('mobileNumber');
      if (!isValid) return null;
    }
    if (step === 2) {
      const isValid = await trigger([
        'name',
        'surName',
        'pytroNym',
        'dob',
        'gender',
      ]);
      console.log('IS VALID', isValid);
      if (!isValid) return null;
    }
    if (step < 3) {
      pagerRef.current?.setPage(step + 1);
    }
    if (step > 2) {
      handleSubmit(handleUpdateUser)();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.border}>
        <View
          style={[styles.progressBorder, {width: `${((step + 1) / 4) * 100}%`}]}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          {step > 0 && (
            <CustomIcon
              name="arrow-left"
              type="material-community"
              onPress={onPressBack}
              disabled={!step}
            />
          )}
        </View>
        <PagerView
          style={styles.pagerView}
          ref={pagerRef}
          scrollEnabled={false}
          pageMargin={15}
          onPageScroll={e => setStep(e.nativeEvent.position)}>
          <RegisterStep1
            control={control}
            key={'step-1'}
            incrementPage={incrementPageState}
          />
          <RegisterStep2 key={'step-2'} incrementPage={incrementPageState} />
          <RegisterStep3
            control={control}
            key={'step-3'}
            incrementPage={incrementPageState}
          />
          <RegisterStep4
            key={'step-4'}
            incrementPage={incrementPageState}
            control={control}
            registerLoading={registerLoading}
          />
        </PagerView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: vs(25),
  },
  border: {
    backgroundColor: '#E5EDF2',
    width: '100%',
    height: 2,
    marginTop: 5,
  },
  progressBorder: {
    backgroundColor: COLORS.primary,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(14),
    paddingTop: scale(15),
  },
  pagerView: {
    flex: 1,
    paddingBottom: vs(10),
  },
});
