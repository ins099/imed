import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ReqsProvider from './src/components/common/ReqsProvider';
import RootNavigation from './src/navigation';
import {persistor, store} from './src/redux/store';
import {COLORS} from './src/utils/theme';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const App: React.FC = () => {
  LogBox.ignoreAllLogs();
  SystemNavigationBar.setNavigationColor(COLORS.primary);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <ToastProvider placement="top" duration={4000} style={{top: 30}}>
        <ReqsProvider>
          <PersistGate persistor={persistor}>
            <Provider store={store}>
              <MenuProvider>
                <NavigationContainer>
                  <RootNavigation />
                </NavigationContainer>
              </MenuProvider>
            </Provider>
          </PersistGate>
        </ReqsProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default App;
