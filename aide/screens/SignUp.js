import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField, ErrorText } from '../components/Form';
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
			isError: false,
			isErrorText: ''
		}
	}

	signUpHandler() {
		firstName = this.state.firstName
		lastName = this.state.lastName
		email = this.state.email
		password = this.state.password
		confirmPassword = this.state.confirmPassword

		if (firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0) {
			this.setState({ isError: true })
			this.setState({ isErrorText: 'Fields cannot be empty!'})
		}

		if (password.trim() !== confirmPassword.trim()) {
			this.setState({ isError: true })
			this.setState({ isErrorText: 'Passwords do not match!'})
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

		// MAYBE: Essentially same function as login handler, maybe we coould combine them
		callGraphql(request, (json) => {
			if (json.errors) {

			} else {
				let user = {
					firstName: json.data.login.firstName,
					lastName: json.data.login.lastName,
					email: json.data.login.email
				}
				this.props.navigation.navigate('UserSettings', user);
			}

		})
	}

	render() {
		return (
			<ScrollView contentContainerStyle={GlobalStyle.container}>
				<StatusBar barStyle="dark-content" />
				{/* MAYBE: turn this into a logo */}
				<View style={{ flexDirection: 'row', top: 125, position: 'absolute' }}>
					<Text style={[GlobalStyle.title, { fontSize: 60 }]}>Wel</Text>
					<Text style={[GlobalStyle.title, { color: Constant.COLORS.MAROON, fontSize: 60 }]}>come</Text>
				</View>
				
				<View style={GlobalStyle.form}>
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
					<TextField
						image="key"
						style={GlobalStyle.formIcon}
						placeholder="Password"
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
						autoCapitalize="none"
					/>
					<TextField
						image="key"
						style={GlobalStyle.formIcon}
						placeholder="Confirm Password"
						onChangeText={confirmPassword => this.setState({ confirmPassword })}
						value={this.state.confirmPassword}
						autoCapitalize="none"
					/>
				</View>
				
				<TouchableOpacity style={[GlobalStyle.pillButton, {width: Constant.MAX_WIDTH / 1.5}]} onPress={() => this.signUpHandler()}>
					<Text style={GlobalStyle.pillButtonText}> Create Account </Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
					{/* TODO: Get this to match placement with 'Create an Account'  */}
					<Text style={{ color: Constant.COLORS.MAROON }}> Sign In </Text>
				</TouchableOpacity>

				{this.state.isError ? <ErrorText text={this.state.isErrorText} /> : <React.Fragment />}
			</ScrollView>
		);
	}
}