import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ServicesHeader from '../components/Services/ServicesHeader';
import {CallingDoctor} from '../components/Services/CallingDoctor';
import {LabAnalysis} from '../components/Services/LabAnalysis';
import {DiagnosticAtHome} from '../components/Services/DiagnosticHome';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {setService} from '../redux/reducers/serviceSlice';

interface ServicesScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = props => {
  const {navigation} = props;
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const serviceId = useAppSelector(
    store => store.serviceOrderSlices?.service?.id,
  );

  const handleSelectTab = (arg: any) => {
    dispatch(setService(arg));
  };

  const handleSearch = (txt: string) => {
    setSearch(txt);
  };

  return (
    <View style={styles.container}>
      <ServicesHeader
        search={search}
        onSearch={handleSearch}
        selectedTab={serviceId}
        onSelectTab={handleSelectTab}
      />
      {serviceId === 0 ? (
        <CallingDoctor />
      ) : serviceId === 1 ? (
        <DiagnosticAtHome />
      ) : (
        <LabAnalysis navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
