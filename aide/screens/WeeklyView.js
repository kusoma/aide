import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { GlobalStyle } from '../utils/Variables';
import { WeeklyViewList } from '../components/List';

export default class WeeklyView extends Component {
    render() {
        return (
          <ScrollView contentContainerStyle={[ GlobalStyle.container]}>
            <Text> Daily Planner </Text>
            
            <WeeklyViewList />
          </ScrollView>

        );
    }

}