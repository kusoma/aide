import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Constant, GlobalStyle } from "../utils/Variables";
import { TextField } from "../components/Form";
import { WideButton } from "../components/Buttons";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      userName: ""
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={GlobalStyle.container}>
        <Text style={styles.title}>Account</Text>
        <TextField
          image="user"
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="First Name"
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
          autoCapitalize="words"
        />
        <TextField
          image="user"
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="Last Name"
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
          autoCapitalize="words"
        />
        <TextField
          image="user"
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="Username"
          onChangeText={userName => this.setState({ userName })}
          value={this.state.userName}
          autoCapitalize="none"
        />
        <TextField
          image="envelope"
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        />
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <WideButton label="Change Password" image="key" imageColor="#000" />
          <WideButton label="Connect Canvas" />
          <WideButton
            label="Connect Device Calendar"
            image="calendar-o"
            imageColor="#000"
          />
        </View>
        <WideButton
          // onPress={this.props.navigation.navigate("Login")}
          navigation={this.props.navigation}
          screenName="StudyPreferences"
          label="Study Preferences"
          image="lightbulb-o"
          imageColor="#000"
        />
        <WideButton
          label="Log Out "
          buttonStyle={{
            backgroundColor: Constant.COLORS.MAROON,
            borderColor: "#8B1D1D"
          }}
          textStyle={{ color: "#fff" }}
          image="share"
          imageColor="#fff"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  forms: {
    height: Constant.MAX_HEIGHT / 3.5,
    alignItems: "center",
    justifyContent: "center"
  },
  forms2: {
    height: Constant.MAX_HEIGHT / 3.5,
    paddingRight: Constant.MAX_HEIGHT / 12,
    paddingTop: 48
  },
  forms3: {
    height: Constant.MAX_HEIGHT / 3.5,
    paddingRight: Constant.MAX_HEIGHT / 7.3,
    paddingTop: 25
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    color: Constant.COLORS.MAROON
  },
  text: {
    color: Constant.COLORS.MAROON,
    paddingVertical: 6,
    fontSize: 17,
    marginBottom: 7
  },
  textlogout: {
    color: "white",
    paddingVertical: 6,
    fontSize: 17,
    marginBottom: 7
  }
});
