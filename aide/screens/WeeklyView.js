import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { GlobalStyle } from '../utils/Variables';
import { WeeklyViewList } from '../components/List';

const DEMODATA = [
  { date: '2/16/2020',
   class: 'CS101',
   timeLabel: '2pm',
   studyLabel: 'Exam - Study Session'
  },
  {
   date: '2/16/2020',
   class: 'UBBL200',
   timeLabel: '8pm',
   studyLabel: 'Exam - Study Session'
  },
  { date: '2/17/2020',
  class: 'CS101',
  timeLabel: '2pm',
  studyLabel: 'Quiz - Study Session'
  },
  { date: '2/18/2020',
  class: 'CS102',
  timeLabel: '10pm',
  studyLabel: 'Quiz - Study Session'
  },

]


export default class WeeklyView extends Component {
    render() {
        return (
          <ScrollView contentContainerStyle={[ GlobalStyle.container]}>
            <Text> Daily Planner </Text>
            
            <WeeklyViewList data={DEMODATA} />
          </ScrollView>

        );
    }

}