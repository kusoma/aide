import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { GlobalStyle } from '../utils/Variables';
import { WeeklyViewList } from '../components/List';

const DEMODATA = [
  { date: '2/26/2020',
   class: 'CS101',
   timeLabel: '2pm',
   studyLabel: 'Exam - Study Session'
  },
  {
   date: '2/26/2020',
   class: 'UBBL200',
   timeLabel: '8pm',
   studyLabel: 'Exam - Study Session'
  },
  { date: '2/27/2020',
  class: 'CS101',
  timeLabel: '2pm',
  studyLabel: 'Quiz - Study Session'
  },
  { date: '2/28/2020',
  class: 'CS102',
  timeLabel: '10pm',
  studyLabel: 'Quiz - Study Session'
  },

]


export default class WeeklyView extends Component {
    render() {
        return (
          <ScrollView contentContainerStyle={[ GlobalStyle.container]}>
            <Text style={[{ marginTop: 50, marginBottom: 30}, styles.textStyle ]}> Daily Planner </Text>
            
            <WeeklyViewList data={DEMODATA} />
          </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SF_Pro_Bold',
    fontWeight: '900',
    letterSpacing: 0.5,
    fontSize: 26,
  },
 });