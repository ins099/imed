/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {COLORS} from '../utils/theme';
import {TextNormal} from './common/Texts';
import {heightPercentageToDP} from 'react-native-responsive-screen';

// Time grid component
const TimePicker = ({handleSelectTime, timeSlots, loading, startTime}) => {
  // Generate hours from 9 to 17
  const times = () => {
    const startHour = 9;
    const endHour = 17;
    let timeArray = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      timeArray.push(hour);
    }
    return timeArray;
  };

  // Render each time item in the grid
  const renderItem = ({item}) => {
    const isSelected = startTime === item.startTime;

    return (
      <TouchableOpacity
        style={[styles.timeItem, isSelected && styles.selected]}
        onPress={() => handleSelectTime(item.startTime)}>
        <Text style={styles.timeText}>{`${item.displayTime}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextNormal bold>SELECT_TIME</TextNormal>
      <FlatList
        data={timeSlots}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        numColumns={3} // Display in 3 columns
        scrollEnabled={false}
        contentContainerStyle={[
          {
            paddingBottom: 10,
          },
          timeSlots.length === 0 && {width: '100%'},
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
              {timeSlots.length === 0 && loading ? (
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
    marginVertical: vs(10),
    gap: 10,
  },
  grid: {
    // alignItems: 'center',
  },
  timeItem: {
    width: scale(98),
    height: vs(40),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: COLORS.white,

    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.3,
    elevation: 10,
    shadowRadius: 3,
    shadowColor: COLORS.gray,
  },
  selected: {
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: ms(16),
    color: '#333',
  },
});

export default TimePicker;
