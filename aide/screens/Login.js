import React, { Component } from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
   } from 'react-native';
import { Constant } from '../utils/Variables';
import { Fonts } from '../utils/Fonts';
import { TextField } from '../components/Form';

export default class Login extends Component {
  constructor()
  {
    super();
    this.state = {
      username: "",
      password: "",
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection:'row', top: 125, position: 'absolute' }}>
          <Text style={[styles.title, styles.titleLeft]}>AI</Text>
          <Text style={styles.title}>DE</Text>
        </View>
        <View style={styles.forms}> 
          <TextField
            style={{
                    width: 300,
                    marginBottom: 5,
                    fontSize: 18,
                  }}
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            autoCapitalize="none"
          />
          <TextField
            style={{
                width: 300,
                marginBottom: 5,
                fontSize: 18
              }}
            placeholder="Password"
            secureTextEntry={this.state.showPassword}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity> 
          <Text style={styles.text}> Forgot password or username? </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}> Sign In </Text>
        </TouchableOpacity>
        <TouchableOpacity> 
          <Text style={styles.text}> Create an Account </Text> 
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
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#000',
    height: Constant.MAX_HEIGHT / 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    
  },
  signInButton: {
    backgroundColor: Constant.COLORS.MAROON,
    width: Constant.MAX_WIDTH / 3,
    height: 47,
    justifyContent: 'center',
    alignContent: 'center',
  },
  signInButtonText: {
    letterSpacing: -0.41,
    color: '#fff',
    fontSize: 24,
  },
  title: {
      fontSize: 72,
      fontFamily: Fonts.Comfortaa,
      letterSpacing: 10,
  },
  titleLeft: {
    color: Constant.COLORS.MAROON,
  },
  text: {
    fontSize: 18,
    color: Constant.COLORS.MAROON,
  }
});
