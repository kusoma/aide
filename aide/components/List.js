import React from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { WeeklyButton } from "./Buttons";
import { Constant } from "../utils/Variables";

const COLORS = ['#C72400','#E3640D', '#5B9E05']

export const WeeklyViewList = ({data}) => (
  <ScrollView contentContainerStyle={{width: Constant.MAX_WIDTH, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{ marginTop: 2, marginBottom: 10 }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.redCircle} />
        <Text style={[ {marginTop: 10, marginLeft: 20}, styles.textStyle]}> Today </Text>
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.grayBar} />
        <WeeklyButton 
          timeLabel="in 1hr"
          classLabel="UBBL 200"
          studyLabel="Quiz - Study Session"
          color={COLORS[1]}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.grayBar} />
        <WeeklyButton 
          timeLabel="10PM"
          classLabel="CS101"
          studyLabel="Exam - Study Session"
          color={COLORS[2]}
        />
      </View>
    </View>
    <View style={{ marginTop: 2, marginBottom: 10 }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.redCircle} />
        <Text style={[ {marginTop: 10, marginLeft: 20}, styles.textStyle]}> Tomorrow, Feburary 27 </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.grayBar} />
        <WeeklyButton 
          timeLabel="2PM"
          classLabel="CS101"
          studyLabel="Exam - Study Session"
          color={COLORS[0]}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.grayBar} />
        <WeeklyButton 
          timeLabel="3PM"
          classLabel="CS101"
          studyLabel="Exam - Study Session"
          color={COLORS[1]}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.grayBar} />
        <WeeklyButton 
          timeLabel="4PM"
          classLabel="CS101"
          studyLabel="Exam - Study Session"
          color={COLORS[2]}
        />
      </View>
    </View>
    <View style={{ marginTop: 2, marginBottom: 10 }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.redCircle} />
        <Text style={[ {marginTop: 10, marginLeft: 20}, styles.textStyle]}> Feburary 28 </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.grayBar} />
        <WeeklyButton 
          timeLabel="4PM"
          classLabel="CS101"
          studyLabel="Exam - Study Session"
          color={COLORS[0]}
        />
      </View>
    </View>
  </ScrollView>


)

const styles = StyleSheet.create({ 
  textStyle: {
    fontFamily: 'SF_Pro_Bold',
    fontWeight: '900',
    letterSpacing: 0.5,
    fontSize: 26,
    marginTop: -3,
  },
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