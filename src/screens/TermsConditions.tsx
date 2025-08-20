import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomIcon from '../components/common/CustomIcon';
import {TextNormal} from '../components/common/Texts';
import CustomButton from '../components/common/CustomButton';
import {useAppDispatch} from '../redux/store';
import {setAccessApp} from '../redux/reducers/userSlice';
import {COLORS} from '../utils/theme';

interface TermsConditionsProps {
  navigation: NavigationProp<any>;
}

export const TermsConditionsScreen: React.FC<TermsConditionsProps> = props => {
  const {navigation} = props;
  const dispatch = useAppDispatch();

  const onAgree = () => dispatch(setAccessApp(true));

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <CustomIcon
          name="arrow-left"
          type="material-community"
          onPress={() => navigation.goBack()}
          containerStyle={{flex: 1}}
        />
        <TextNormal center bold textStyle={{flex: 2}}>
          Terms of Use
        </TextNormal>
        <View style={{flex: 1}} />
      </View>
      <ScrollView
        contentContainerStyle={{padding: 15, paddingBottom: 40, gap: 10}}
        showsVerticalScrollIndicator={false}>
        <TextNormal>
          Lorem ipsum dolor sit amet consectetur. Amet nullam magna praesent
          hendrerit tristique tincidunt. Porta vitae nisi commodo viverra ac
          arcu integer id ipsum. At urna pulvinar nullam risus ut iaculis
          scelerisque hendrerit. Volutpat mollis rhoncus interdum eleifend
          scelerisque volutpat. Pulvinar commodo dolor aliquam pharetra velit
          vitae augue. Tortor netus leo nec auctor sapien in sapien id lectus.
          Nulla fusce luctus sem vulputate pellentesque. Tempus pulvinar dui est
          proin. Ultrices sed quisque elit at laoreet. Bibendum leo bibendum sed
          quisque nec. Neque morbi pharetra donec morbi interdum odio. Non cras
          ut varius turpis dui nibh eu. Nulla tellus faucibus a non tincidunt eu
          lorem eget. Amet iaculis morbi urna donec dapibus odio tempus
          imperdiet tempor. {'\n\n'} Sit donec est commodo at lectus. Morbi
          posuere magna cras quam ullamcorper rutrum. Bibendum sagittis at arcu
          tristique pharetra posuere enim neque. Ut arcu nunc vulputate ut enim.
          Congue dui facilisis sit lectus. Nunc lobortis tempor sit faucibus dui
          dignissim magna. Facilisis viverra nisl enim velit felis ultrices eu.
          Lorem tincidunt proin diam magna eros. Volutpat mattis in at
          sollicitudin in morbi tempor turpis. Odio consequat neque a nisl
          egestas tincidunt malesuada. Ut dignissim commodo neque ut cras
          vulputate ac nunc. Risus lacus netus sed enim fames libero nulla.
          Nulla viverra elementum eu enim sapien cursus integer sit facilisis.
          Elit aenean molestie quam volutpat amet aenean id. Tempus nunc
          volutpat malesuada elit euismod neque. Urna magna nibh turpis duis sed
          ac amet tincidunt euismod. Risus at consequat tristique feugiat
          vivamus hendrerit amet tellus neque. A tincidunt faucibus mauris
          vitae. Pretium diam ut cras est rhoncus commodo quis. Consequat sit
          tristique amet feugiat eget congue et sapien. Libero mauris lobortis
          nibh mauris at scelerisque ac. In sociis scelerisque tempus felis.
          Enim risus sed dui cursus urna diam. Enim nec suspendisse facilisis
          ultricies mollis enim pharetra sit mauris. Blandit habitasse odio amet
          tellus mi proin nisl turpis mauris. Pellentesque scelerisque volutpat
          aliquam turpis. Nullam volutpat non suspendisse adipiscing. Leo tempor
          quam ac dui ridiculus turpis lorem. Elit morbi imperdiet posuere
          etiam. Sed mi ornare mattis consectetur magna diam purus. Donec
          aliquam enim risus amet. Tincidunt sed eleifend tristique fusce mattis
          et. In volutpat dui arcu fames elit pretium. Malesuada justo fringilla
          etiam elit. Ac at tellus urna feugiat blandit id odio cras. Risus nec
          placerat massa vitae condimentum volutpat aliquet nisl. Consectetur
          adipiscing duis mi sagittis nunc in dui porttitor duis.
        </TextNormal>
        <CustomButton title="Agree" onPress={onAgree} />
        <TextNormal color={COLORS.primary} center onPress={() => {}}>
          Cancel
        </TextNormal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
