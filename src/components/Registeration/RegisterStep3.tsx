import React from 'react';
import {Control} from 'react-hook-form';
import {View} from 'react-native';
import {utility} from '../../utils/utility';
import Fields from '../common/Fields';
import {RegisterStepWrapper} from './RegisterStepWrapper';

interface Step3Props {
  incrementPage: () => void;
  control: Control;
}

export const RegisterStep3: React.FC<Step3Props> = props => {
  const {incrementPage, control} = props;

  const handleNext = () => {
    incrementPage();
  };

  const FIELDS = [
    {
      type: 'text',
      name: 'name',
      placeholder: utility.translate('NAME'),
      label: 'NAME',
      rules: {required: {value: true, message: 'This is required'}},
    },
    {
      type: 'text',
      name: 'surName',
      placeholder: utility.translate('SURNAME'),
      label: 'SURNAME',
      rules: {required: {value: true, message: 'This is required'}},
    },
    {
      type: 'text',
      name: 'pytroNym',
      placeholder: utility.translate('PATRONYM_PLACEHOLDER'),
      label: 'PATRONYM',
    },
    {
      type: 'date',
      name: 'dob',
      placeholder: utility.translate('DOB'),
      label: 'DOB',
      isFancy: true,
      rules: {required: {value: true, message: 'This is required'}},
    },
    {
      type: 'dropdown',
      name: 'gender',
      placeholder: utility.translate('GENDER'),
      label: 'GENDER',
      lists: [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
      ],
      rules: {required: {value: true, message: 'This is required'}},
    },
  ];

  return (
    <RegisterStepWrapper
      heading="ENTER_YOUR_PERSONAL_INFO"
      onPressNext={handleNext}
      disableNextButton={false}>
      <View style={{paddingTop: 10}}>
        <Fields control={control} fields={FIELDS} />
      </View>
    </RegisterStepWrapper>
  );
};
