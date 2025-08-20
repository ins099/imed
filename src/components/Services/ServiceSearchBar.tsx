import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import CustomIcon from '../common/CustomIcon';
import {TextSmall, TextSmaller} from '../common/Texts';

interface ServiceSearchBarProps {}

export const ServiceSearchBar: React.FC<ServiceSearchBarProps> = props => {
  const {} = props;
  return (
    <View style={styles.container}>
      <CustomIcon
        type="feather"
        name="search"
        size={ms(20)}
        disabled
        color={COLORS.black}
      />
      <View style={styles.searchBox}>
        <TextSmall bold>WHAT_ARE_YOU_LOOKING</TextSmall>
        <TextSmaller bold color={COLORS.gray}>
          Syndrom Disease Specialty
        </TextSmaller>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: ms(30),
    flexDirection: 'row',
    alignItems: 'center',
    // height: ms(60),
    padding: vs(6),
    gap: ms(10),
    flex: 1,
    paddingLeft: scale(15),
  },
  searchBox: {
    flex: 1,
    gap: vs(2),
  },
});
