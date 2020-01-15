import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { Constant } from "../utils/Variables";
import { Fonts } from "../utils/Fonts";
import { TextFieldSet } from "../components/AcountForms";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      Username: ""
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Account</Text>
        <Image
          style={{
            width: 115,
            height: 115,
            marginBottom: 60,
            position: "absolute",
            left: 235,
            top: 40
          }}
          source={require("../assets/profilePic.png")}
        />
        <View style={styles.forms}>
          <TextFieldSet
            style={{
              width: 350,
              marginBottom: 8
            }}
            label="First Name"
            placeholder="Johann"
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            autoCapitalize="none"
          />
          <TextFieldSet
            style={{
              width: 350,
              marginBottom: 8
            }}
            label="Last Name"
            placeholder="Schmidt"
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            autoCapitalize="none"
          />
          <TextFieldSet
            style={{
              width: 350,
              marginBottom: 8
            }}
            label="Username"
            placeholder="jschmidt17"
            onChangeText={Username => this.setState({ Username })}
            value={this.state.Username}
            autoCapitalize="none"
          />
          <TextFieldSet
            style={{
              width: 350,
              marginBottom: 8
            }}
            label="Email"
            placeholder="jschmidt17@apu.edu"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.forms2}>
          <Image
            source={require("../assets/Backsettings.png")}
            style={{
              position: "absolute",
              left: -30,
              top: 40
            }}
          />
          <Image
            source={require("../assets/Separator.png")}
            style={{
              position: "absolute",
              left: -30,
              top: 85
            }}
          />
          <Image
            source={require("../assets/keyIcon.png")}
            style={{
              width: 15,
              height: 15,
              position: "absolute",
              left: -17,
              top: 56
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserSettings")}
          >
            <Text style={styles.text}> Change Password </Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/googleIcon.png")}
            style={{
              width: 15,
              height: 15,
              position: "absolute",
              left: -17,
              top: 96
            }}
          />
          <TouchableOpacity>
            <Text style={styles.text}> Connect Google </Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/Separator.png")}
            style={{
              position: "absolute",
              left: -30,
              top: 125
            }}
          />
          <Image
            source={require("../assets/canvasIcon.png")}
            style={{
              width: 15,
              height: 15,
              position: "absolute",
              left: -17,
              top: 135
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserSettings")}
          >
            <Text style={styles.text}> Connect Canvas </Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/Separator.png")}
            style={{
              position: "absolute",
              left: -30,
              top: 161
            }}
          />
          <Image
            source={require("../assets/calendarIcon.png")}
            style={{
              width: 14,
              height: 14,
              position: "absolute",
              left: -17,
              top: 175
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserSettings")}
          >
            <Text style={styles.text}> Connect Device Calendar </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forms3}>
          <Image
            source={require("../assets/StudPrefBack.png")}
            style={{
              position: "absolute",
              left: -30,
              top: 22
            }}
          />
          <Image
            source={require("../assets/lightbulb.png")}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              left: -17,
              top: 30
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserSettings")}
          >
            <Text style={styles.text}> Study Preferences </Text>
          </TouchableOpacity>
          <View style={styles.forms3}>
            <Image
              source={require("../assets/logoutback.png")}
              style={{
                position: "absolute",
                left: -30,
                top: 22
              }}
            />
            <Image
              source={require("../assets/Logouticon.png")}
              style={{
                width: 13,
                height: 13,
                position: "absolute",
                left: -13,
                top: 35
              }}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("UserSettings")}
            >
              <Text style={styles.textlogout}> Log Out </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingVertical: 30
  },
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
    fontFamily: Fonts.Comfortaa,
    paddingRight: Constant.MAX_HEIGHT * 0.3,
    marginBottom: 60,
    paddingTop: 100,
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
