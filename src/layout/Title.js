import React from 'react';
import { Text, View } from 'react-native';
import colors from '../../assets/colors/colors';

const Title = ({
  title = 'Đề xuất cho bạn',
  marginTopCustom,
  fontsizeCustom,
  viewAll = 'Xem tất cả',
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: marginTopCustom ? marginTopCustom : 20,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: fontsizeCustom ? fontsizeCustom : 20,
          fontFamily: 'Inter-Bold',
        }}
      >
        {title}
      </Text>
      {/* <Text
        style={{
          color: colors.text,
          fontSize: 15,
          fontFamily: 'Inter-Medium',
          color: colors.primary,
        }}
      >
        {viewAll}
      </Text> */}
    </View>
  );
};

export default Title;
