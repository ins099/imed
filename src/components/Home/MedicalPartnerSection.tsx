/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {ms, vs} from 'react-native-size-matters';
import {IMAGES} from '../../utils/images';
import CustomIcon from '../common/CustomIcon';
import {TextNormal, TextSmall} from '../common/Texts';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface MedicalPartnerSectionProps {}

const MedicalPartnerSections: React.FC<MedicalPartnerSectionProps> = props => {
  const {} = props;
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TextNormal bold>MEDICAL_PARTNERS</TextNormal>
        <CustomIcon name="right" type="antdesign" disabled size={ms(15)} />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={[
          {id: '1', image: IMAGES.place1, name: 'City Hospitals'},
          {id: '2', image: IMAGES.place2, name: 'Saglan Aila'},
          {id: '3', image: IMAGES.place1, name: 'Referans'},
        ]}
        keyExtractor={item => item.id}
        horizontal
        style={{marginTop: 10}}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        pagingEnabled
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image source={item.image} />
            <TextSmall center>{item.name}</TextSmall>
          </View>
        )}
      />
    </View>
  );
};

export default MedicalPartnerSections;

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    gap: 10,
    // shadowOffset: {height: 1, width: 1},
    // shadowColor: COLORS.gray,
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // height: vs(90),
    width: widthPercentageToDP(25),
    padding: 10,
  },
});
