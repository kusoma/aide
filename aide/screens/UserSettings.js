import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Constant, GlobalStyle } from "../utils/Variables";
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
            editable={false}
          />
          <TextField
            image="user"
            style={GlobalStyle.formIcon}
            placeholder="Last Name"
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            editable={false}
          />
          <TextField
            image="envelope"
            style={GlobalStyle.formIcon}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            editable={false}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("ClassSettings")}>
            <Text style={{ color: Constant.COLORS.MAROON }}> Class Settings </Text>
          </TouchableOpacity>
        </View>

        <View style={{ margin: 16 }}>
          <WideButton label="Change Password" image="key" imageColor="#000" />
          <WideButton label="Connect Google" image="google" imageColor="#000" />
          <WideButton label="Connect Canvas" image="google" imageColor="#000" />
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