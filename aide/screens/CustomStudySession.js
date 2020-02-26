import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Constant, GlobalStyle } from '../utils/Variables';
import { TextField } from '../components/Form';
import { callGraphql } from '../utils/API';

export default class CustomStudySession extends Component {
    constructor() {
        super();
        this.state = {
            studySessionLength: "",
            studyIntervalLength: "",
            breakLength: "",
            currentTechnique: "",
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={GlobalStyle.container}>
                <StatusBar barStyle="dark-content" />
                <View style={{ top: 125, position: 'absolute', marginBottom: 35 }}>
                    <Text style={[GlobalStyle.title, { fontSize: 30, color: "black", letterSpacing: -0.02, fontWeight: "600" }]}>Custom Study Session</Text>
                </View>
                <View style={{ marginBottom: 120 }}>
                    <View style={{ marginBottom: 75 }}>
                    </View>
                    <TextField
                        label="Study Session Length"
                        placeholder="2 hours"
                        onChangeText={studySessionLength => this.setState({ studySessionLength })}
                        value={this.state.studySessionLength}
                        autoCapitalize="words"
                    />
                    <TextField
                        label="Study Interval Length"
                        placeholder="25 mins."
                        onChangeText={studyIntervalLength => this.setState({ studyIntervalLength })}
                        value={this.state.studyIntervalLength}
                        autoCapitalize="words"
                    />
                    <TextField
                        label="Break Length"
                        placeholder="5 mins."
                        onChangeText={breakLength => this.setState({ breakLength })}
                        value={this.state.breakLength}
                        autoCapitalize="words"
                    />
                    <TextField
                        label="Current Technique"
                        placeholder="Pomodoro"
                        onChangeText={currentTechnique => this.setState({ currentTechnique })}
                        value={this.state.currentTechnique}
                        autoCapitalize="words"
                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ margin: 16, flexDirection: 'row' }}>
                        <TouchableOpacity style={[GlobalStyle.pillButton, { width: Constant.MAX_WIDTH / 2.5 }]}>
                            <Text style={GlobalStyle.pillButtonText}> Save </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[GlobalStyle.cancelPillButton, { width: Constant.MAX_WIDTH / 2.5 },]}>
                            <Text style={GlobalStyle.pillButtonText}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        );
    }
}
