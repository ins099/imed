import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ms, scale} from 'react-native-size-matters';
import {COUNTRIES} from '../utils/constants';
import {COLORS} from '../utils/theme';
import {TextSmall} from './common/Texts';

interface CountrySelectorProps {
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}

const CountrySelector: React.FC<CountrySelectorProps> = props => {
  const {selectedCountry, setSelectedCountry} = props;

  const onSelectCountry = (val: string) => {
    setSelectedCountry(val);
  };

  selectedCountry;

  return (
    <View style={styles.container}>
      {COUNTRIES.map(country => {
        const isSelected = country.nameCode === selectedCountry;
        return (
          <TouchableOpacity
            key={country.nameCode}
            style={[styles.tag, isSelected && styles.selectedTag]}
            onPress={() => onSelectCountry(country.nameCode)}>
            <Image
              source={{uri: country.flagUrl}}
              style={styles.flag}
              resizeMode="stretch"
            />
            <TextSmall color={isSelected && COLORS.white}>
              {country.name}
            </TextSmall>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CountrySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: COLORS.borderGrey,
    borderRadius: 26,
    padding: ms(7),
    minWidth: 105,
  },
  flag: {
    borderRadius: 100,
    height: scale(28),
    aspectRatio: 1,
  },
  selectedTag: {
    backgroundColor: COLORS.primary,
  },
});
