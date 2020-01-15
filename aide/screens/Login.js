import React, { Component } from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Font from 'expo-font';
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

  async componentDidMount()
  {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa_Regular.ttf'),
      'Comfortaa_Bold': require('../assets/fonts/Comfortaa_Bold.ttf'),
    });
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgotpassword')}> 
          <Text style={styles.text}> Forgot password or username? </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signInButton, {top: 30 }]}>
          <Text style={styles.signInButtonText}> Sign In </Text>
        </TouchableOpacity>
        <TouchableOpacity> 
          <Text style={[styles.text, { top: Constant.MAX_HEIGHT / 4  }]}> Create an Account </Text> 
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
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    height: Constant.MAX_HEIGHT / 3.5,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    marginBottom: 4
  },
  signInButton: {
    backgroundColor: Constant.COLORS.MAROON,
    borderRadius: 50,
    width: Constant.MAX_WIDTH / 2,
    height: 60,
    left: Constant.MAX_WIDTH / 2 - 30,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: 'rgba(0,0,0,0.25)',
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
