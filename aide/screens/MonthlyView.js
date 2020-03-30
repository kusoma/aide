import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from '../components/Calendar';
import { GlobalStyle } from '../utils/Variables';
import { callCanvas } from '../utils/API';


export default class MonthlyView extends Component {
    constructor() {
      super();
      this.state = {
        data: [],
      }
    }

     componentDidMount() {
       callCanvas((json) => {
        if (json.errors || !json) {
          return;
        }
        this.setState({ data: json });
      })
    }
    
    render() {    
      console.disableYellowBox = true;
        return (
          <ScrollView contentContainerStyle={GlobalStyle.container}> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-evenly'}}>
              <Text style={[styles.description]}> Overview </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Icon
                  name="plus"
                  backgroundColor="#fff"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <Calendar 
              data={this.state.data}
            /> 
            <Text style={styles.description}> Growth in Numbers </Text>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({ 
  description: {
    fontSize: 26,
    fontFamily: 'SF_Pro_Bold',
    fontWeight: '900',
    letterSpacing: 0
  }
});