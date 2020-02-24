//prettier-ignore-start
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { Ionicons } from '@expo/vector-icons';

import Row from '../components/Row';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: `#ffffff`,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	settingsIcon: {
		color: '#000',
		position: 'absolute',
		right: 25,
		top: 60,
	},
	mainHeading: {
		paddingTop: 50,
	},
	timerIconOff: {
		tintColor: '#000',
		top: screen.height / 4.5,
	},
	timerIconBreak: {
		tintColor: '#25BA0C',
		top: screen.height / 4.5,
	},
	timerIcon: {
		tintColor: Constant.COLORS.MAROON,
		alignItems: 'center',
	},
	breakHeading: {
		fontFamily: 'Comfortaa',
		fontSize: 20,
	},
	breakText: {
		fontFamily: 'Comfortaa_Bold',
		fontSize: 24,
	},
	timerText: {
		fontFamily: 'Comfortaa',
		fontSize: 40,
		color: '#000',
	},
	button: {},
	techniqueHeading: {
		fontFamily: 'Comfortaa',
		fontSize: 20,
	},
	techniqueText: {
		fontFamily: 'Comfortaa_Bold',
		fontSize: 24,
	},
});

// ******TODO CHANGE TO API START ******
const sessionTechnique = 'pomodoro';
const defaultTechnique = 'pomodoro';
const SECONDS_TIL_BREAK = 10;
const BREAK_LENGTH = 60; // SECONDS
const START_TIME = new Date('2020-02-17T13:00:00.167Z');
const END_TIME = new Date('2020-02-17T14:00:00.167Z');
// ******TODO CHANGE TO API  END ******

const getRemaining = time => {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time - hours * 3600) / 60);
	const seconds = time - minutes * 60;
	return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const activeStatus = (totalTimeLeft, breakTimeLeft) => {
	if (breakTimeLeft > 0) {
		return { breakHeadingText: 'Break ends in', activeStatusColor: '#25BA0C' };
	} else if (totalTimeLeft > 0 && breakTimeLeft === 0) {
		return { breakHeadingText: 'Next break in', activeStatusColor: '#B10101' };
	} else {
		return { breakHeadingText: 'Breaks are every ', activeStatusColor: '#000' };
	}
};

const getTotalSessionTime = (startTime, endTime) => {
	let difference = endTime.getTime() - startTime.getTime();
	let secondsDifference = Math.floor(difference / 1000);
	console.log(secondsDifference);
	return secondsDifference;
};

const formatNumber = number => `0${number}`.slice(-2);

export default class StudySession extends Component {
	interval = null;

	state = {
		isRunningTimer: false,
		remainingSecondsBreak: 0, // Set default techniques
		remainingSecondsTimer: 0, // Set default techniques
		secondsToBreak: SECONDS_TIL_BREAK,
		numBreaks: 0, // Helps track what break are people on
		// Set this to the most recent used technique
	};

