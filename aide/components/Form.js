import React from "react";
import { Text, View, TextInput, StyleSheet, Image} from "react-native";
import Icons from '../utils/Icons';
import { Constant } from '../utils/Variables';
import Fonts from "../utils/Fonts";

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
  textfield: {
    fontSize: 20,
    fontWeight: "400",
    color: "#828282",
    marginBottom: 5,
    fontFamily: 'Comfortaa',
  },
  errorText: {
    width: 300,
    color: 'red',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 20,
  }
});

const isValidImage = (image) => {
  console.log('this is image', image);

  const source = `Icons.${image}`;
  if(Icons.source)
    return source;
  return Icons.person;
}

export const TextField = ({ image, label, ...props }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View> 
      <Image source={isValidImage} />
      <TextInput
        style={styles.textfield}
        placeholderTextColor="#808080"
        {...props}
      />
    </View>

  </View>
);

export const ErrorText = ({ text = '' }) => (
  <Text style={styles.errorText}>{text}</Text>
)
