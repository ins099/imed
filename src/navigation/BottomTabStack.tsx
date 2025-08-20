/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeSVG from '../assets/images/home.svg';
import HealthPlusSVG from '../assets/images/healthplus.svg';
import HeartBeatSVG from '../assets/images/heartbeat.svg';
import SettingsSVG from '../assets/images/settings.svg';
import {COLORS} from '../utils/theme';
import {TabList, TabStackParamList} from './interface';
import {TextSmall} from '../components/common/Texts';
import {HomeStack} from './Tabs/HomeStack';
import {ServiceStack} from './Tabs/ServiceStack';
import OrdersStack from './Tabs/OrderStack';
import ProfileStack from './Tabs/ProfileStack';
import {vs} from 'react-native-size-matters';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TABS: TabList[] = [
  {
    id: 1,
    label: 'Home',
    icon: (props: any) => <HomeSVG {...props} />,
    component: HomeStack,
  },
  {
    id: 2,
    label: 'Services',
    icon: (props: any) => <HealthPlusSVG {...props} />,
    component: ServiceStack,
  },
  {
    id: 1,
    label: 'Orders',
    component: OrdersStack,
    icon: (props: any) => <HeartBeatSVG {...props} />,
  },
  {
    id: 1,
    label: 'Profile',
    component: ProfileStack,
    icon: (props: any) => <SettingsSVG {...props} />,
  },
];

const BottomTabStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: '#DCDBCD',
          // height: vs(70),
        },
      }}>
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.id}
          name={tab.label}
          component={tab.component}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              tab.icon({color: focused ? COLORS.primary : COLORS.gray}),
            tabBarLabel: ({children, focused, position}) => (
              <TextSmall
                bold={focused}
                color={focused ? COLORS.primary : COLORS.gray}>
                {children}
              </TextSmall>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabStack;
