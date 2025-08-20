import React from 'react';
import {StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {utility} from '../../utils/utility';
import CustomIcon from './CustomIcon';

interface SearchBarProps {
  containerStyle?: ViewStyle;
  search: string;
  onSearch: (txt: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = props => {
  const {containerStyle, search, onSearch} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomIcon
        name="search"
        type="feather"
        color={COLORS.gray}
        size={ms(18)}
      />
      <TextInput
        value={search}
        onChangeText={(txt: string) => onSearch(txt)}
        style={styles.textInput}
        placeholder={utility.translate(
          'Simptom, sahə və  ya ixtisas üzrə axtar',
        )}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    paddingHorizontal: scale(20),
    height: vs(40),
    alignItems: 'center',
  },
  textInput: {
    height: '100%',
    width: '100%',
    paddingLeft: scale(10),
    fontSize: ms(13),
    color:COLORS.darkGrey,
  },
});
