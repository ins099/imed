import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ms, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {TextNormal} from '../common/Texts';

interface ReasonTextBoxProps {
  value: string;
  onChange: (txt: string) => void;
}

const ReasonTextBox: React.FC<ReasonTextBoxProps> = props => {
  const {value, onChange} = props;
  return (
    <View style={styles.container}>
      <TextNormal bold>STATE_REASON_REQUEST</TextNormal>
      <TextInput
        style={styles.textInput}
        multiline
        value={value}
        onChangeText={onChange}
        placeholder="Please state the reason for your request"
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
};

export default ReasonTextBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: vs(10),
    gap: 10,
  },
  textAreas: {backgroundColor: 'red'},
  textInput: {
    backgroundColor: COLORS.white,
    height: vs(90),
    shadowOffset: {height: 1, width: 1},
    elevation: 10,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: COLORS.gray,
    textAlignVertical: 'top',
    padding: ms(14),
    color: 'black',
    borderRadius: 14,
  },
});
