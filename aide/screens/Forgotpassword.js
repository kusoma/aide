import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Constant } from '../utils/Variables';
import { TextField } from '../components/Form';

export default class app extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: 'row', top: 125, position: 'absolute' }}>
          <Text style={[styles.title, styles.titleLeft]}>AI</Text>
          <Text style={styles.title}>DE</Text>
        </View>
        <TouchableOpacity style={styles.forms}>
          <TextField
            image="envelope"
            style={{
              width: 300,
              marginBottom: 5,
              fontSize: 18,
            }}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signInButton, { top: 30 }]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.signInButtonText}> Reset Password </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20
  },
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
  signInButton: {
    backgroundColor: Constant.COLORS.MAROON,
    borderRadius: 50,
    width: Constant.MAX_WIDTH / 1.25,
    left: Constant.MAX_WIDTH / 2 - 45,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: Constant.COLORS.SHADOW_COLOR,
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  signInButtonText: {
    letterSpacing: -0.41,
    color: '#fff',
    fontSize: 24,
    left: 30
  },
  title: {
    fontSize: 72,
    letterSpacing: 10,
    fontFamily: 'Comfortaa_Bold',
  },
  titleLeft: {
    color: Constant.COLORS.MAROON,
  },
  text: {
    fontSize: 18,
    color: Constant.COLORS.MAROON,
  }
});
