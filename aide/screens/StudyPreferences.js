import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField } from '../components/Form';
import { WideButton } from '../components/Buttons';
import { callGraphql, callCanvas } from '../utils/API';

export default class Login extends Component {
	constructor (props) {
		super(props);
		const { navigation } = this.props;
		
		this.state = {
			defaultStudyLength: navigation.getParam('defaultStudyLength'),
			defaultBreakLength: navigation.getParam('defaultBreakLength'),
			defaultTechnique: navigation.getParam('defaultTechnique'),
			_id: navigation.getParam('_id'),
			courses: [],
			token: navigation.getParam('token') || '',
		};
	}
	async coursesHandler () {
		let calledCourses = null;
		console.log('here', this.state.token);
		
		const request = {
			function: 'courses',
			token: this.state.token
		  }

		callCanvas(request, courses => {
			console.log('------------------------', courses);
			
			if (courses.errors || !courses) {
				return;
			}
			calledCourses = courses;
			for (const course of calledCourses) {
				this.createCoursePreference(course, '5ea256bbab009911227360c9');
			}
		});
	}

	createCoursePreference (course, userID) {
		const request = {
			query: `
					mutation {
						createClassPreferences(classPreferenceInput: {
							user: "${userID}",
							peers: [],
							classId: ${course.id},
							className: "${course.name}",
							defaultStudyLength: 1000,
							defaultBreakLength: 10,
							defaultTechnique: "pomodoro",
						}) {
							user
							peers
							classId
							className
							defaultStudyLength
							defaultBreakLength
							defaultTechnique
						}
					}
					`,
		};

		callGraphql(request, json => {
			if (json.errors) {
				this.setState({ isError: true });
				this.setState({ isErrorText: json.errors[0].message });
			} else {
				const course = {
					...json.data.createClassPreferences,
				};

				this.setState(prevState => ({
					courses: [ ...prevState.courses, course ],
				}));
			}
		});
	}

	StudyPreferenceHandler () {
		defaultStudyLength = this.state.defaultStudyLength;
		defaultBreakLength = this.state.defaultBreakLength;
		defaultTechnique = this.state.defaultTechnique;
		_id = this.state._id;

		const request = {
			query: `
				mutation {
					setStudyPreference(
						userId: "${_id}",
						defaultStudyLength: ${defaultStudyLength},
						defaultBreakLength: ${defaultBreakLength},
						defaultTechnique: "${defaultTechnique}"

					)  {
						defaultStudyLength
						defaultBreakLength
						defaultTechnique
					}
				}
      		`,
		};

		// MAYBE: Essentially same function as login handler, maybe we coould combine them
		callGraphql(request, json => {
			if (json.errors) {
				this.setState({ isError: true });
				this.setState({ isErrorText: json.errors[0].message });
			} else {
				const user = {
					defaultBreakLength: json.data.setStudyPreference.defaultBreakLength,
					defaultStudyLength: json.data.setStudyPreference.defaultStudyLength,
					defaultTechnique: json.data.setStudyPreference.defaultTechnique,
				};
				this.props.navigation.navigate('StudyPreferences', user);
			}
		});
	}

	componentDidMount () {
		this.coursesHandler();
	}

	render () {
		return (
			<ScrollView contentContainerStyle={GlobalStyle.container}>
				<Text style={styles.title}>Study Preferences</Text>
				<View style={{ marginTop: 25 }}>
					<Text style={styles.Text}>Study Length</Text>
				</View>
				<TextField
					style={{
						width: 300,
						marginBottom: 5,
						fontSize: 16,
						fontFamily: 'Comfortaa',
					}}
					placeholder=''
					onChangeText={defaultStudyLength => this.setState({ defaultStudyLength })}
					value={`${this.state.defaultStudyLength}`}
					autoCapitalize='words'
					editable={true}
				/>

				<Text style={styles.Text}>Break Length</Text>
				<TextField
					style={{
						width: 300,
						marginBottom: 5,
						fontSize: 16,
						fontFamily: 'Comfortaa',
					}}
					placeholder=''
					onChangeText={defaultBreakLength => this.setState({ defaultBreakLength })}
					value={`${this.state.defaultBreakLength}`}
					autoCapitalize='words'
					editable={true}
				/>

				<Text style={styles.Text}>Default Technique</Text>
				<TextField
					style={{
						width: 300,
						marginBottom: 5,
						fontSize: 16,
						fontFamily: 'Comfortaa',
					}}
					placeholder='45 mins'
					onChangeText={email => this.setState({ email })}
					value={this.state.email}
					autoCapitalize='none'
				/>
				<View style={{ marginTop: 20, marginBottom: 20 }}>
					<Text style={styles.title2}>Classes to Automate</Text>
				</View>

				{this.state.courses ? (
					this.state.courses.map(course => {
						return (
							<WideButton
								key={course.classID}
								label={course.className.length > 30 ? `${course.className.substring(0, 30)}...` : course.className}
								onPress={() =>
									this.props.navigation.navigate('ClassSettings', {
										className: course.className,
									})}
							/>
						);
					})
				) : (
					<Text>Loading...</Text>
				)}

				<View style={{ marginTop: 15, marginBottom: 15 }}>
					<TouchableOpacity
						style={[
							GlobalStyle.pillButton,
							GlobalStyle.shadow,
							{
								width: Constant.MAX_WIDTH / 9,
								height: Constant.MAX_HEIGHT / 22,
							},
						]}
						onPress={() => this.StudyPreferenceHandler(this.state.defaultBreakLength, this.state.defaultStudyLength, this.state.defaultTechnique)}
					>
						<Text style={styles.textplus}> + </Text>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<TouchableOpacity
						style={[
							GlobalStyle.pillButton,
							GlobalStyle.shadow,
							{
								width: Constant.MAX_WIDTH / 4.5,
								height: Constant.MAX_HEIGHT / 22,
							},
						]}
					>
						<Text style={styles.textlogout}> Save </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							GlobalStyle.cancelPillButton,
							GlobalStyle.shadow,
							{
								width: Constant.MAX_WIDTH / 4.5,
								height: Constant.MAX_HEIGHT / 22,
							},
						]}
						onPress={() => this.props.navigation.navigate("BottomNavigation")}
					>
						<Text style={styles.textlogout}> Cancel </Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		fontFamily: 'Comfortaa',
		color: Constant.COLORS.MAROON,
	},
	title2: {
		fontSize: 26,
		fontWeight: 'bold',
		fontFamily: 'Comfortaa',
		color: Constant.COLORS.MAROON,
	},
	Text: {
		fontSize: 13,
		color: '#828282',
		fontFamily: 'Comfortaa',
	},
	textlogout: {
		color: 'white',
		paddingVertical: 6,
		fontSize: 17,
		marginBottom: 7,
	},
	textplus: {
		color: 'white',
		paddingVertical: 1,
		fontSize: 25,
		marginBottom: 7,
	},
});
