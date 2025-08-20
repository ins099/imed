import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale, vs} from 'react-native-size-matters';
import {TextNormal} from '../components/common/Texts';
import {ProfileBar} from '../components/ProfileBar';
import {useAppDispatch, useAppSelector} from '../redux/store';
import { COLORS } from '../utils/theme';

export const ProfileScreen: React.FC = () => {
  const user = useAppSelector(store => store.userSlice);
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TextNormal bold>Profile</TextNormal>
      </View>
      <View
        style={styles.container}
        >
        <ProfileBar
          name={user.name}
          email={user.email}
          phoneNumber={user.mobileNumber}
          image={user?.image}
        />
      </View>

      <TouchableOpacity style={{ width: "70%", borderRadius:7, backgroundColor:COLORS.primary, padding:vs(12), position:"absolute", bottom: 20, alignSelf:"center"}} onPress={() => dispatch({type: 'LOGOUT'})}>
        <Text style={{color:COLORS.white, textAlign:"center"}}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? vs(10) : 0
  },
  container: {
    padding: scale(12),
    paddingTop: vs(20),
  },
});
