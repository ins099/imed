import {StackScreenProps} from '@react-navigation/stack';

export type AuthStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  Register: undefined;
  Terms: undefined;
  RequestNotification: undefined;
};

export type TabStackParamList = {
  Home: undefined;
  Services: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type DashStackParamList = {
  TabBar: undefined;
  PlaceOrder: undefined;
};

export type DashStackProps<Screen extends keyof DashStackParamList> =
  StackScreenProps<DashStackParamList, Screen>;

export type AuthStackProps<Screen extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, Screen>;

export type TabStackProps<Screen extends keyof TabStackParamList> =
  StackScreenProps<TabStackParamList, Screen>;

export interface TabList {
  id: number;
  label: 'Home' | 'Services' | 'Orders' | 'Profile';
  icon: any;
  component: React.FC<any>;
}
