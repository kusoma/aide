import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Constant } from '../utils/Variables';

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
    fontSize: 16,
    fontWeight: "400",
    color: "#828282",
    marginBottom: 4
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 20,
  }
});

export const TextField = ({ label, ...props }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.textfield}
      placeholderTextColor="#808080"
      {...props}
    />
  </View>
);

export const ErrorText = ({ text = '' }) => (
  <Text style={styles.errorText}>{text}</Text>
)
