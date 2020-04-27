import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField } from '../components/Form';
import { WideButton } from '../components/Buttons';
import { callGraphql } from '../utils/API';

export default class ConnectCanvas extends Component {
	constructor (props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			_id: navigation.getParam('_id'),
			canvasToken: navigation.getParam('canvasToken'),
		};
	}

	canvasTokenHandler () {
		canvasToken = this.state.canvasToken;
		_id = this.state._id;

		const request = {
			query: `
			mutation {
				setCanvasToken(
             		userId: "${_id}",
             		canvasToken: "${canvasToken}"
				)  {
            		canvasToken
				}
			  }
			  `,
		};

		console.log(canvasToken);

		callGraphql(request, json => {
			console.log(json);

			if (json.errors) {
				this.setState({ isError: true });
				this.setState({ isErrorText: json.errors[0].message });
			} else {
				const user = {
					canvasToken: json.data.setCanvasToken.canvasToken,
				};
				this.props.navigation.navigate('ConnectCanvas', user);
			}
		});
	}

	render () {
		return (
			<ScrollView contentContainerStyle={GlobalStyle.container}>
				<Text style={GlobalStyle.heading}>Connect Canvas</Text>
				<View>
					<TextField image='key' style={GlobalStyle.formIcon} placeholder='Get Token Below and Paste Here' onChangeText={canvasToken => this.setState({ canvasToken })} value={this.state.canvasToken} editable={true} />
				</View>

				<View style={{ marginTop: 15, marginBottom: 15, paddingVertical: 25 }}>
					<TouchableOpacity
						style={[
							GlobalStyle.pillButton,
							GlobalStyle.shadow,
							{
								width: Constant.MAX_WIDTH / 5,
								height: Constant.MAX_HEIGHT / 22,
							},
						]}
						onPress={() => this.canvasTokenHandler(this.state.canvasToken)}
					>
						<Text style={styles.textlogout}> Save </Text>
					</TouchableOpacity>
				</View>

				<View>
					<Text style={GlobalStyle.heading}> Get Token </Text>
				</View>

				<View style={{ marginTop: 15, marginBottom: 15, paddingVertical: 25 }}>
					<Text style={StyleSheet.Text}>Step 1: Click URL below and navigate to Approved Integrations </Text>
					<Text style={StyleSheet.Text}>Step 2: Create New Access Token </Text>
					<Text style={StyleSheet.Text}>Step 3: Set Purpose name to "AIDE" </Text>
					<Text style={StyleSheet.Text}>Step 4: Leave Expires blank </Text>
					<Text style={StyleSheet.Text}>Step 5: Copy and paste into Token Box above </Text>
					<Text style={StyleSheet.Text}>Step 6: Click "Save" </Text>
				</View>

				<View>
					<WideButton
						label='canvas.apu.edu/profile/settings'
						buttonStyle={{
							backgroundColor: Constant.COLORS.MAROON,
							borderColor: '#8B1D1D',
						}}
						textStyle={{ color: '#fff' }}
						image='share'
						imageColor='#fff'
						onPress={() => {
							Linking.openURL('https://canvas.apu.edu/profile/settings');
						}}
					/>
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
		fontSize: 17,
		color: '#828282',
		fontFamily: 'Comfortaa',
	},
	Text2: {
		fontSize: 17,
		color: Constant.COLORS.MAROON,
		fontFamily: 'Comfortaa',
	},
	textlogout: {
		color: 'white',
		paddingVertical: 6,
		fontSize: 17,
		marginBottom: 7,
	},
});
