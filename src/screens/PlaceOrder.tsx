import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ms, vs} from 'react-native-size-matters';
import CustomButton from '../components/common/CustomButton';
import {Header} from '../components/common/Header';
import {ConfirmOrderModal} from '../components/Modal/ConfirmOrder';
import {SuccessOrderModal} from '../components/Modal/SuccessOrderModal';
import SelectAddress from '../components/SelectAddress';
import {DayPicker} from '../components/SelectDate';
import TimePicker from '../components/SelectTime';
import ReasonTextBox from '../components/Services/ReasonTextBox';
import {
  useCreateOrderMutation,
  useGetMedicalDaysQuery,
  useLazyGetMedicalTimeSlotsQuery,
} from '../redux/apis/services';
import {
  setAddress,
  setCategory,
  setMedical,
  setServiceStep,
  setSubCategory,
} from '../redux/reducers/serviceSlice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {formateDate} from '../utils/helpers';
import {COLORS} from '../utils/theme';
import {utility} from '../utils/utility';

interface PlaceOrderScreenProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any>;
}

export const PlaceOrderScreen: React.FC<PlaceOrderScreenProps> = props => {
  const {navigation} = props;

  const dispatch = useAppDispatch();
  const service = useAppSelector(store => store.serviceOrderSlices.service);
  const category = useAppSelector(store => store.serviceOrderSlices.category);
  const medical = useAppSelector(store => store.serviceOrderSlices.medical);
  const address = useAppSelector(store => store.serviceOrderSlices.address);
  const subCategory = useAppSelector(
    store => store.serviceOrderSlices.subCategory,
  );

  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [addInfo, setAddInfo] = useState('');
  const [selectedDay, setSelectedDay] = useState<number>();
  const [startTime, setStartTime] = useState();
  const [timeSlots, setTimeSlots] = useState([]);

  const closeModal = () => setModal(false);
  const closeConfirmModal = () => setConfirmationModal(false);

  const disableButton = !(address && selectedDay && startTime);

  const {data: daysData, isLoading: isLoadingDays} = useGetMedicalDaysQuery({
    medicalId: medical?.id,
  });
  const days = daysData?.data?.days || [];

  const [getTimeSlot, {isLoading: loadingSlots}] =
    useLazyGetMedicalTimeSlotsQuery();

  const [createOrder, {isLoading}] = useCreateOrderMutation();

  const handleSelectAddress = (adres: string) => dispatch(setAddress(adres));

  const handleSelectDay = async (day: number) => {
    setSelectedDay(day);
    try {
      const response = await getTimeSlot({
        medicalId: medical?.id,
        day,
        date: '2024-10-04',
      });
      if (response?.data) {
        setTimeSlots(response.data.data.availableTimeslots);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const handleSelectTime = (time: any) => {
    setStartTime(time);
  };

  const handleConfirmOrder = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const body = {
      medicalId: medical?.id,
      categoryId: category?.id,
      subCategoryId: subCategory?.id,
      serviceId: service?.id,
      startTime,
      address,
      date: formattedDate,
    };
    console.log('BODY', JSON.stringify(body, null, 1));

    const response = await createOrder(body);
    console.log('RESPONSE', JSON.stringify(response));
    if (response?.data && response?.data.status) {
      setTimeout(() => {
        setModal(true);
      }, 300);
      setConfirmationModal(false);
      dispatch(setCategory(null));
      dispatch(setSubCategory(null));
      dispatch(setMedical(null));
      dispatch(setAddress(null));
    } else if (response?.error) {
      console.log('ERROR', response.error);
      utility.showToast?.show('Error creating order', {type: 'danger'});
      return;
    }
  };

  const handleNext = () => {
    setConfirmationModal(true);
  };

  const handleServiceStep = (num: number) => {
    dispatch(setServiceStep(num));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Laboratory Analysis"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{paddingBottom: vs(50)}}
        showsVerticalScrollIndicator={false}>
        <SelectAddress
          handleSelectAddress={handleSelectAddress}
          address={address || ''}
        />
        <DayPicker
          days={days}
          setSelectedDay={handleSelectDay}
          selectedDay={selectedDay}
          loading={isLoadingDays}
        />
        {selectedDay !== undefined &&  selectedDay >= 0 ? (
          <TimePicker
            startTime={startTime}
            timeSlots={timeSlots}
            handleSelectTime={handleSelectTime}
            loading={loadingSlots}
          />
        ) : null}
        <ReasonTextBox
          value={addInfo}
          onChange={(txt: string) => setAddInfo(txt)}
        />
        <CustomButton
          title="NEXT"
          onPress={handleNext}
          loading={isLoading}
          disabled={disableButton}
        />
      </ScrollView>
      <SuccessOrderModal
        isVisible={modal}
        closeModal={closeModal}
        navigation={navigation}
      />
      {confirmationModal && (
        <ConfirmOrderModal
          isVisible={confirmationModal}
          loading={isLoading}
          closeModal={closeConfirmModal}
          navigation={navigation}
          medical={medical}
          category={category}
          subCategory={subCategory}
          handleConfirmOrder={handleConfirmOrder}
          address={address || ''}
          date={`${formateDate('', 'YYYY-MM-DD')}, ${startTime}`}
          addInfo={addInfo}
          setServiceStep={handleServiceStep}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  contentContainer: {
    flex: 1,
    paddingHorizontal: ms(13),
    paddingTop: vs(20),
  },
});
