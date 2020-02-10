import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, StatusBar, Dimensions, Picker, Platform, Image, TouchableOpacity } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { WideButton } from '../components/Buttons';
import { Ionicons } from '@expo/vector-icons';

import Row from '../components/Row';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: `#ffffff`,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	settingsIcon: {
		color: '#000',
		position: 'absolute',
		right: 25,
		top: 60
	},
	mainHeading: {
		alignItems: 'stretch',
		top: 100
	},
	timerIconOff: {
		tintColor: '#000',
		top: screen.height / 4.5
	},
	timerIconBreak: {
		tintColor: '#25BA0C',
		top: screen.height / 4.5
	},
	timerIconOn: {
		tintColor: Constant.COLORS.MAROON,
		alignItems: 'center'
		//top: screen.height / 4.5
	},
	breakHeading: {
		fontFamily: 'Comfortaa'
	},
	timerHeading: {
		fontFamily: 'Comfortaa'
	},
	breakText: {
		fontFamily: 'Comfortaa'
	},
	timerText: {
		fontFamily: 'Comfortaa',
		fontSize: 40,
		color: '#000'
	},
	buttonStart: {},
	buttonStop: {},
	buttonBreak: {},
	techniqueHeading: {
		fontFamily: 'Comfortaa'
	},
	techniqueText: {
		fontFamily: 'Comfortaa'
	}
});

const AVALIABLE_MINUTES = 12;
const AVALIABLE_SECONDS = 10;

const getRemaining = time => {
	const minutes = Math.floor(time / 60);
	const seconds = time - minutes * 60;
	const hours = Math.floor(minutes / 60);
	return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const activeStatus = (totalTimeLeft, breakTimeLeft) => {
	if (breakTimeLeft > 0) {
		return { breakHeadingText: 'Break ends in', activeStateColor: '#25BA0C' };
	} else if (totalTimeLeft > 0 && breakTimeLeft === 0) {
		return { breakHeadingText: 'Next break in', activeState: '#B10101' };
	} else {
		return { breakHeadingText: 'Breaks are every ', activeState: '#000' };
	}
};

const formatNumber = number => `0${number}`.slice(-2);

export default class StudySession extends Component {
	constructor(props) {
		super(props);
	}

	interval = null;

	state = {
		isRunningBreak: false,
		isRunningTimer: false,
		breakRemainingSeconds: 0, // Set default techniques
		remainingSecondsTimers: 0, // Set default techniques
		setMinutesBreak: '0',
		setSecondsBreak: '0',
		selectedMinutesTimer: '0',
		selectedSecondsTimer: '0',
		activeStatus: 0 // 0: not active, 1: Study Active, 2: Break Active
		// Set this to the most recent used technique
	};

	componentDidUpdate(prevProp, prevState) {
		if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
			this.stop();
		}
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
	startTimer = () => {
		this.setState(state => ({
			remainingSecondsTimer: parseInt(state.selectedMinutes) * 60 + parseInt(state.selectedSeconds, 10),
			isRunningTimer: true,
			remainingSecondsBreak: parseInt(state.selectedMinutes) * 60 + parseInt(state.selectedSeconds, 10),
			isRunningBreak: true
		}));
	};

	render() {
		const { hours, minutes, seconds } = getRemaining(this.state.remainingSeconds);

		const { breakHeadingText, activeStatusColor } = activeStatus(this.state.remainingSeconds, this.state.breakRemainingSeconds);

		const { hoursBreak, minutesBreak, secondsBreak } = getRemaining(this.state.remainingSeconds);

		return (
			<View style={styles.container}>
				{/* Make the bar dark */}
				<StatusBar barStyle='dark-content' />
				{/* Settings Icon on the right side */}
				<Ionicons name='ios-settings' size={32} style={styles.settingsIcon} />
				{/* Heading */}
				<Row>
					<Text style={{ ...GlobalStyle.heading, ...styles.mainHeading, color: '#000', fontFamily: 'Comfortaa_Bold' }}>study</Text>
					<Text style={{ ...GlobalStyle.heading, ...styles.mainHeading, fontFamily: 'Comfortaa_Bold', color: activeStatusColor }}> session </Text>
				</Row>
				<View style={{ alignItems: 'center' }}>
					{/* Timer Icon */}
					<Image source={require('../assets/timer.png')} style={styles.timerIconOn} />
					{/* TOTAL Seconds Text */}
					<Text style={styles.timerText}>{`${hours}:${minutes}:${seconds}s`}</Text>
				</View>
				<View style={{ alignItems: 'center' }}>
					{/* Break Text */}
					<Text style={styles.breakHeading}>{breakHeadingText}</Text>
					{/* BREAK Seconds Text */}
					<Text style={{ ...styles.breakText, color: activeStatusColor }}>{`${minutesBreak}:${secondsBreak}s`}</Text>
				</View>
				<View style={{ alignItems: 'center' }}>
					{/* Current Technique Text */}
					<Text style={styles.techniqueHeading}>Current Technique</Text>
					{/* Technique Text */}
					<Text style={{ ...styles.techniqueText, color: activeStatusColor }}>pomodoro</Text>
				</View>
				{/* End session button */}
				<TouchableOpacity id='sessionButton' onPress={this.start} style={{ ...GlobalStyle.pillButton, backgroundColor: activeStatusColor }}>
					<Text style={{ ...GlobalStyle.pillButtonText, ...styles.buttonStart }}>Start Session</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

// If the normal timer is running display the timer
//                 {this.state.isRunning ? <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text> : <Text style={styles.timerText}>No Active Session</Text>}
//                 {/* If the normal timer is running display the timer  */}
//                 {this.state.isRunning ? <Text style={styles.timerText}>{`${minutesBreak}:${secondsBreak}`}</Text> : <Text style={styles.timerText}>{`${minutesToBreak}:${secondsToBreak}`}</Text>}
//                 {/* */}
//                 {this.state.isRunning ? <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text> : <Text style={styles.timerText}>No Active Session</Text>}
//                 {/* */}
