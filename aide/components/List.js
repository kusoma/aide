import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { WeeklyButton } from "./Buttons";
import { Constant } from "../utils/Variables";

const COLORS = ['#C72400','#E3640D', '#5B9E05']

export const WeeklyViewList = ({data}) => (
  <View>
    <View style={{flexDirection: 'row'}}>
      <View style={styles.redCircle} />
      <Text style={[ {marginTop: 10, marginLeft: 20}]}> Today </Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.grayBar} />
      <WeeklyButton 
        timeLabel="in 45 Mins"
        classLabel="CS101"
        studyLabel="Exam - Study Session"
        color={COLORS[0]}
      />
    </View>
  </View>


)

const styles = StyleSheet.create({ 
  grayBar: {
    width: Constant.MAX_WIDTH * 0.02,
    height: Constant.MAX_HEIGHT * 0.125,
    backgroundColor: '#D9D9D9',
    marginRight: 25,
  },
  redCircle: {
    marginLeft: -12,
    marginBottom: 10,
    borderRadius: 100,
    width: Constant.MAX_WIDTH * 0.08,
    height: Constant.MAX_WIDTH * 0.08,
    backgroundColor: '#B21B1B',
  }
});