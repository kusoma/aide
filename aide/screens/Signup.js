import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar
} from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField } from '../components/Form';
import Icons from '../utils/Icons';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: 'row', top: 125, position: 'absolute' }}>
          <Text style={[GlobalStyle.title, { fontSize: 60 }]}>Wel</Text>
          <Text style={[GlobalStyle.title, styles.text, { fontSize: 60 }]}>come</Text>
        </View>
        <View style={styles.forms}>
          <View style={styles.row}>
            <TextField
              image="user"
              style={{
                width: 300,
                marginBottom: 5,
                fontSize: 16,
                fontFamily: 'Comfortaa',
              }}
              placeholder="First Name"
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <TextField
              image="user"
              style={{
                width: 300,
                marginBottom: 5,
                fontSize: 16,
                fontFamily: 'Comfortaa',
              }}
              placeholder="Last Name"
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <TextField
              image="envelope"
              style={{
                width: 300,
                marginBottom: 5,
                fontSize: 16,
                fontFamily: 'Comfortaa',
              }}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <TextField
              image="key"
              style={{
                width: 300,
                marginBottom: 5,
                fontSize: 16,
                fontFamily: 'Comfortaa',
              }}
              placeholder="Password"
              // secureTextEntry={this.state.showPassword}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <TextField
              image="key"
              style={{
                width: 300,
                marginBottom: 5,
                fontSize: 16,
                fontFamily: 'Comfortaa',
              }}
              placeholder="Confirm Password"
              // secureTextEntry={this.state.showPassword}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              value={this.state.confirmPassword}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={[GlobalStyle.pillButton, GlobalStyle.shadow, { width: Constant.MAX_WIDTH / 1.5 }]} onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.createText}> Create Account </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={[styles.text, styles.textFont]}> Sign In </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  forms: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35
  },
  title: {
    fontSize: 72,
    fontFamily: 'Comfortaa_Bold',
    letterSpacing: 10,
  },
  text: {
    color: Constant.COLORS.MAROON,
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 20
  },
  icon: {
    height: 20,
    width: 20
  },
  createText: {
    color: "#fff",
    fontFamily: 'Comfortaa_Bold',
    fontSize: 24
  },
  textFont: {
    fontSize: 24,
  },
  greyText: {
    color: "grey",
    fontFamily: 'Comfortaa_Bold',
    marginBottom: 15
  },
  // row: {
  //   flexDirection: 'row',
  //   marginBottom: 15,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  button: {
    backgroundColor: Constant.COLORS.MAROON,
    paddingVertical: 10,
    paddingHorizontal: 45,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 180
  },
});
