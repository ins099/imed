import {ToastType} from 'react-native-toast-notifications';
import {DispatchProp} from 'react-redux';

type Utility = {
  changeLanguage: (code: string) => any;
  translate: (txt: string) => string;
  showToast?: ToastType;
  dispatch?: DispatchProp;
  selector?: any;
};

export const utility: Utility = {
  translate: function (_txt: string): string {
    throw new Error('Function not implemented.');
  },
  changeLanguage: function (_code: string) {
    throw new Error('Function not implemented.');
  },
};
