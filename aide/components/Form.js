import React from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constant, GlobalStyle } from '../utils/Variables';

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Constant.COLORS.MAROON,
    marginBottom: 11,
  },
  label: {
    color: "#4A4A4A",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 7
  },
  textField: {
    fontSize: 20,
    fontWeight: "400",
    color: "#828282",
    marginBottom: 5,
    fontFamily: 'Comfortaa',
  },
  errorText: {
    width: 300,
    color: 'red',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    top: Constant.MAX_HEIGHT * 0.2
  }
});

const IsValidImage = ({ image, imageColor }) => {
  const color = imageColor || Constant.COLORS.MAROON;

  if (image !== null) {
    return (
      <View style={{ marginRight: 10, marginBottom: 5 }}>
        <Icon name={image} size={30} color={color} />
      </View>
    )
  }
}

export const TextField = ({ image, imageColor, label, ...props }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View style={{ flexDirection: 'row' }}>
      <IsValidImage image={image} imageColor={imageColor} />
      <TextInput
        style={styles.textField}
        placeholderTextColor="#808080"
        {...props}
      />
    </View>

  </View>
);

export const ErrorText = ({ text = '' }) => (
  <Text style={styles.errorText}>{text}</Text>
)
