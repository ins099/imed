/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, vs} from 'react-native-size-matters';
import {COLORS} from '../utils/theme';
import {TextNormal} from './common/Texts';
import {DAYS} from '../utils/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface DayPickerProps {
  selectedDay: any;
  setSelectedDay: any;
  loading: boolean;
  days: {day: number}[];
}

// Date row component
export const DayPicker: React.FC<DayPickerProps> = props => {
  const {selectedDay, setSelectedDay, days, loading} = props;

  // Generate dates from tomorrow to a month ahead
  const dates = useMemo(() => {
    const start = dayjs().add(1, 'day');
    const end = dayjs().add(1, 'month');
    let dateArray = [];
    for (let date = start; date.isBefore(end); date = date.add(1, 'day')) {
      dateArray.push(date);
    }
    return dateArray;
  }, []);

  // Render each date item
  const renderItem = ({item}) => {
    const isSelected = selectedDay === item.day;
    // const isSelected = selectedDay && selectedDay.isSame(item, 'day');
    // const isDisabled = item.day() === 6 || item.day() === 0; // Disable weekends
    const isDisabled = false; // Disable weekends

    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isSelected && styles.selected,
          isDisabled && styles.disabled,
        ]}
        onPress={() => !isDisabled && setSelectedDay(item.day)}
        disabled={isDisabled}>
        <TextNormal
          color={COLORS.gray}
          textStyle={[isDisabled && styles.disabledText]}>
          {/* {item.format('ddd')} */}
          {DAYS[item.day]}
        </TextNormal>
        <TextNormal
          textStyle={[isDisabled && styles.disabledText, {fontWeight: '400'}]}>
          {/* {item.format('D')} */}
          {item.day}
        </TextNormal>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextNormal bold>CHOOSE_A_DAY</TextNormal>
      <FlatList
        data={days}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingBottom: 10,
          },
          days.length === 0 && {width: '100%'},
        ]}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                width: '100%',
                height: heightPercentageToDP(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {days.length === 0 && loading ? (
                <ActivityIndicator size={'small'} color={COLORS.primary} />
              ) : (
                <TextNormal center>No Available Day</TextNormal>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: vs(10),
  },
  dateItem: {
    width: scale(60),
    height: vs(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    borderColor: 'transparent',
    backgroundColor: COLORS.white,

    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
    shadowColor: COLORS.gray,
  },
  selected: {
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  dateText: {},
  disabledText: {
    color: '#aaa',
  },
});
