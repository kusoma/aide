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
			courses: null,
		};
	}
	async coursesHandler () {
		let calledCourses = null;

		callCanvas('courses', courses => {
			if (courses.errors || !courses) {
				console.log('Courses Errors: ' + courses.errors);
				return;
			}
			calledCourses = courses;
			console.log('calledCourses ' + JSON.stringify(calledCourses));
			for (const course of calledCourses) {
				console.log('forlooping');
				this.createCoursePreference(course, '5e9393146b4c621e9b49e092');
			}
		});
	}

	checkCoursePreference (classID, userID) {
		console.log('CHECKING');
		let classExist = false;
		const request = {
			query: `
				query {
					checkPreference(user: "${userID}", classID: "${classID}") {
						_id
					}
				}
				`,
		};

		callGraphql(request, json => {
			if (json.errors) {
				this.setState({ isError: true });
				this.setState({ isErrorText: json.errors[0].message });
			} else {
				classExist = json.data.checkPreference;
			}
		});

		return classExist;
	}

	async createCoursePreference (course, userID) {
		const classExist = this.checkCoursePreference(course.id, userID);
		console.log('STARTING TO CREATE');
		if (classExist) return null;
		console.log('CONT TO CREATE');
		//console.log('COURSEE ' + JSON.stringify(course));
		const request = {
			query: `
				mutation {
					createClassPreferences(classPreferenceInput: {
						user: "${userID}"
						classID: ${course.id},
						className: "${course.name}",
						defaultStudyLength: ${this.state.defaultStudyLength},
						defaultBreakLength: ${this.state.defaultBreakLength},
						defaultTechnique: "${this.state.defaultTechnique}",
					}) {
						user
						classID
						className
						defaultStudyLength
						defaultBreakLength
						defaultTechnique
					}
				}
				`,
		};

		await callGraphql(request, json => {
			console.log('THE GRP');
			if (json.errors) {
				this.setState({ isError: true });
				this.setState({ isErrorText: json.errors[0].message });
				console.log('eorro' + this.state.isErrorText);
			} else {
				console.log('WORKS');
				const course = {
					...json.data.createClassPreferences,
				};
				console.log(JSON.stringify(course));
				this.setState(prevState => ({
					courses: [ ...prevState.courses, course ],
				}));
				created = true;
			}
		});

		return true;
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
						userID: "${_id}",
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

				<Text style={styles.Text}>defaultTechnique</Text>

				<TextField
					style={{
						width: 300,
						marginBottom: 5,
						fontSize: 16,
						fontFamily: 'Comfortaa',
					}}
					placeholder=''
					onChangeText={defaultTechnique => this.setState({ defaultTechnique })}
					value={this.state.defaultTechnique}
					autoCapitalize='none'
					editable={true}
				/>

				<Text style={styles.Text}>Rest After Each Session</Text>

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
						return <WideButton label={course.name} onPress={() => this.props.navigation.navigate('ClassSettings')} />;
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
