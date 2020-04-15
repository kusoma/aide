import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField } from '../components/Form';
import { WideButton } from '../components/Buttons';

export default class UserSettings extends Component {
	constructor (props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			email: navigation.getParam('email'),
			firstName: navigation.getParam('firstName'),
			lastName: navigation.getParam('lastName'),
			defaultStudyLength: navigation.getParam('defaultStudyLength'),
			defaultBreakLength: navigation.getParam('defaultBreakLength'),
		};
	}

	render () {
		return (
			<ScrollView contentContainerStyle={GlobalStyle.container}>
				<Text style={GlobalStyle.heading}>Account</Text>
				<View>
					<TextField image='user' style={GlobalStyle.formIcon} placeholder='First Name' onChangeText={firstName => this.setState({ firstName })} value={this.state.firstName} editable={false} />
					<TextField image='user' style={GlobalStyle.formIcon} placeholder='Last Name' onChangeText={lastName => this.setState({ lastName })} value={this.state.lastName} editable={false} />
					<TextField image='envelope' style={GlobalStyle.formIcon} placeholder='Email' onChangeText={email => this.setState({ email })} value={this.state.email} editable={false} />
				</View>

				<View style={{ marginTop: 30, marginHorizontal: 16 }}>
					<WideButton label='Change Password' image='key' imageColor='#000' />
					<WideButton label='Connect Canvas' image='google' imageColor='#000' />
					<WideButton label='Study Preferences' image='lightbulb-o' imageColor='#000' onPress={() => this.props.navigation.navigate('StudyPreference')} />
					<WideButton
						label='Log Out '
						buttonStyle={{
							backgroundColor: Constant.COLORS.MAROON,
							borderColor: '#8B1D1D',
						}}
						textStyle={{ color: '#fff' }}
						image='share'
						imageColor='#fff'
						onPress={() => this.props.navigation.navigate('Login')}
					/>
				</View>
			</ScrollView>
		);
	}
}
