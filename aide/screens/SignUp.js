import React, { Component } from 'react';
import { 
	ScrollView, 
	Text, 
	TouchableOpacity, 
	View, 
	StatusBar, 
	PanResponder,
	Animated } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField, ErrorText } from '../components/Form';
import { Title } from '../components/Title';
import { callGraphql } from '../utils/API';

export default class SignUp extends Component {
	constructor() {
		super();

		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
		  onPanResponderRelease: () => {
			if(this.state.changeScreen)
			{
				setTimeout(() => {
				  position.setValue({ x: 0, y: 0})
				  this.props.navigation.navigate('Login')
				}, 100);
			}
			else
			  position.setValue({ x: 0, y: 0})
		 },
		  onStartShouldSetPanResponder: () => true,
		  onPanResponderMove: (event, gesture) => {          
			  position.setValue({ x: gesture.dx, y: gesture.dy });
			  if(gesture.dx > (Constant.MAX_WIDTH * 0.3) || gesture.dx < -(Constant.MAX_WIDTH * 0.3))
				this.setState({ changeScreen: true })
		  }
	   });
	
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			isError: false,
			isErrorText: '',
			position,
			panResponder,
			changeScreen: false,
		}
	}

	signUpHandler() {
		firstName = this.state.firstName
		lastName = this.state.lastName
		email = this.state.email
		password = this.state.password
		confirmPassword = this.state.confirmPassword

		const request = {
			query: `
			mutation {
				createUser(userInput:{
					firstName:"${firstName}", 
					lastName:"${lastName}", 
					email:"${email}", 
					password:"${password}", 
					studyPreference: {
						studyLength: 30,
						breakLength: 5,
						technique: "Pomodoro"
					}
				})  {
					firstName
					lastName
					email
				}
			}`
		};

		// MAYBE: Essentially same function as login handler, maybe we coould combine them
		callGraphql(request, (json) => {
			if (json.errors) {
				this.setState({ isError: true })
				this.setState({ isErrorText: json.errors[0].message })
			} else {
				const user = {
					firstName: json.data.createUser.firstName,
					lastName: json.data.createUser.lastName,
					email: json.data.createUser.email
				}
				this.props.navigation.navigate('UserSettings', user);
			}
		})
	}

	render() {
		const handles = this.state.panResponder.panHandlers;
		return (
  <Animated.View {...handles} style={[GlobalStyle.container, this.state.position.getLayout()]}>
    <StatusBar barStyle="dark-content" />
    {/* MAYBE: turn this into a logo */}

    <Title first="Wel" second="come" />
				
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

    {this.state.isError ? <ErrorText text={this.state.isErrorText} /> : <></>}
  </Animated.View>
		);
	}
}