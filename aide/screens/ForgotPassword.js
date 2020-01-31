import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField, Aide } from '../components/Form';

export default class app extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    }
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={GlobalStyle.container}>
        <Aide></Aide>
        <View style={styles.forms}>
          <TextField
            image="envelope"
            style={GlobalStyle.formIcon}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={[GlobalStyle.pillButtonSide, { top: 30 }]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={GlobalStyle.pillButtonSideText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  forms: {
    backgroundColor: '#fff',
    width: Constant.MAX_WIDTH / 1.25,
    height: Constant.MAX_HEIGHT / 9,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: Constant.COLORS.SHADOW_COLOR,
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
});
