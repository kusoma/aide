import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from '../components/Calendar';
import { GlobalStyle } from '../utils/Variables';
import PieChart from "react-native-d3-charts";

export default class MonthlyView extends Component {
    render() {
        return(
          <ScrollView contentContainerStyle={GlobalStyle.container}> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.description}> Overview </Text>
              <TouchableOpacity>
                <Icon
                  name="plus"
                  backgroundColor="#fff"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <Calendar /> 
            <Text style={styles.description}> Growth in Numbers </Text>
            <PieChart />
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