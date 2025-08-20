import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {TextNormal, TextSmall} from './common/Texts';
import {COLORS} from '../utils/theme';
import {IMAGES} from '../utils/images';
import {ms, scale, vs} from 'react-native-size-matters';

interface ProfileBarProps {
  image: string | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export const ProfileBar: React.FC<ProfileBarProps> = props => {
  const {image, email, name, phoneNumber} = props;

  return (
    <View style={styles.container}>
      <View style={{borderRadius: 100, overflow: 'hidden'}}>
        <Image
          source={image ? {uri: image} : IMAGES.account}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <TextNormal bold>{name ?? 'No user name'}</TextNormal>
        <TextSmall color={COLORS.darkGrey}>
          {phoneNumber ?? 'No phone number'}
        </TextSmall>
        <TextSmall color={COLORS.darkGrey}>
          {email ?? 'No email'}
        </TextSmall>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(14),
    // marginTop: vs(10),
  },
  textContainer: {
    gap: 10,
  },
  image: {
    height: vs(70),
    width: scale(70),
  },
});
