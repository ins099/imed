import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import {COLORS} from '../utils/theme';
import CustomIcon from './common/CustomIcon';
import {TextNormal} from './common/Texts';
import SelectAddressModal from './SelectAddressModal';

interface SelectAddressProps {
  handleSelectAddress: (arg: any) => void;
  address: string;
}

const SelectAddress: React.FC<SelectAddressProps> = props => {
  const {handleSelectAddress, address} = props;

  const [modal, setModal] = useState<boolean>(false);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <View style={{gap: 10}}>
      <TextNormal bold>SELECT_AN_ADDRESS</TextNormal>
      <TouchableOpacity
        style={[styles.container, styles.row]}
        onPress={openModal}>
        <View style={[styles.row, {gap: 10, flex: 4}]}>
          <CustomIcon
            name="location"
            type="entypo"
            color={COLORS.primary}
            disabled
          />
          <TextNormal numberOfLines={1}>
            {address ? address : 'Select Address'}
          </TextNormal>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <CustomIcon type="antdesign" name="right" disabled size={ms(14)} />
        </View>
      </TouchableOpacity>
      <SelectAddressModal
        isVisible={modal}
        closeModal={closeModal}
        handleSelectAddress={handleSelectAddress}
        address={address}
      />
    </View>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 13,
    padding: ms(14),
    width: '100%',
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
