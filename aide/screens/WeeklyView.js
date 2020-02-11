import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { GlobalStyle } from '../utils/Variables';
import { WeeklyViewList, Header } from '../components/List';

export default class WeeklyView extends Component {
    render() {
        return (
          <ScrollView contentContainerStyle={[ GlobalStyle.container]}>
            <Text style={styles.description}> Daily Planner </Text>
            <Header />
            <WeeklyViewList />
          </ScrollView>

        );
    }
}

const styles = StyleSheet.create({ 
  description: {
    fontSize: 26,
    fontFamily: 'Comfortaa',
    fontWeight: '900',
    letterSpacing: 0
  }
});