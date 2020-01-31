import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { 
  Constant, 
  GlobalStyle 
} from "../utils/Variables";
import { TextField } from "../components/Form";
import { WideButton } from "../components/Buttons";


export default class Login extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      email: navigation.getParam("email"),
      firstName: navigation.getParam("firstName"),
      lastName: navigation.getParam("lastName"),
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={GlobalStyle.container}>
        <Text style={GlobalStyle.heading}>Account</Text>
        <View>
          <TextField
            image="user"
            style={GlobalStyle.formIcon}
            placeholder="First Name"
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            autoCapitalize="words"
          />
          <TextField
            image="user"
            style={GlobalStyle.formIcon}
            placeholder="Last Name"
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            autoCapitalize="words"
          />
          <TextField
            image="envelope"
            style={GlobalStyle.formIcon}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
        </View>
        
        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <WideButton label="Change Password" image="key" imageColor="#000" />
          <WideButton label="Connect Google" image="google" imageColor="#000" />
          <WideButton label="Connect Canvas" />
          <WideButton label="Connect Device Calendar" image="calendar-o" imageColor="#000" />
        </View>
        
        <View>
          <WideButton label="Study Preferences" image="lightbulb-o" imageColor="#000" />
          <WideButton label="Log Out " buttonStyle={{ backgroundColor: Constant.COLORS.MAROON, borderColor: '#8B1D1D' }} textStyle={{ color: '#fff' }} image="share" imageColor="#fff" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
