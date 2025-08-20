import i18n from '../../localization/i18n';
import {utility} from '../utility';
import en from '../../localization/en';

export const preReqs = (...args: any[]) => {
  // let [toast, dispatcher] = args;
  let [toast, translation] = args;
  utility.showToast = toast();
  utility.translate = (text: string = '.') => {
    return translation().t(text);
  };
  utility.changeLanguage = (code: string) => i18n.changeLanguage(code);
  // utility.dispatch = dispatcher();
};
