import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';

const COLORS = ['#C72400','#E3640D', '#5B9E05']

export const Header = () => (
  <View style={{justifyContent: 'center'}}>
    <View style={styles.circle} />
    <View style={[styles.bar, {justifyContent: 'center'}]} />
  </View>
)



export const WeeklyViewList = () => (
  <TouchableOpacity style={[GlobalStyle.shadow, styles.container]}>
    <View style={styles.leftContainer}>
      <Text style={styles.leftText}> 1PM </Text>
    </View>
    <View style={styles.rightContainer}>
      <Text style={styles.rightText}> CS460 </Text>
      <Text style={styles.rightText}> Exam: Study Session </Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      width: Constant.MAX_WIDTH * 0.7,
      height: Constant.MAX_HEIGHT * 0.08,
      borderRadius: 10,
    },
    leftContainer: {
      height: Constant.MAX_HEIGHT * 0.08,
      width: (Constant.MAX_WIDTH * 0.7) * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftText: {
    },
    rightContainer: {
      backgroundColor: '#C72400',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      height: Constant.MAX_HEIGHT * 0.08,
      width: (Constant.MAX_WIDTH * 0.7) * 0.7,
    },
    rightText: {
      marginTop: 14,
      marginLeft: 14,
      color: '#fff',
    },
    circle: {
      width: Constant.MAX_WIDTH * 0.07,
      height: Constant.MAX_WIDTH * 0.07,
      borderRadius: 50,
      backgroundColor: Constant.COLORS.MAROON
    },
    bar: {
      backgroundColor: '#D9D9D9',
      width: Constant.MAX_WIDTH * 0.02,
      height: Constant.MAX_HEIGHT * 0.05,
      borderWidth: 1,
    }
 });