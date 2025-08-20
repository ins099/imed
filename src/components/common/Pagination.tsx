import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';

interface PaginationProps {
  containerStyle?: ViewStyle;
  pagStyle?: ViewStyle;
  pages?: number;
  currentPage?: number;
}

const Pagination: React.FC<PaginationProps> = props => {
  const {containerStyle, pages = 0, currentPage = 0, pagStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from(Array(pages)).map((_i, index) => (
        <View
          key={index.toString()}
          style={[
            styles.pagBar,
            index <= currentPage && {backgroundColor: COLORS.lightgrey},
            pagStyle,
          ]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: vs(7),
  },
  pagBar: {
    width: 4,
    aspectRatio: 1,
    borderRadius: 100,
    padding: 5,
    backgroundColor: COLORS.gray,
    marginHorizontal: scale(3),
  },
});
