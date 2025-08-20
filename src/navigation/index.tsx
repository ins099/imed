import React from 'react';
import AuthStack from './AuthStack';
import DashStack from './DashStack';
import {useAppSelector} from '../redux/store';

// import {useAppSelector} from '../redux/store';
// import {useNotifications} from '../utils/hooks/useNotifications';

const RootNavigation: React.FC = () => {
  // const onFocusEffect = React.useCallback(() => {
  //   // This should be run when screen gains focus - enable the module where it's needed
  //   AvoidSoftInput.setEnabled(true);
  //   AvoidSoftInput.setShouldMimicIOSBehavior(false);
  //   return () => {
  //     // This should be run when screen loses focus - disable the module where it's not needed, to make a cleanup
  //     AvoidSoftInput.setEnabled(false);
  //     AvoidSoftInput.setShouldMimicIOSBehavior(false);
  //   };
  // }, []);

  // useFocusEffect(onFocusEffect);

  const accessToken = useAppSelector(store => store.userSlice.accessToken);
  const accessApp = useAppSelector(store => store.userSlice.accessApp);

  return (accessToken && accessApp) ? <DashStack /> : <AuthStack />;
};

export default RootNavigation;
