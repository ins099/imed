import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../common/CustomButton';
import {TextBigger} from '../common/Texts';

interface RegisterStepProps {
  heading: string;
  onPressNext: () => void;
  disableNextButton: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const RegisterStepWrapper: React.FC<RegisterStepProps> = props => {
  const {heading, disableNextButton, onPressNext, children, loading} = props;
  return (
    <View key={'step-1'} style={styles.page}>
      <TextBigger bold>{heading}</TextBigger>
      <View style={styles.pageContentContainer}>{children}</View>
      <View style={styles.btnContainer}>
        <CustomButton
          title="NEXT"
          disabled={disableNextButton}
          onPress={onPressNext}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
  },
  pageContentContainer: {flex: 3},
  btnContainer: {flex: 1, justifyContent: 'flex-end'},
});
