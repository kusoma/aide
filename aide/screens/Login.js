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
			isErrorText: ''
		}
	}

	loginHandler() {
		const email = this.state.email;
		const password = this.state.password;

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
				this.setState({ isError: true })
				this.setState({ isErrorText: json.errors[0].message })
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
					<Text style={GlobalStyle.text}> Forgot password? </Text>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={[GlobalStyle.pillButtonSide, GlobalStyle.shadow, { top: 30 }]}
					onPress={() => this.loginHandler(this.state.email, this.state.password)}>
					<Text style={GlobalStyle.pillButtonSideText} > Sign In </Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
					<Text style={[GlobalStyle.text, { top: Constant.MAX_HEIGHT / 4 }]}> Create an Account </Text>
				</TouchableOpacity>

				{this.state.isError ? <ErrorText text={this.state.isErrorText} /> : <React.Fragment />}
			</ScrollView>
		);
	}
}
