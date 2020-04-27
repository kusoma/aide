import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyle } from '../utils/Variables';
import { WeeklyViewList } from '../components/List';
import { callCanvas } from '../utils/API';

export default class WeeklyView extends Component {
	constructor (props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			data: [],
			token: navigation.getParam('canvasToken') || '',
		};
		
	}

	componentDidMount () {
		const request = {
			function: 'assignments',
			token: this.state.token
		}
		console.log('this is request', request);
		
		callCanvas(request , json => {
			if (json.errors || !json) {
				return;
			}
			this.setState({ data: json });
		});
	}

	render () {
		console.disableYellowBox = true;
		return (
			<ScrollView contentContainerStyle={[ GlobalStyle.container ]}>
				<Text style={[ { marginTop: 50, marginBottom: 30 }, styles.textStyle ]}> Daily Planner </Text>
				<WeeklyViewList data={this.state.data} />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	textStyle: {
		fontFamily: 'SF_Pro_Bold',
		fontWeight: '900',
		letterSpacing: 0.5,
		fontSize: 26,
	},
});
