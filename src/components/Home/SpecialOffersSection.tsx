/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {IMAGES} from '../../utils/images';
import CustomIcon from '../common/CustomIcon';
import Pagination from '../common/Pagination';
import {TextNormal} from '../common/Texts';

interface SpecialOfferProps {}

const SpecialOffers: React.FC<SpecialOfferProps> = props => {
  const {} = props;
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TextNormal bold>SPECIAL_OFFERS</TextNormal>
        <CustomIcon name="right" type="antdesign" disabled size={ms(15)} />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={[
          {id: '1', image: IMAGES.carousel1},
          {id: '2', image: IMAGES.carousel1},
          {id: '3', image: IMAGES.carousel1},
        ]}
        keyExtractor={item => item.id}
        horizontal
        style={{marginTop: 10}}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        pagingEnabled
        renderItem={({item}) => (
          <View style={styles.carousel}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                width: scale(310),
                height: vs(150),
              }}
            />
          </View>
        )}
      />
      <Pagination currentPage={1} pages={3} />
    </View>
  );
};

export default SpecialOffers;

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carousel: {
    width: scale(310),
    height: vs(150),
    backgroundColor: 'red',
    borderRadius: 30,
    overflow: 'hidden',
  },
});
