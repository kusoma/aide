import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Constant, GlobalStyle } from "../utils/Variables";
import { TextField, ErrorText } from "../components/Form";
import { Title } from "../components/Title";
import { callGraphql } from "../utils/API";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      showPassword: true,
      isError: false,
      isErrorText: "",
      defaultStudyLength: 25,
      defaultBreakLength: 5,
      defaultTechnique: "Pomodoro",
      _id: ""
    };
  }

  loginHandler() {
    const email = this.state.email;
    const password = this.state.password;

    const request = {
      query: `
			  query {
				login(email: "${email}", password: "${password}") {
          _id
          firstName
				  lastName
          email
          defaultStudyLength
          defaultBreakLength
          defaultTechnique
				}
			  }
			`
    };
    

    callGraphql(request, json => {
      if (json.errors) {
        this.setState({ isError: true });
        this.setState({ isErrorText: json.errors[0].message });
      } else {
        const user = {
          _id: json.data.login._id,
          firstName: json.data.login.firstName,
          lastName: json.data.login.lastName,
          email: json.data.login.email,
          defaultBreakLength: json.data.login.defaultBreakLength,
          defaultStudyLength: json.data.login.defaultStudyLength,
          defaultTechnique: json.data.login.defaultTechnique
        };
        
        this.props.navigation.navigate("BottomNavigation", user);
      }
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={GlobalStyle.container}>
        <Title first="AI" second="DE" />
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        >
          <Text style={GlobalStyle.text}> Forgot password? </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[GlobalStyle.pillButtonSide, GlobalStyle.shadow, { top: 30 }]}
          onPress={() =>
            this.loginHandler()}
        >
          <Text style={GlobalStyle.pillButtonSideText}> Sign In </Text>
        </TouchableOpacity>
        {this.state.isError ? (
          <ErrorText text={this.state.isErrorText} />
        ) : (
          <ErrorText text="" />
        )}
        <TouchableOpacity
          style={{ top: Constant.MAX_HEIGHT * 0.3 }}
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Text style={[GlobalStyle.text]}> Create an Account</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
