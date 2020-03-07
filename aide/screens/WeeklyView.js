import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { GlobalStyle } from '../utils/Variables';
import { WeeklyViewList } from '../components/List';


export default class WeeklyView extends Component {
    render() {
      console.log('this is weekly', this.props);
      
        return (
          <ScrollView contentContainerStyle={[ GlobalStyle.container]}>
            <Text style={[{ marginTop: 50, marginBottom: 30}, styles.textStyle ]}> Daily Planner </Text>
  
            <WeeklyViewList />
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