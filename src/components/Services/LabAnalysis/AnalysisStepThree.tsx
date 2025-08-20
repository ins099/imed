import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import LocationSVG from '../../../assets/images/locationPin.svg';
import {COLORS} from '../../../utils/theme';
import CustomIcon from '../../common/CustomIcon';
import {TextNormal, TextSmall, TextSmaller} from '../../common/Texts';

interface AnalysisStepThreeProps {
  onSelectPlace: (item: any) => void;
  decrementPage: () => void;
  medicalPlaces: any[];
  selectedTest: string;
}

export const AnalysisStepThree: React.FC<AnalysisStepThreeProps> = props => {
  const {onSelectPlace, decrementPage, selectedTest, medicalPlaces} = props;

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelectPlace(item)}>
      <View style={styles.listLeftContainer}>
        <Image
          source={{uri: item.iconUrl}}
          height={scale(40)}
          width={scale(40)}
          // style={{height: scale(40), aspectRatio: 1, borderRadius: 100}}x
        />
        <View style={{gap: vs(7), flex: 1, paddingTop: vs(0)}}>
          <TextNormal numberOfLines={1} textStyle={{fontWeight: '400'}}>
            {item?.name}
          </TextNormal>
          <View style={{gap: 4, flexDirection: 'row'}}>
            <LocationSVG />
            <TextSmall numberOfLines={1}>{item?.address}</TextSmall>
          </View>
        </View>
      </View>
      <View style={styles.listRightContainer}>
        <TextSmaller bold color={COLORS.primary}>
          {`${item?.price} AZN`}
        </TextSmaller>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={decrementPage}>
          <CustomIcon name="left" type="antdesign" disabled size={ms(15)} />
          <TextNormal bold>{selectedTest}</TextNormal>
        </TouchableOpacity>
        <TouchableOpacity
          style={{gap: 3, flexDirection: 'row', alignItems: 'center'}}>
          <TextSmall>The Cheapest</TextSmall>
          <CustomIcon name="chevron-down" type="ionicons" size={ms(15)} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={medicalPlaces}
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
    minHeight: 80,
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
  listRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: '100%',
    paddingRight: scale(10),
    paddingTop: vs(16),
  },
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
