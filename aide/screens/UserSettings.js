import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Constant, GlobalStyle } from "../utils/Variables";
import { TextField } from "../components/Form";
import { WideButton } from "../components/Buttons";
import { callGraphql } from "../utils/API";

export default class UserSettings extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      email: navigation.getParam("email"),
      firstName: navigation.getParam("firstName"),
      lastName: navigation.getParam("lastName"),
      _id: navigation.getParam("_id")

    };
  }

  UserSettingsHandler() {
    
    firstName = this.state.firstName;
    lastName = this.state.lastName;
    _id = this.state._id
    
    console.log(firstName)
    console.log(lastName)
    console.log(_id)

    const request = {
			query: `
			mutation {
				setUserSettings(
          userID: "${_id}",
					firstName: "${firstName}",
					lastName: "${lastName}",

				)  {
            firstName
            lastName
        
				}
      }
      `
    };

    callGraphql(request, json => {
      console.log(json)

			if (json.errors) {
				this.setState({ isError: true }); 
        this.setState({ isErrorText: json.errors[0].message });

			} else {
				const user = {
          firstName: json.data.setUserSettings.firstName,
          lastName: json.data.setUserSettings.lastName,

        };
        this.props.navigation.navigate('UserSettings', user);
			}
		});
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
            editable={true}
          />
          <TextField
            image="user"
            style={GlobalStyle.formIcon}
            placeholder="Last Name"
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            editable={true}
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

        <View style={{ marginTop: 15, marginBottom: 15 }}>
          <TouchableOpacity
            style={[
              GlobalStyle.pillButton,
              GlobalStyle.shadow,
              {
                width: Constant.MAX_WIDTH / 5,
                height: Constant.MAX_HEIGHT / 22
              }
            ]}
            onPress={() => this.UserSettingsHandler(this.state.firstName, this.state.lastName)}
          >
            <Text style={styles.textlogout}> Save </Text>
          </TouchableOpacity>
        </View>


        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ClassSettings")}
          >
            <Text style={GlobalStyle.heading}> Class Settings </Text>
          </TouchableOpacity>
        </View>

        <View style={{ margin: 16 }}>
          <WideButton label="Change Password" image="key" imageColor="#000" />
          <WideButton label="Connect Canvas" image="google" imageColor="#000" />
          
        </View>

        <View>
          <WideButton
            label="Study Preferences"
            image="lightbulb-o"
            imageColor="#000"
            onPress={() => this.props.navigation.navigate('StudyPreference')}
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
            onPress={() => this.props.navigation.navigate('Login')}
          />
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
