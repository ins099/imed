import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ms, scale} from 'react-native-size-matters';
import {COLORS} from '../utils/theme';
import {TextNormal, TextSmaller} from './common/Texts';
import SearchLocationModal, {PlaceResultType} from './SearchLocationModal';

interface LocationSearchInputProps {
  containerStyle?: ViewStyle;
  textInputContainerStyle?: ViewStyle;
  value: any;
  error?: any;
  onChange: (arg: any) => any;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = props => {
  const {
    containerStyle,
    textInputContainerStyle,
    value: actualValue = null,
    error,
    onChange,
  } = props;

  const [value, setValue] = useState<PlaceResultType | null>(actualValue);
  const [isModal, setModal] = useState(false);

  const setAddress = (address: any) => setValue(address);

  const handlePress = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          style={[styles.addressContainer, textInputContainerStyle]}
          onPress={handlePress}>
          <TextNormal
            color={value ? COLORS.black : COLORS.lightgrey}
            numberOfLines={1}>
            {value
              ? value.placeName !== ''
                ? value.placeName
                : value.description
              : 'TYPE_YOUR_ADDRESS'}
          </TextNormal>
        </TouchableOpacity>
        <SearchLocationModal
          isVisible={isModal}
          closeModal={closeModal}
          setAddress={setAddress}
        />
      </View>
      {error && (
        <TextSmaller bold color={'red'} textStyle={{fontSize: ms(9)}}>
          {error ? `* ${error}` : ''}
        </TextSmaller>
      )}
    </>
  );
};

export default LocationSearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  modalContainer: {
    backgroundColor: 'transparent',
    padding: scale(12),
  },
  addressContainer: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    height: scale(47),
    borderWidth: 1,
    paddingHorizontal: scale(10),
    borderColor: COLORS.borderGrey,
    justifyContent: 'center',
  },
  address: {
    fontSize: scale(16),
    paddingHorizontal: 10,
    flex: 1,
    color: COLORS.black,
  },
});
