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
        isLoading: true,
      }
    }


     componentDidMount() {
       callCanvas((json) => {
        if (json.errors || !json) {
          return;
        }
        this.state.data = json;
        this.setState({ isLoading: false });
      })
    }

    
    render() {
      if(!this.state.isLoading)
      {
        console.log('-----------------------------------------');
        
        console.log(this.state.data);
      }

        
        return (
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
            {!this.state.isLoading ?
                        <Calendar 
                        data={this.state.data}
                        /> 
            : null}

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