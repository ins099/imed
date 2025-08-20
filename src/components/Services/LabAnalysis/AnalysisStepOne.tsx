import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import {COLORS} from '../../../utils/theme';
import CustomIcon from '../../common/CustomIcon';
import {TextBig, TextNormal, TextSmall} from '../../common/Texts';

type Category = {
  id: number;
  iconUrl: string;
  name: String;
  serviceId: number;
};

interface AnalysisStepOneProps {
  onSelect: (arg: any) => void;
  categories: Category[];
}

export const AnalysisStepOne: React.FC<AnalysisStepOneProps> = props => {
  const {onSelect, categories} = props;

  const renderItem = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelect(item)}>
      <View style={styles.listLeftContainer}>
        <SvgUri width={25} height={25} uri={item.iconUrl} />
        <TextNormal numberOfLines={1}>{item.name}</TextNormal>
      </View>
      <CustomIcon
        name="right"
        type="antdesign"
        color={COLORS.gray}
        disabled
        size={ms(17)}
        containerStyle={styles.listRightContainer}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.infoRow}>
        <CustomIcon
          name="info"
          type="feather"
          color={'#004E80'}
          disabled
          size={ms(18)}
          containerStyle={{paddingTop: vs(3)}}
        />
        <TextSmall
          color={COLORS.gray}
          numberOfLines={3}
          textStyle={{lineHeight: 24, flex: 1}}
          textBreakStrategy="highQuality">
          The user can use the on-site laboratory analysis function by calling
          any address from selected hospitals and laboratories..
        </TextSmall>
      </View>
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        style={styles.typeOfAnalysisContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        renderItem={renderItem}
        ListHeaderComponent={() => <TextBig bold>SELECT_TYPE_ANALYSIS</TextBig>}
        stickyHeaderHiddenOnScroll
      />
    </View>
  );
};

const styles = StyleSheet.create({
  typeOfAnalysisContainer: {
    paddingTop: vs(5),
    height: vs(365),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ms(10),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.gray,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.5,
    minHeight: 60,
    maxWidth: 500,
  },
  listContentContainer: {
    gap: vs(7),
    paddingBottom: vs(20),
  },
  listLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(10),
    flex: 4,
  },
  listRightContainer: {flex: 1, alignItems: 'flex-end'},
});