	componentDidUpdate (prevProp, prevState) {
		if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
			this.stop();
		}
	}

	componentWillUnmount () {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
	startTimer = () => {
		this.setState(state => ({
			remainingSecondsTimer: parseInt(getTotalSessionTime(START_TIME, END_TIME), 10),
			isRunningTimer: true,
			secondsToBreak: parseInt(SECONDS_TIL_BREAK, 10),
		}));
		// Start the count down. Every second subtract from the remaining seconds in the the state.
		this.interval = setInterval(() => {
			this.setState(state => ({
				remainingSecondsTimer: state.remainingSecondsTimer - 1,
			}));

			if (this.state.secondsToBreak >= 0) {
				//console.log(`secondsToBreak >= 0 ${this.state.secondsToBreak}`);
				this.setState(state => ({
					secondsToBreak: state.secondsToBreak - 1,
				}));
			} else if (this.state.secondsToBreak === 0) {
				//console.log('secondsToBreak === 0');
				this.setState({
					remainingSecondsBreak: parseInt(BREAK_LENGTH, 10),
				});
			} else if (this.state.remainingSecondsBreak >= 0) {
				//console.log('remainingSecondsBreak >= 0');
				this.setState(state => ({
					remainingSecondsBreak: state.remainingSecondsBreak - 1,
				}));
			} else if (this.state.remainingSecondsBreak === 0) {
				//console.log('remainingSecondsBreak === 0');
				this.setState({
					numBreaks: numBreaks++,
					secondsToBreak: parseInt(SECONDS_TIL_BREAK, 10),
				});
			} else {
				console.log('NOT WORKING BREAK TIMER');
			}
		}, 1000);
	};

	stop = () => {
		clearInterval(this.interval); // Clears interval to clear memory
		this.interval = null; // Make sure the inteval is null
		this.setState({
			isRunningTimer: false,
			remainingSecondsBreak: 0, // Set default techniques
			remainingSecondsTimer: 0, // Set default techniques
			secondsToBreak: SECONDS_TIL_BREAK,
			numBreaks: 0,
		});
	};

	render () {
		const { hours, minutes, seconds } = getRemaining(this.state.remainingSecondsTimer);

		const { breakHeadingText, activeStatusColor } = activeStatus(this.state.secondsToBreak, this.state.remainingSecondsBreak);

		const minutesBreak = getRemaining(this.state.remainingSecondsBreak).minutes;
		const secondsBreak = getRemaining(this.state.remainingSecondsBreak).seconds;

		const minutesToBreak = getRemaining(this.state.secondsToBreak).minutes;
		const secondsToBreak = getRemaining(this.state.secondsToBreak).seconds;

		console.log(`Break: ${minutesBreak}:${secondsBreak}s`);
		console.log(`toBreak: ${minutesToBreak}:${secondsToBreak}s`);

		return (
			<View style={styles.container}>
				{/* Make the bar dark */}
				<StatusBar barStyle='dark-content' />

				{/* Settings Icon on the right side */}
				<Ionicons name='ios-settings' size={32} style={styles.settingsIcon} />

				{/* Heading */}
				<View>
					<Row>
						<Text
							style={{
								...GlobalStyle.heading,
								...styles.mainHeading,
								color: '#000',
								fontFamily: 'Comfortaa_Bold',
							}}
						>
							study
						</Text>
						<Text
							style={{
								...GlobalStyle.heading,
								...styles.mainHeading,
								fontFamily: 'Comfortaa_Bold',
								color: activeStatusColor,
							}}
						>
							{' '}
							session
						</Text>
					</Row>
				</View>

				<View style={{ alignItems: 'center' }}>
					{/* Timer Icon */}
					<Image source={require('../assets/timer.png')} style={{ ...styles.timerIcon, tintColor: activeStatusColor }} />
					{/* TOTAL Seconds Text */}
					{this.state.isRunningTimer ? <Text style={styles.timerText}>{`${hours}:${minutes}:${seconds}s`}</Text> : <Text style={{ ...styles.timerText, fontSize: 24, fontFamily: 'Comfortaa_Bold', paddingTop: 20 }}>no active session</Text>}
				</View>

				<View style={{ alignItems: 'center' }}>
					{/* Break Text */}
					<Text style={styles.breakHeading}>{breakHeadingText}</Text>
					{/* BREAK Seconds Text */}
					<Text
						style={{
							...styles.breakText,
							color: activeStatusColor,
						}}
					>
						{this.state.remainingSecondsBreak > 0 ? `${minutesBreak}:${secondsBreak}s` : `${minutesToBreak}:${secondsToBreak}s`}
					</Text>
				</View>

				<View style={{ alignItems: 'center' }}>
					{/* Current Technique Text */}
					<Text style={styles.techniqueHeading}>Current Technique</Text>
					{/* Technique Text */}
					{this.state.isRunningTime ? (
						<Text
							style={{
								...styles.techniqueText,
								color: activeStatusColor,
							}}
						>
							{sessionTechnique}
						</Text>
					) : (
						<Text
							style={{
								...styles.techniqueText,
								color: activeStatusColor,
							}}
						>
							{defaultTechnique}
						</Text>
					)}
				</View>

				{/* End session button */}
				{this.state.isRunningTimer ? (
					<TouchableOpacity id='sessionButton' onPress={this.stop} style={{ ...GlobalStyle.pillButton, backgroundColor: activeStatusColor, fontFamily: 'Comfortaa_Bold' }}>
						<Text style={{ ...GlobalStyle.pillButtonText, ...styles.buttonStart }}>End Session</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity id='sessionButton' onPress={this.startTimer} style={{ ...GlobalStyle.pillButton, backgroundColor: activeStatusColor, fontFamily: 'Comfortaa_Bold' }}>
						<Text style={{ ...GlobalStyle.pillButtonText, ...styles.buttonStart }}>Start Session</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}
