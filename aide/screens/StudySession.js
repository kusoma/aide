import React, { Component } from 'react';
import { ScrollView, Text, View, StatusBar, Dimensions, Picker, Platform } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { WideButton } from '../components/Buttons';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
	timerIconOn: {},
	timerIconOff: {},
	timerIconBreak: {},
	breakHeading: {},
	timerHeading: {},
	breakText: {},
	timerText: {},
	buttonStart: {},
	buttonStop: {},
	buttonBreak: {},
	techniqueHeading: {},
	techniqueText: {}
});

export default class StudySession extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		isRunningBreak: false,
		isRunningTimer: true,
		remainingSecondsBreak: 0, // Set default techniques
		remainingSecondsTimers: 0, // Set default techniques
		setMinutesBreak: '0',
		setSecondsBreak: '0',
		selectedMinutesTimer: '0',
		selectedSecondsTimer: '0'
		// Set this to the most recent used technique
	};

	interval = null;

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
		return (
			<View>
				<Text style={GlobalStyle.heading}>Study</Text>
				<Text style={GlobalStyle.heading}>Session</Text>
			</View>
		);
	}
}
