import React,
{ Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	StatusBar
} from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField, Ai } from '../components/Form';
import { callGraphql } from '../utils/API';

export default class SignUp extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		}
	}

	signUpHandler(firstName, lastName, email, password) {
		if (this.state.password.trim().length === 0 || this.state.confirmPassword.trim().length === 0 || this.state.password.trim() !== this.state.confirmPassword.trim()) {
			return;
		}

		let request = {
			query: `
			mutation {
				createUser(userInput:{firstName:"${firstName}", lastName:"${lastName}", email:"${email}",password:"${password}"})  {
					firstName
					lastName
					email
				}
			}`
		};

		// TODO: Essentially same function as login handler, maybe we coould combine them
		callGraphql(request, (json) => {
			if (json.errors) {

			} else {
				if (json.errors) {

				} else {
					let user = {
						firstName: json.data.login.firstName,
						lastName: json.data.login.lastName,
						email: json.data.login.email
					}
					this.props.navigation.navigate('UserSettings', user);
				}
			}
		})
	}


	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={{ flexDirection: 'row', top: 125, position: 'absolute' }}>
					<Text style={[GlobalStyle.title, { fontSize: 60 }]}>Wel</Text>
					<Text style={[GlobalStyle.title, styles.text, { fontSize: 60 }]}>come</Text>
				</View>
				<View style={styles.forms}>
						<TextField
							image="user"
							style={styles.image}
							placeholder="First Name"
							onChangeText={firstName => this.setState({ firstName })}
							value={this.state.firstName}
							autoCapitalize="none"
						/>
						<TextField
							image="user"
							style={styles.image}
							placeholder="Last Name"
							onChangeText={lastName => this.setState({ lastName })}
							value={this.state.lastName}
							autoCapitalize="none"
						/>

						<TextField
							image="envelope"
							style={styles.image}
							placeholder="Email"
							onChangeText={email => this.setState({ email })}
							value={this.state.email}
							autoCapitalize="none"
						/>
						<TextField
							image="key"
							style={styles.image}
							placeholder="Password"
							onChangeText={password => this.setState({ password })}
							value={this.state.password}
							autoCapitalize="none"
						/>
						<TextField
							image="key"
							style={styles.image}
							placeholder="Confirm Password"
							onChangeText={confirmPassword => this.setState({ confirmPassword })}
							value={this.state.confirmPassword}
							autoCapitalize="none"
						/>
				</View>

					<TouchableOpacity style={[GlobalStyle.pillButton, GlobalStyle.shadow, { width: Constant.MAX_WIDTH / 1.5 }]} onPress={() => this.handleSignUp()}>
						<Text style={styles.createText}> Create Account </Text>
					</TouchableOpacity>

				<TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
					<Text style={styles.text}> Sign In </Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20
	},
	forms: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 35
	},
	text: {
		color: Constant.COLORS.MAROON,
	},
	image: {
		width: 300,
		marginBottom: 5,
		fontSize: 16,
		fontFamily: 'Comfortaa',
	},
	createText: {
		color: "#fff",
		fontFamily: 'Comfortaa_Bold',
		fontSize: 24
	},
});
