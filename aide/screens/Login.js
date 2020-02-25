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
      password: "",
      showPassword: true,
      isError: false,
      isErrorText: "",
      defaultStudyLength: 25,
      defaultBreakLength: 5,
      defaultTechnique: "Pomodoro"
    };
  }

  loginHandler() {
    const email = this.state.email;
    const password = this.state.password;

    let request = {
      query: `
			  query {
				login(email: "${email}", password: "${password}") {
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
        let user = {
          firstName: json.data.login.firstName,
          lastName: json.data.login.lastName,
          email: json.data.login.email,
          defaultBreakLength: json.data.login.defaultBreakLength,
          defaultStudyLength: json.data.login.defaultStudyLength,
          defaultTechnique: json.data.login.defaultTechnique
        };
        console.log(user.defaultBreakLength);
        console.log(user.defaultStudyLength);
        console.log(user.defaultTechnique);

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
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Text style={GlobalStyle.text}> Forgot password? </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[GlobalStyle.pillButtonSide, GlobalStyle.shadow, { top: 30 }]}
          onPress={() =>
            this.loginHandler(this.state.email, this.state.password)
          }
        >
          <Text style={GlobalStyle.pillButtonSideText}> Sign In </Text>
        </TouchableOpacity>
        {this.state.isError ? (
          <ErrorText text={this.state.isErrorText} />
        ) : (
          <ErrorText text={""} />
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
