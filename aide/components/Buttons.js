import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Constant, GlobalStyle } from "../utils/Variables";

const IsValidImage = ({ image, imageColor }) => {
  const color = imageColor || Constant.COLORS.MAROON;

  if (image !== null) {
    return (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 5,
          marginTop: 5
        }}
      >
        <Icon name={image} size={25} color={color} />
      </View>
    );
  }
};
export const WideButton = ({
  label,
  image,
  imageColor,
  buttonStyle,
  textStyle,
  navigation,
  screenName
}) => (
  <View>
    <TouchableOpacity
      onPress={() => navigation.navigate(screenName)}
      style={[styles.wideButtons, GlobalStyle.shadow, buttonStyle]}
    >
      <IsValidImage image={image} imageColor={imageColor} />
      <Text style={[styles.wideButtonsText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wideButtons: {
    flexDirection: "row",
    alignItems: "center",
    width: Constant.MAX_WIDTH * 0.8,
    height: Constant.MAX_HEIGHT * 0.04,
    backgroundColor: "#F7F7F7",
    borderRadius: 7,
    borderColor: "#E1E1E1",
    borderWidth: 1
  },
  wideButtonsText: {
    fontSize: 17,
    letterSpacing: 0.5,
    lineHeight: 22
  }
});
