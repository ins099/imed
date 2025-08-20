import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ms, vs} from 'react-native-size-matters';
import HomeHeader from '../components/Home/HomeHeader';
import MedicalPartnerSections from '../components/Home/MedicalPartnerSection';
import ServiceSections from '../components/Home/ServicesSection';
import SpecialOffers from '../components/Home/SpecialOffersSection';

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = props => {
  const {} = props;
  const [search, setSearch] = useState<string>('');

  const handleSearch = (txt: string) => {
    setSearch(txt);
  };

  return (
    <View style={styles.container}>
      <HomeHeader search={search} onSearch={handleSearch} />
      <ScrollView
        contentContainerStyle={styles.subContainer}
        showsVerticalScrollIndicator={false}>
        <SpecialOffers />
        <ServiceSections />
        <MedicalPartnerSections />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: ms(18),
    gap: vs(10),
    // pa
  },
});
