/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ms, scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import CustomIcon from './CustomIcon';
import {TextSmall, TextSmaller} from './Texts';
import Modal from 'react-native-modal';

interface CustomDropDownProps {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  error?: string | undefined;
  dropDownType?: 'DEFAULT' | 'FLATLIST' | 'SCROLLVIEW' | 'MODAL';
  value: any;
  onChange: (arg: any) => void;
  lists: {label: string; value: string}[];
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  containerStyle,
  error,
  searchable,
  onChange,
  placeholder,
  multiple,
  dropDownType = 'MODAL',
  value = null,
  label,
  lists,
}: CustomDropDownProps): JSX.Element => {
  const labelVisible = !!label;

  const [open, setOpen] = useState(false);
  const [val, setValue] = useState(value);
  const [items, setItems] = useState(
    lists || [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ],
  );

  useEffect(() => {
    if (val) {
      onChange(val);
    }
  }, [val]);

  const [modalVisible, setModalVisible] = useState(false);

  const renderModal = (children: any) => {
    return (
      <Modal
        isVisible={modalVisible}
        animationIn={'slideInUp'}
        animationOut={'fadeOut'}
        style={{
          flex: 1,
          margin: 0,
          justifyContent: 'flex-end',
          paddingHorizontal: scale(10),
          paddingBottom: vs(40),
        }}>
        <View
          style={{
            minHeight: 120,
            backgroundColor: COLORS.white,
            borderRadius: 12,
          }}>
          {children}
        </View>
      </Modal>
    );
  };

  return (
    // <View style={[containerStyle]}>
    <>
      <View style={[styles.container, containerStyle]}>
        {labelVisible && (
          <TextSmall textStyle={styles.label}>{label}</TextSmall>
        )}
        <View>
          <DropDownPicker
            open={open}
            value={val}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            multiple={multiple}
            setItems={setItems}
            onOpen={() => dropDownType === 'MODAL' && setModalVisible(true)}
            onSelectItem={() =>
              dropDownType === 'MODAL' && setModalVisible(false)
            }
            placeholder={placeholder ?? ''}
            placeholderStyle={{color: COLORS.lightgrey}}
            listMode={dropDownType}
            searchable={searchable}
            itemSeparator
            itemSeparatorStyle={{backgroundColor: COLORS.borderGrey}}
            dropDownDirection="BOTTOM"
            searchPlaceholder="Search a country"
            searchPlaceholderTextColor={COLORS.gray}
            style={{
              paddingBottom: 0,
              paddingVertical: 0,
              paddingLeft: 20,
              height: scale(47),
              borderRadius: 12,
              borderWidth: 1,
              borderColor: COLORS.borderGrey,
              top: 5,
            }}
            textStyle={{fontFamily: 'Literal-Regular'}}
            containerStyle={{
              //   width: '20%',
              marginBottom: 0,
              alignItems: 'center',
            }}
            dropDownContainerStyle={{
              // backgroundColor: 'white',
              top: vs(45),
              width: scale(320),
              left: 0,
              borderColor: COLORS.borderGrey,
              borderRadius: 12,
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
                    <TextSmall>{props?.label}</TextSmall>
                  </View>
                  <CustomIcon
                    name={
                      !props.isSelected
                        ? 'radio-btn-passive'
                        : 'radio-btn-active'
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
            }}
            searchTextInputStyle={{
              height: vs(40),
              fontSize: ms(14),
              borderColor: COLORS.borderGrey,
            }}
            renderModal={(listComponent: any) => renderModal(listComponent)}
          />
        </View>
      </View>
      <TextSmaller
        bold
        color={'red'}
        textStyle={{marginTop: 10, fontSize: ms(9)}}>
        {error ? `* ${error}` : ''}
      </TextSmaller>
    </>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    height: scale(47),
    maxHeight: 80,
    marginBottom: vs(13),
  },
  label: {},

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
