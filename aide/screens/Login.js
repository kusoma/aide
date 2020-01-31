import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField, ErrorText, Aide } from '../components/Form';
import { callGraphql } from '../utils/API';

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			showPassword: true,
			isError: false,
		}
	}

	loginHandler(email, password) {
		let request = {
			query: `
			  query {
				login(email: "${email}", password: "${password}") {
				  firstName
				  lastName
				  email
				}
			  }
			`
		};
	
		callGraphql(request, (json) => {
			if (json.errors) {
				this.state.isError = true
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
				<Aide/>
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

				<TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
					<Text style={GlobalStyle.text}> Forgot password or username? </Text>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={[GlobalStyle.pillButtonSide, GlobalStyle.shadow, { top: 30 }]}
					onPress={() => this.loginHandler(this.state.email, this.state.password)}>
					<Text style={GlobalStyle.pillButtonSideText} > Sign In </Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text
						style={[GlobalStyle.text, { top: Constant.MAX_HEIGHT / 4 }]}
						onPress={() => this.props.navigation.navigate('SignUp')}> Create an Account </Text>
				</TouchableOpacity>

				{/* TODO: Double check on error message */}
				{this.state.isError ? <ErrorText text="Incorrect Email or Password" /> : <React.Fragment />}
			</ScrollView>
		);
	}
}
