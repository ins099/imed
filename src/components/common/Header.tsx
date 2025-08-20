import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ms, scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import CustomIcon from './CustomIcon';
import {TextNormal} from './Texts';

interface HeaderProps {
  title: string;
  onPressBack: () => void;
  cgb?: boolean;
}

export const Header: React.FC<HeaderProps> = props => {
  const {cgb = true, title, onPressBack} = props;

  // const {top} = useSafeAreaInsets();
  const top = 0;

  return (
    <View style={[styles.container, {paddingTop: top + 10}]}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <TouchableOpacity
        style={styles.left}
        disabled={!cgb}
        onPress={onPressBack}>
        <CustomIcon type="antdesign" name="left" size={ms(18)} disabled />
      </TouchableOpacity>
      <View style={styles.center}>
        <TextNormal bold>{title}</TextNormal>
      </View>
      <View style={styles.left}>{/* <Text>sdf</Text> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    // justifyContent:'flex-start',
    paddingHorizontal: scale(10),

    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
    shadowColor: COLORS.gray,

    height: Platform.OS === 'ios' ? vs(95) : vs(60),
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  left: {
    flex: 1,
    alignItems: 'center',
    height: '100%',

    justifyContent: 'center',
  },
  center: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
