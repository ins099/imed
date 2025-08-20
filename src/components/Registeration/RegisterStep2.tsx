import React, {useState} from 'react';
import {COLORS} from '../../utils/theme';
import OTPInput from '../common/OTPInput';
import {TextSmall} from '../common/Texts';
import {RegisterStepWrapper} from './RegisterStepWrapper';

interface Step2Props {
  incrementPage: () => void;
}

export const RegisterStep2: React.FC<Step2Props> = props => {
  const {incrementPage} = props;

  const [otp, setOtp] = useState<string>('');

  const handleNext = () => {
    incrementPage();
  };

  return (
    <RegisterStepWrapper
      heading="PLEASE_VERIFY_OTP"
      onPressNext={handleNext}
      disableNextButton={false}>
      <OTPInput
        value={otp}
        onChange={code => setOtp(code)}
        numberOfInputs={4}
      />
      <TextSmall textStyle={{marginTop: 30}} color={COLORS.primary} underline>
        DIDNT_RECIEVE_OTP
      </TextSmall>
    </RegisterStepWrapper>
  );
};
