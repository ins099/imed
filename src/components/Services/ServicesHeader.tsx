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
import CallDocSVG from '../../assets/images/calldoctor.svg';
import DiagnosticSVG from '../../assets/images/diagnostic.svg';
import LabTubesSVG from '../../assets/images/labtubes.svg';
import BagSVG from '../../assets/images/shopping-bag.svg';
import {COLORS} from '../../utils/theme';
import {TextSmaller} from '../common/Texts';
import {ServiceSearchBar} from './ServiceSearchBar';

interface ServicesHeaderProps {
  search?: string;
  onSearch?: (txt: string) => void;
  selectedTab: number;
  onSelectTab: (arg: any) => void;
}

interface TabProps {
  Icon: any;
  text: string;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean
}

const ServicesHeader: React.FC<ServicesHeaderProps> = props => {
  const {search, onSearch, selectedTab, onSelectTab} = props;

  const {top} = useSafeAreaInsets();

  return (
    <LinearGradient
      style={[
        styles.container,
        {paddingTop: Platform.OS === "ios" ?  top + vs(5) : vs(20)},
        Platform.OS === 'ios' && {height: vs(175)},
      ]}
      colors={[COLORS.primaryDark, COLORS.primary]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <StatusBar
        backgroundColor={COLORS.primaryDark}
        barStyle={'light-content'}
      />
      <View style={styles.topRow}>
        <ServiceSearchBar />
        <TouchableOpacity style={styles.iconContainer}>
          <BagSVG color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <Tab
          text="CALLING_A_DOCTOR"
          Icon={CallDocSVG}
          isSelected={selectedTab === 0}
          onPress={() => onSelectTab({id: 0, name: 'Calling a doctor'})}
          disabled={true}
        />
        <Tab
          text="DIAGNOSTIC_AT_HOME"
          Icon={DiagnosticSVG}
          isSelected={selectedTab === 1}
          onPress={() => onSelectTab({id: 1, name: 'Diagnostic At Home'})}
          disabled={true}

        />
        <Tab
          text="LAB_ANALYSIS"
          Icon={LabTubesSVG}
          isSelected={selectedTab === 2}
          onPress={() => onSelectTab({id: 2, name: 'Lab Analysis'})}
        />
      </View>
    </LinearGradient>
  );
};

export default ServicesHeader;

const Tab: React.FC<TabProps> = props => {
  const {Icon, text, isSelected, onPress, disabled} = props;

  return (
    <TouchableOpacity disabled={disabled} style={styles.tab} onPress={onPress}>
      <Icon color={isSelected ? COLORS.white : COLORS.gray} />
      <TextSmaller
        center
        bold
        color={isSelected ? COLORS.white : COLORS.gray}
        numberOfLines={2}>
        {text}
      </TextSmaller>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: ms(18),
    gap: vs(12),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vs(55),
    gap: 10,
    // justifyContent: 'space-between',
  },
  textContainer: {
    gap: vs(5),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
    padding: ms(10),
  },

  tabContainer: {
    flexDirection: 'row',
    gap: ms(5),
    marginTop: vs(7),
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    width: scale(74),
  },
});
