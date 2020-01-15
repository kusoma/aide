import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Constant } from "../utils/Variables";
import { Fonts } from "../utils/Fonts";
import { TextField } from "../components/Form";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>AI</Text>
        <Text style={styles.title}>DE</Text>
        <View style={styles.forms}>
          <TextField
            style={{
              width: 300,
              marginBottom: 20
            }}
            label="Email"
            placeholder="john.doe@example.com"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
          <TextField
            style={{
              width: 300,
              marginBottom: 20
            }}
            label="Password"
            secureTextEntry={this.state.showPassword}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("UserSettings")}
        >
          <Text style={styles.text}> User Settings </Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20
  },
  forms: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,10,1)",
    height: Constant.MAX_HEIGHT / 3.5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 2
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Comfortaa
  },
  text: {
    color: Constant.COLORS.MAROON
  }
});
