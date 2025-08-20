/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms, vs} from 'react-native-size-matters';
import {useGetServicesQuery} from '../../redux/apis/services';
import CustomIcon from '../common/CustomIcon';
import {TextNormal, TextSmall} from '../common/Texts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useAppDispatch} from '../../redux/store';
import {setService} from '../../redux/reducers/serviceSlice';

interface ServiceSectionProps {}

const ServiceSections: React.FC<ServiceSectionProps> = props => {
  const {} = props;

  const {data, isLoading, error} = useGetServicesQuery({});
  const services = data?.data?.services || [];
  const dispatch = useAppDispatch();

  const navigation: NavigationProp<any> = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TextNormal bold>SERVICES</TextNormal>
        <CustomIcon name="right" type="antdesign" disabled size={ms(15)} />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={services}
        keyExtractor={item => item?.id}
        horizontal
        style={{marginTop: 10}}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        pagingEnabled
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.item, item.id !== 2 && styles.disabledItem]}
            disabled={item.id !== 2}
            onPress={() => {
              dispatch(setService(item));
              navigation.navigate('Services');
            }}>
            <Image source={{uri: item?.iconUrl}} height={50} width={50} />
            <TextSmall center>{item?.name}</TextSmall>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
          isLoading && (
            <View
              style={{
                width: '100%',
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} />
            </View>
          )
        }
      />
    </View>
  );
};

export default ServiceSections;

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
    // width: vs(85),
    // height: hp(15),
    width: wp(25),
    padding: 10,
  },
  disabledItem: {
    opacity: 0.4,
  },
});
