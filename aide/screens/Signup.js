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
import { Constant } from '../utils/Variables';
import { Fonts } from '../utils/Fonts';
import { TextField } from '../components/SignUpForm';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>wel<Text style={styles.text}>come</Text></Text>
        <Image
          style={styles.image}
          source={require('../assets/Ellipse4.png')}
        />
        <Text style={styles.greyText}>
          Add a Photo
        </Text>
        <View style={styles.forms}>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={require('../assets/person.png')}
            />
            <TextField
              style={{
                width: 300,
              }}
              placeholder="First Name"
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={require('../assets/person.png')}
            />
            <TextField
              style={{
                width: 300,
              }}
              placeholder="Last Name"
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={require('../assets/person.png')}
            />
            <TextField
              style={{
                width: 300,
              }}
              placeholder="Username"
              onChangeText={userName => this.setState({ userName })}
              value={this.state.userName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={require('../assets/email.png')}
            />
            <TextField
              style={{
                width: 300,
              }}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={require('../assets/key.png')}
            />
            <TextField
              style={{
                width: 300,
              }}
              placeholder="Password"
              //secureTextEntry={this.state.showPassword}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={require('../assets/key.png')}
            />
            <TextField
              style={{
                width: 300,
              }}
              placeholder="Confirm Password"
              //secureTextEntry={this.state.showPassword}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              value={this.state.confimrPassword}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Login")}>
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
    fontSize: 60,
    fontFamily: Fonts.Comfortaa,
    marginTop: -30,
    marginBottom: 25
  },
  text: {
    color: Constant.COLORS.MAROON,
    fontSize: 60
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
    fontFamily: Fonts.Comfortaa,
    fontSize: 24
  },
  textFont: {
    fontSize: 24,
  },
  greyText: {
    color: "grey",
    fontFamily: Fonts.Comfortaa,
    marginBottom: 15
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Constant.COLORS.MAROON,
    paddingVertical: 10,
    paddingHorizontal: 45,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 180
  },
});
