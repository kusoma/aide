import React from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Constant } from "../utils/Variables";
import Fonts from "../utils/Fonts";

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Constant.COLORS.MAROON,
    marginBottom: 11
  },
  label: {
    color: "#4A4A4A",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 7
  },
  textfield: {
    fontSize: 20,
    fontWeight: "400",
    color: "#828282",
    marginBottom: 5,
    fontFamily: "Comfortaa"
  },
  errorText: {
    width: 300,
    color: "red",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 20
  }
});

const IsValidImage = ({ image, imageColor }) => {
  const color = imageColor || Constant.COLORS.MAROON;

  if (image !== null) {
    return (
      <View style={{ marginRight: 10, marginBottom: 5 }}>
        <Icon name={image} size={30} color={color} />
      </View>
    );
  }
};

export const TextField = ({ image, imageColor, label, ...props }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View style={{ flexDirection: "row" }}>
      <IsValidImage image={image} imageColor={imageColor} />
      <TextInput
        style={styles.textfield}
        placeholderTextColor="black"
        {...props}
      />
    </View>
  </View>
);

export const ErrorText = ({ text = "" }) => (
  <Text style={styles.errorText}>{text}</Text>
);
