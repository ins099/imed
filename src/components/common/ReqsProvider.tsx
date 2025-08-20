import React from 'react';
import {useToast} from 'react-native-toast-notifications';
import {preReqs} from '../../utils/service/preReqs';
import {useTranslation} from 'react-i18next';

type ReqsProviderProps = {
  children: React.ReactNode;
};

const ReqsProvider: React.FC<ReqsProviderProps> = ({children}) => {
  // preReqs(useToast, useAppDispatch);
  preReqs(useToast, useTranslation);
  return children;
};

export default ReqsProvider;
