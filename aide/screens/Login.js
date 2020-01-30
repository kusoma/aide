import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { 
  Constant, 
  GlobalStyle 
} from '../utils/Variables';
import { 
  TextField, 
  ErrorText 
} from '../components/Form';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showPassword: true,
      iserror: false,
    }
  }

   handleLogin(userEmail, userPassword) {
    let requestBody = {
      query: `
        query {
          login(email: "${userEmail}", password: "${userPassword}") {
            firstName
            lastName
            email
          }
        }
      `
    };
  
    fetch('http://localhost:3000/api?', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        // throw new Error('Failed!');
        this.state.email = "Invalid Credentials"
      }
      return res.json();
    })
    .then(resData => {
      if (resData.errors) {
        this.state.iserror = true;
        this.state.email = resData.errors.message;
      } else {
        console.log(resData);
        console.log(resData.data);
        let info = {
          firstName: resData.data.login.firstName,
          lastName: resData.data.login.lastName,
          email: resData.data.login.email
        }
        this.props.navigation.navigate('UserSettings', info)
      }
    })
    .catch(err => {
      console.log('this is error ',err);
    });
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: 'row', top: 125, position: 'absolute' }}>
          <Text style={[GlobalStyle.title, styles.titleLeft]}>AI</Text>
          <Text style={GlobalStyle.title}>DE</Text>
        </View>
        <View style={[styles.forms, GlobalStyle.shadow]}>
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
          <TextField
            image="key"
            style={{
              width: 300,
              marginBottom: 5,
              fontSize: 16,
              fontFamily: 'Comfortaa',
            }}
            placeholder="Password"
            secureTextEntry={this.state.showPassword}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text style={styles.text}> Forgot password or username? </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signInButton, GlobalStyle.shadow, {top: 30 }]} onPress={() => this.handleLogin(this.state.email, this.state.password)}>
          <Text style={styles.signInButtonText} > Sign In </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.text, { top: Constant.MAX_HEIGHT / 4 }]} onPress={() => this.props.navigation.navigate('SignUp')}> Create an Account </Text>
        </TouchableOpacity>
        { this.state.iserror ?
                <ErrorText text="Incorrect Email or Password" />
            :
            <React.Fragment />
        }

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
    height: Constant.MAX_HEIGHT / 5.5,
    justifyContent: 'center',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: Constant.COLORS.MAROON,
    borderRadius: 50,
    width: Constant.MAX_WIDTH / 2,
    height: 60,
    left: Constant.MAX_WIDTH / 2 - 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  signInButtonText: {
    letterSpacing: -0.41,
    color: '#fff',
    fontSize: 24,
    left: 30,
    fontFamily: 'Comfortaa'
  },
  titleLeft: {
    color: Constant.COLORS.MAROON,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Comfortaa',
    color: Constant.COLORS.MAROON,
  }
});
