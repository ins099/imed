import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ms, scale, vs} from 'react-native-size-matters';
import BellSVG from '../../assets/images/bell.svg';
import BagSVG from '../../assets/images/shopping-bag.svg';
import {COLORS} from '../../utils/theme';
import {SearchBar} from '../common/SearchBar';
import {TextBig, TextSmall} from '../common/Texts';
import {useAppSelector} from '../../redux/store';

interface HomeHeaderProps {
  search: string;
  onSearch: (txt: string) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = props => {
  const {search, onSearch} = props;

  const {top} = useSafeAreaInsets();

  const user = useAppSelector(store => store.userSlice);

  return (
    <LinearGradient
      style={[
        styles.container,
        {paddingTop: top + vs(10)},
        Platform.OS == 'ios' && {height: vs(175)},
      ]}
      colors={[COLORS.primaryDark, COLORS.primary]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <StatusBar
        backgroundColor={COLORS.primaryDark}
        barStyle={'light-content'}
      />
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <TextSmall color={COLORS.gray}>WELCOME,</TextSmall>
          <TextBig bold color={COLORS.white}>
            {user.name}
          </TextBig>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <BagSVG color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity>
            <BellSVG />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar search={search} onSearch={onSearch} />
    </LinearGradient>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    // height: vs(175),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: ms(18),
    gap: vs(12),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vs(55),
    justifyContent: 'space-between',
  },
  textContainer: {
    gap: vs(5),
  },
  iconsContainer: {flexDirection: 'row', alignItems: 'center', gap: scale(10)},
});
