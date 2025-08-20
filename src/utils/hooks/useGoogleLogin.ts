import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useGoogleLoginMutation} from '../../redux/apis/auth';
import {GoogleLoginResponse} from '../../redux/apis/interface';
import {
  setAccessApp,
  setAccessToken,
  setUser,
} from '../../redux/reducers/userSlice';
import {useAppDispatch} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';

export const useGoogleLogin = () => {
  const [googleLogin, {isLoading}] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      '2321809169-6dorvns7lvd281t3dauagcm8098451bi.apps.googleusercontent.com',
    offlineAccess: true,
    iosClientId:
      '2321809169-m7cf6ae61pr4lpghq392npuqadq8bm0l.apps.googleusercontent.com',
  });

  const handleServerLogin = async (body: any) => {
    try {
      const response = await googleLogin(body);
      if (response?.error) {
        throw new Error(JSON.stringify(response.error));
      }
      const data = response.data as GoogleLoginResponse;
      // dispatch(setUser(data.data.user));
      dispatch(setAccessToken(data.data.token));
      if (data.data.userExists && data.data?.user?.mobileNumber) {
        dispatch(setUser(data.data.user));
        dispatch(setAccessApp(true));
        return;
      }
      dispatch(setAccessApp(false));
      navigation?.replace('Register');
    } catch (error) {
      console.log('HANDLE SERVER LOGIN ERROR', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      // console.log('RESPONSE', JSON.stringify(response, null, 1));
      if (isSuccessResponse(response)) {
        dispatch(setUser({image: response.data.user.photo}));
        const body = {
          ...response.data.user,
          socialId: response.data.user.id,
        };
        await handleServerLogin(body);
        return response;
        // setState({userInfo: response.data});
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleGoogleLogin,
    handleGoogleLogout,
    isLoading,
  };
};
