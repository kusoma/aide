import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity
} from "react-native";

import { Constant, GlobalStyle } from "../utils/Variables";
import { TextField } from "../components/Form";
import { WideButton } from "../components/Buttons";
import ModalSelector from "react-native-modal-selector";
import DropdownMenu from "react-native-dropdown-menu";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      textInputValue: "",
      text: ""
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={GlobalStyle.container}>
        <Text style={styles.title}>Study Preferences</Text>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.Text}>Study Length</Text>
        </View>
        <TextField
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="30 mins"
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
          autoCapitalize="words"
        />

        <Text style={styles.Text}>Break Length</Text>
        <TextField
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="5 mins"
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
          autoCapitalize="words"
        />

        <Text style={styles.Text}>Technique</Text>

        <TextField
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="Pomodoro"
          onChangeText={userName => this.setState({ userName })}
          value={this.state.userName}
          autoCapitalize="none"
        />

        <Text style={styles.Text}>Rest After Each Session</Text>

        <TextField
          style={{
            width: 300,
            marginBottom: 5,
            fontSize: 16,
            fontFamily: "Comfortaa"
          }}
          placeholder="45 mins"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        />
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.title2}>Classes to Automate</Text>
        </View>

        <WideButton label="CS125 - Intro to Computer Science" />
        <WideButton label="UBBL110 - World Religions" imageColor="#000" />
        <WideButton label="MATH350 - Diff Equations" />

        <View style={{ marginTop: 15, marginBottom: 15 }}>
          <TouchableOpacity
            style={[
              GlobalStyle.pillButton,
              GlobalStyle.shadow,
              {
                width: Constant.MAX_WIDTH / 9,
                height: Constant.MAX_HEIGHT / 22
              }
            ]}
          >
            <Text style={styles.textplus}> + </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[
              GlobalStyle.pillButton,
              GlobalStyle.shadow,
              {
                width: Constant.MAX_WIDTH / 4.5,
                height: Constant.MAX_HEIGHT / 22
              }
            ]}
          >
            <Text style={styles.textlogout}> Save </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              GlobalStyle.pillButtonWhite,
              GlobalStyle.shadow,
              {
                width: Constant.MAX_WIDTH / 4.5,
                height: Constant.MAX_HEIGHT / 22
              }
            ]}
          >
            <Text style={styles.textlogout}> Cancel </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    color: Constant.COLORS.MAROON
  },
  title2: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    color: Constant.COLORS.MAROON
  },
  Text: {
    fontSize: 13,
    color: "#828282",
    fontFamily: "Comfortaa"
  },
  textlogout: {
    color: "white",
    paddingVertical: 6,
    fontSize: 17,
    marginBottom: 7
  },
  textplus: {
    color: "white",
    paddingVertical: 1,
    fontSize: 25,
    marginBottom: 7
  }
});
