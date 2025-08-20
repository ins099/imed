import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useUpdateProfileMutation} from '../../redux/apis/auth';
import {utility} from '../utility';
import {formateDate} from '../helpers';
import {UpdateUserResponse} from '../../redux/apis/interface';
import {useAppDispatch} from '../../redux/store';
import {setUser} from '../../redux/reducers/userSlice';

export const useRegister = () => {
  const [updateUser, {isLoading: registerLoading}] = useUpdateProfileMutation();
  const navigation: NavigationProp<any> = useNavigation();
  const dispatch = useAppDispatch();

  const handleUpdateUser = async (formData: any) => {
    try {
      const body = {
        ...formData,
        address:
          formData.address?.placeName !== ''
            ? formData.address?.placeName
            : formData.address?.description,
        dob: formateDate(formData.dob, 'YYYY-MM-DD'),
        lat: 123.123123,
        lng: 123.123123,
        notificationEnabled: true,
      };
      console.log('REGISTER BODY', JSON.stringify(body, null, 1));
      const response = await updateUser(body);
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      const er =
        error?.error || Array.isArray(error?.data?.message)
          ? `${error?.data?.error[0]}`
          : `${error?.data?.error}`;
      if (error) {
        return utility.showToast?.show(er || 'Something went wrong');
      }

      const data = response.data as UpdateUserResponse;
      dispatch(setUser(data.data));
      navigation.navigate('RequestNotification');
    } catch (err) {
      console.log('UPDATE ERROR USER', err);
    }
  };

  return {handleUpdateUser, registerLoading};
};
