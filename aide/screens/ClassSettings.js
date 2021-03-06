import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField } from '../components/Form';
import { callGraphql } from '../utils/API';

export default class ClassSettings extends Component {
	constructor (props) {
		super(props);
		this.state = {
			automate: '',
			quizTime: '',
			examTime: '',
			days: '',
		};
	}
	render () {
		const { navigation } = this.props;
		return (
			<ScrollView contentContainerStyle={GlobalStyle.container}>
				<StatusBar barStyle='dark-content' />
				<View style={{ top: 125, position: 'absolute', marginBottom: 15 }}>
					<Text style={[ GlobalStyle.title, { fontSize: 35, color: 'black', letterSpacing: -0.02, fontWeight: '600' } ]}>Class Settings</Text>
				</View>
				<View style={{ marginBottom: 60 }}>
					<View style={{ marginBottom: 15 }}>
						<Text style={[ { color: '#0082E0', fontSize: 20 } ]}>{navigation.getParam('className')}</Text>
					</View>
					<TextField
						label='Automate Only'
						placeholder='Exams and Quizzes'
						//onChangeText={firstName => this.setState({ firstName })}
						value={this.state.automate}
						autoCapitalize='words'
					/>
					<TextField
						label='Study Session Time Default for Quiz'
						placeholder='1 hours.'
						//onChangeText={firstName => this.setState({ firstName })}
						value={this.state.quizTime}
						autoCapitalize='words'
					/>
					<TextField
						label='Study Session Time Default for Exams'
						placeholder='3 hours.'
						//onChangeText={firstName => this.setState({ firstName })}
						value={this.state.examTime}
						autoCapitalize='words'
					/>
					<TextField
						label='Days Sessions Can Occur'
						placeholder='Mon., Wed., Fri.'
						//onChangeText={firstName => this.setState({ firstName })}
						value={this.state.days}
						autoCapitalize='words'
					/>
				</View>

				<View style={{ flexDirection: 'row' }}>
					<View style={{ margin: 16, flexDirection: 'row' }}>
						<TouchableOpacity style={[ GlobalStyle.pillButton, { width: Constant.MAX_WIDTH / 2.5 } ]}>
							<Text style={GlobalStyle.pillButtonText}> Save </Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ GlobalStyle.cancelPillButton, { width: Constant.MAX_WIDTH / 2.5 } ]}>
							<Text style={GlobalStyle.pillButtonText}
									onPress={() => this.props.navigation.navigate("StudyPreference")}
							> Cancel </Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}
}
