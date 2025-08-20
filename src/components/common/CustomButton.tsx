import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import {scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {TextNormal} from './Texts';

interface ICustomButtonProps extends TouchableOpacityProps {
  title: string;
  secondary?: boolean;
  containerStyle?: ViewStyle;
  width?: any;
  tirtiary?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<ICustomButtonProps> = props => {
  const {
    title,
    onPress,
    secondary,
    containerStyle,
    width,
    tirtiary,
    loading,
    disabled,
    ...rest
  } = props;
  if (secondary || tirtiary) {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          styles.shadowProp,
          secondary && styles.secondary,
          tirtiary && styles.tirtiary,
          containerStyle,
          width && {width},
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        {...rest}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <TextNormal
            bold
            color={
              disabled ? '#CED7DA' : tirtiary ? COLORS.primary : COLORS.black
            }
            // ∏textStyle={{fontSize: scale(13)}}
          >
            {title}
          </TextNormal>
        )}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        styles.shadowProp,
        width && {width},
        containerStyle,
        disabled && styles.disabledButton,
      ]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <TextNormal bold color={disabled ? '#CED7DA' : COLORS.white}>
          {title}
        </TextNormal>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    // minHeight: 50,
    minWidth: scale(80),
    // width: '100%',
    paddingHorizontal: scale(15),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: vs(40),
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },

  tirtiary: {
    backgroundColor: COLORS.lightgrey,
  },

  shadowProp: {
    shadowColor: COLORS.primary,
    shadowOffset: {width: -5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  linearChild: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#E5EDF2',
  },
});
