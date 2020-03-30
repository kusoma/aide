import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Constant, GlobalStyle } from "../utils/Variables";

const IsValidImage = ({ image, imageColor }) => {
  const color = imageColor || Constant.COLORS.MAROON;

  if (image !== null) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 5, }}>
        <Icon name={image} size={25} color={color} />
      </View>
    )
  }
}

export const WideButton = ({ label, image, imageColor, buttonStyle, textStyle, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.wideButtons, GlobalStyle.shadow, buttonStyle]}
  >
    <IsValidImage image={image} imageColor={imageColor} />
    <Text style={[styles.wideButtonsText, textStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
)

export const WeeklyButton = ({timeLabel, classLabel, titleLabel, color}) => (
  <TouchableOpacity style={[styles.WeeklyButtons, GlobalStyle.shadow]}>
    <View style={styles.WeeklyButtonTime}>
      <Text style={[styles.WeeklyButtonsText]}> 
        {timeLabel}
      </Text>
    </View>
    <View style={[styles.WeeklyButtonClass, {backgroundColor: color}]}>
      <Text style={[ styles.WeeklyButtonTextClass ,styles.WeeklyButtonsText]}> 
        {classLabel}
      </Text>
      <Text style={[ styles.WeeklyButtonTextClass ,styles.WeeklyButtonsText]} numberOfLines={1}> 
        {titleLabel}
      </Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  wideButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Constant.MAX_WIDTH * 0.8,
    height: Constant.MAX_HEIGHT * 0.04,
    backgroundColor: '#F7F7F7',
    borderRadius: 7,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  wideButtonsText: {
    fontSize: 17,
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  WeeklyButtons: {
    flexDirection: 'row',
    height: Constant.MAX_HEIGHT * 0.08,
    width: Constant.MAX_WIDTH * 0.8,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  WeeklyButtonTime: {
    width: (Constant.MAX_WIDTH * 0.8) * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WeeklyButtonClass: {  
    width: (Constant.MAX_WIDTH * 0.8) * 0.75,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  WeeklyButtonsText: {
    fontFamily: 'SF_Pro_Bold',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.4,
  },
  WeeklyButtonTextClass: {
    color: '#fff',
    marginTop: 10,
    marginLeft: 20,
    width: (Constant.MAX_WIDTH * 0.5)
  },
});
