/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ms, scale, vs} from 'react-native-size-matters';
import {COUNTRIES} from '../utils/constants';
import {COLORS} from '../utils/theme';
import CustomIcon from './common/CustomIcon';
import {TextNormal, TextSmall, TextSmaller} from './common/Texts';

interface CountryDropdownProps {
  value: any;
  error?: any;
  onChange: (arg: any) => any;
}

const CountryDropdown: React.FC<CountryDropdownProps> = props => {
  const {value: actualValue = null, onChange, error} = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(actualValue);
  const [items, setItems] = useState(COUNTRIES);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        renderSelectedItem={(selected: string) => (
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image
              source={{
                uri:
                  COUNTRIES.find(i => i.label === selected)?.flagUrl ||
                  COUNTRIES[0].flagUrl,
              }}
              height={28}
              width={28}
              resizeMode="stretch"
              style={{borderRadius: 100}}
            />
            <TextNormal>{selected}</TextNormal>
          </View>
        )}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select Country"
        placeholderStyle={{color: COLORS.lightgrey}}
        // listMode="MODAL"
        searchable
        containerStyle={{
          width: '100%',
          marginBottom: 0,
          alignItems: 'center',
        }}
        style={{
          paddingBottom: 0,
          paddingVertical: 0,
          borderRadius: 15,
          borderWidth: 1,
          height: vs(47),
          borderColor: COLORS.borderGrey,
        }}
        itemSeparator
        itemSeparatorStyle={{backgroundColor: COLORS.borderGrey}}
        dropDownDirection="BOTTOM"
        dropDownContainerStyle={{
          // backgroundColor: 'white',
          top: vs(55),
          width: scale(320),
          left: 0,
          borderColor: COLORS.borderGrey,
          borderRadius: 12,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          overflow: 'hidden',
          zIndex: 100,
        }}
        renderListItem={props => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => props.onPress(props.item)}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: props.item.flagUrl}}
                  height={28}
                  width={28}
                  resizeMode="stretch"
                  style={{borderRadius: 100}}
                />
                <TextSmall>{props?.label}</TextSmall>
              </View>
              <CustomIcon
                name={
                  !props.isSelected ? 'radio-btn-passive' : 'radio-btn-active'
                }
                color={COLORS.primary}
                type="fontisto"
                size={ms(18)}
              />
            </TouchableOpacity>
          );
        }}
        searchContainerStyle={{
          borderBottomColor: COLORS.borderGrey,
          padding: 0,
          paddingHorizontal: 10,
        }}
        searchTextInputStyle={{
          height: vs(40),
          fontSize: ms(14),
          borderColor: COLORS.borderGrey,
          borderWidth: 0,
        }}
        searchPlaceholder="Search a country"
        searchPlaceholderTextColor={COLORS.gray}
      />

      {error && (
        <TextSmaller bold color={'red'} textStyle={{fontSize: ms(9)}}>
          {error ? `* ${error}` : ''}
        </TextSmaller>
      )}
    </>
  );
};

export default CountryDropdown;

const styles = StyleSheet.create({
  item: {
    height: 40,
    overflow: 'hidden',
    flex: 1,
  },
  listItem: {
    flex: 1,
    height: vs(45),
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
