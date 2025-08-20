import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {COLORS} from '../../utils/theme';
import {RegisterStepWrapper} from '../Registeration/RegisterStepWrapper';
import PhoneInput from '../common/PhoneInput';
import {TextSmall} from '../common/Texts';

interface Step1Props {
  incrementPage: () => void;
  control: Control;
}

export const RegisterStep1: React.FC<Step1Props> = props => {
  const {incrementPage, control} = props;
  const handleNext = () => {
    incrementPage();
  };

  return (
    <RegisterStepWrapper
      heading="ENTER_MOBILE_FOR_VERIFICATION"
      onPressNext={handleNext}
      disableNextButton={false}>
      <Controller
        name="mobileNumber"
        key={'mobileNumber'}
        rules={{required: {value: true, message: 'this is required'}}}
        control={control}
        render={({field, fieldState}) => {
          return (
            <PhoneInput
              containerStyle={{marginVertical: 10}}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          );
        }}
      />
      <TextSmall color={COLORS.lightgrey}>SEND_OTP_AT_NUMBER</TextSmall>
    </RegisterStepWrapper>
  );
};
