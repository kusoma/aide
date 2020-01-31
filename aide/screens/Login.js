import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField, ErrorText, Aide } from '../components/Form';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showPassword: true,
      isError: false,
    }
  }

  handleLogin(email, password) {
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
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
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          this.state.isError = true;
        } else {
          let info = {
            firstName: resData.data.login.firstName,
            lastName: resData.data.login.lastName,
            email: resData.data.login.email
          }
          this.props.navigation.navigate('UserSettings', info)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={GlobalStyle.container}>
        <Aide></Aide>
        <View style={[GlobalStyle.form, GlobalStyle.shadow]}>
          <TextField
            image="envelope"
            style={GlobalStyle.formIcon}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
          <TextField
            image="key"
            style={GlobalStyle.formIcon}
            placeholder="Password"
            secureTextEntry={this.state.showPassword}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text style={GlobalStyle.text}> Forgot password or username? </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[GlobalStyle.pillButtonSide, GlobalStyle.shadow, { top: 30 }]}
          onPress={() => this.handleLogin(this.state.email, this.state.password)}>
          <Text style={GlobalStyle.pillButtonSideText} > Sign In </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[GlobalStyle.text, { top: Constant.MAX_HEIGHT / 4 }]}
            onPress={() => this.props.navigation.navigate('SignUp')}> Create an Account </Text>
        </TouchableOpacity>
        {this.state.isError ? <ErrorText text="Incorrect Email or Password" /> : <React.Fragment />}
      </ScrollView>
    );
  }
}
