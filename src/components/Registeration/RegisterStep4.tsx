/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import CountryDropdown from '../CountryDropdown';
import {RegisterStepWrapper} from './RegisterStepWrapper';
import LocationSearchInput from '../LocationSearchInput';

interface Step4Props {
  incrementPage: () => void;
  control: Control;
  registerLoading: boolean;
}

export const RegisterStep4: React.FC<Step4Props> = props => {
  const {incrementPage, control, registerLoading} = props;

  const handleNext = () => {
    incrementPage();
  };

  return (
    <RegisterStepWrapper
      heading="PLEASE_YOUR_ADDRESS"
      onPressNext={handleNext}
      disableNextButton={false}
      loading={registerLoading}>
      <View style={{paddingTop: 10, gap: 12}}>
        <Controller
          control={control}
          name="country"
          key="country"
          rules={{required: {value: true, message: 'THis is required'}}}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <CountryDropdown
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          key={'address'}
          rules={{required: {value: true, message: 'THis is required'}}}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <LocationSearchInput
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </View>
    </RegisterStepWrapper>
  );
};

const styles = StyleSheet.create({});
