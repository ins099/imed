/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {Header} from './common/Header';
import {COLORS} from '../utils/theme';
import {ms, vs} from 'react-native-size-matters';
import {TextNormal, TextSmall} from './common/Texts';
import CustomIcon from './common/CustomIcon';
import SearchLocationModal from './SearchLocationModal';
import {useAppSelector} from '../redux/store';

interface SelectAddressModalProps {
  isVisible: boolean;
  address: string;
  closeModal: () => void;
  handleSelectAddress: (arg: any) => void;
}

interface AddressesProps {
  selectedAddress: any;
  addresses: any[];
  onSelectAddress: (arg: any) => void;
}

const SelectAddressModal: React.FC<SelectAddressModalProps> = props => {
  const {
    isVisible,
    closeModal,
    address: Address, //selected address
    handleSelectAddress,
  } = props;
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(Address);
  const [searchPlaceModal, setSearchPlaceModal] = useState(false);
  const userAddress = useAppSelector(store => store.userSlice?.address);

  useEffect(() => {
    if (!!Address) {
      setSelectedAddress(Address);
    }
  }, [Address]);

  useEffect(() => {
    if (userAddress) {
      setAddresses((p: any[]) => {
        const isAddress = p?.find(i => i?.description === userAddress);
        if (isAddress) {
          return p;
        }
        return [{description: userAddress, id: Math.random().toString()}, ...p];
      });
    }
  }, [userAddress]);

  const onSelectAddress = (address: any) => {
    handleSelectAddress(address?.description);
    setSelectedAddress(address.description);
    closeModal();
  };

  const onPressAddNewAddress = () => {
    setTimeout(() => {
      setSearchPlaceModal(true);
    }, 300);
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackButtonPress={closeModal}>
      <View style={styles.container}>
        <Header onPressBack={closeModal} title="SELECT_AN_ADDRESS" />
        <View style={styles.contentContainer}>
          <View style={{gap: 10, marginBottom: 10}}>
            <TextNormal bold>MY_ADDRESSES</TextNormal>
            <TextSmall>SELECT_ONE_OF_EXISTING_ADDRESS</TextSmall>
          </View>
          <View>
            <Addresses
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelectAddress={onSelectAddress}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
            onPress={onPressAddNewAddress}>
            <CustomIcon
              name="plus"
              type="antdesign"
              size={ms(15)}
              color={COLORS.primary}
            />
            <TextSmall bold color={COLORS.primary}>
              ADD_ADDRESS
            </TextSmall>
          </TouchableOpacity>
        </View>
      </View>
      <SearchLocationModal
        isRegister={false}
        isVisible={searchPlaceModal}
        closeModal={() => {
          setSearchPlaceModal(false);
        }}
        setAddress={function (arg: any): void {
          setAddresses(p => [...p, arg]);
        }}
      />
    </ReactNativeModal>
  );
};

const Addresses: React.FC<AddressesProps> = ({
  selectedAddress,
  addresses,
  onSelectAddress,
}) => {
  return (
    <FlatList
      data={addresses}
      keyExtractor={item => item.id}
      contentContainerStyle={{alignItems: 'center', gap: 15}}
      style={{height: vs(200)}}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[styles.addressContainer, styles.row]}
          onPress={() => onSelectAddress(item)}>
          <View style={[styles.row, {gap: 10, flex: 4}]}>
            <CustomIcon
              name="location"
              type="entypo"
              color={COLORS.primary}
              disabled
              size={ms(20)}
            />
            <TextNormal numberOfLines={1}>{item.description}</TextNormal>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <CustomIcon
              type="ionicons"
              name={
                item.description === selectedAddress
                  ? 'radio-button-on-outline'
                  : 'radio-button-off-outline'
              }
              color={COLORS.primary}
              disabled
              size={ms(17)}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default SelectAddressModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    height: '100%',
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: ms(20),
  },
  addressContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 13,
    padding: ms(14),
    width: '97%',
    shadowOffset: {height: 1, width: 1},
    elevation: 10,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: COLORS.gray,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
