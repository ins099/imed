/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms, scale, vs} from 'react-native-size-matters';
import LocationSVG from '../../assets/images/locationPin.svg';
import {COLORS} from '../../utils/theme';
import CustomIcon from '../common/CustomIcon';
import {Header} from '../common/Header';
import {TextNormal, TextSmall, TextSmaller} from '../common/Texts';
import CustomButton from '../common/CustomButton';
import {ToastProvider} from 'react-native-toast-notifications';

interface ConfirmOrderModalProps {
  navigation?: NavigationProp<any>;
  closeModal: () => void;
  handleConfirmOrder: () => void;
  isVisible: boolean;
  loading: boolean;
  category: any;
  subCategory: any;
  medical: any;
  address: string;
  date: string;
  addInfo: string;
  setServiceStep: (num: number) => void;
}

interface ServiceProviderItemProps {
  medical: any;
}

const ServiceProviderItem: React.FC<ServiceProviderItemProps> = ({medical}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.listLeftContainer}>
        <Image
          source={{uri: medical?.iconUrl}}
          height={scale(40)}
          width={scale(40)}
          // style={{height: scale(40), aspectRatio: 1, borderRadius: 100}}x
        />
        <View style={{gap: vs(7), flex: 1, paddingTop: vs(0)}}>
          <TextNormal numberOfLines={1} textStyle={{fontWeight: '400'}}>
            {medical?.name}
          </TextNormal>
          <View style={{gap: 4, flexDirection: 'row'}}>
            <LocationSVG />
            <TextSmall numberOfLines={1}>{medical?.address}</TextSmall>
          </View>
        </View>
      </View>
      <View style={styles.listRightContainer} />
    </View>
  );
};

const Info: React.FC<any> = props => {
  const {title, subText, onEdit} = props;

  return (
    <View style={styles.info}>
      <View style={styles.infoTextContainer}>
        <TextSmaller color={COLORS.gray}>{title}</TextSmaller>
        <TextSmall bold>{subText}</TextSmall>
      </View>
      <CustomIcon
        name="edit"
        type="entypo"
        color={COLORS.gray}
        onPress={onEdit}
        size={ms(18)}
      />
    </View>
  );
};

export const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = props => {
  const {
    navigation,
    handleConfirmOrder,
    isVisible = true,
    closeModal,
    medical,
    category,
    address,
    date,
    loading,
    addInfo,
    setServiceStep,
  } = props;

  const onEdit = (key: string) => {
    console.log('first');
    closeModal();
    if (['medical', 'category'].includes(key)) {
      setServiceStep(key === 'category' ? 0 : 2);
      navigation?.navigate('Services');
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{margin: 0, backgroundColor: '#FBFBFB'}}
      onBackButtonPress={closeModal}
      animationOut={'slideOutRight'}
      animationIn={'slideInRight'}>
      <ToastProvider>
        <SafeAreaView style={styles.container}>
          <Header title="LAB_ANALYSIS" onPressBack={closeModal} />
          <View style={styles.subContainer}>
            <ServiceProviderItem medical={medical} />
            <View style={styles.infoContainer}>
              <Info
                title="Providing Services"
                subText={`${medical?.name}`}
                onEdit={() => onEdit('medical')}
              />
              <Info
                title="Type of Service"
                subText={`${category?.name}`}
                onEdit={() => onEdit('category')}
              />
              <Info title="Address" subText={`${address}`} onEdit={onEdit} />
              <Info title="Date" subText={`${date}`} onEdit={onEdit} />
              <Info
                title="Additional Information"
                subText={`${addInfo}`}
                onEdit={onEdit}
              />
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TextSmall bold>AMOUNT</TextSmall>
                <TextSmall
                  bold
                  color={COLORS.primary}>{`${medical?.price} AZN`}</TextSmall>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingHorizontal: scale(15),
              paddingBottom: scale(25),
            }}>
            <CustomButton
              title="CONFIRM"
              onPress={handleConfirmOrder}
              loading={loading}
            />
          </View>
        </SafeAreaView>
      </ToastProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: scale(15),
    paddingTop: vs(15),
    gap: vs(20),
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
  infoContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: ms(10),
    paddingHorizontal: ms(13),
    width: '100%',
    // height: vs(300),
    gap: vs(20),

    shadowOffset: {height: 1, width: 1},
    elevation: 10,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: COLORS.gray,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoTextContainer: {
    gap: 2,
    flex: 1,
  },
});
// We'll forward it to the hospital, and they’ll reach out to you directly.
