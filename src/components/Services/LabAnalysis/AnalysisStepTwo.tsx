import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import {COLORS} from '../../../utils/theme';
import CustomIcon from '../../common/CustomIcon';
import {TextNormal} from '../../common/Texts';

interface AnalysisStepTwoProps {
  subCategories: any[];
  decrementPage: () => void;
  onSelect: (arg: any) => void;
  selectedAnalysis: string;
}

export const AnalysisStepTwo: React.FC<AnalysisStepTwoProps> = props => {
  const {decrementPage, onSelect, selectedAnalysis, subCategories} = props;
  const renderItem = ({item}: any) => (
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

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={decrementPage}>
          <CustomIcon name="left" type="antdesign" disabled size={ms(15)} />
          <TextNormal bold>{selectedAnalysis}</TextNormal>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={subCategories}
      keyExtractor={item => item.id.toString()}
      style={styles.typeOfAnalysisContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContentContainer}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              height: 300,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextNormal>No Data</TextNormal>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  typeOfAnalysisContainer: {
    // paddingTop: vs(5),
    height: vs(365),
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
    elevation: 10,
    shadowRadius: 3,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(5),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(5),
  },
});
