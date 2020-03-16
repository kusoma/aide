import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Picker,
    TouchableOpacity
} from "react-native";

import { Constant, GlobalStyle } from "../utils/Variables";
import { TextField } from "../components/Form";
import { WideButton } from "../components/Buttons";

export default class EventDetails extends Component {
    constructor() {
        super();
        this.state = {
            eventLink: "",
            className: "",
            sessionType: "",
            date: "",
            reminder: "",
            notes: "",
            repeatEvent: "",
        };
    }

    render() {
        return (
            <ScrollView style={{ marginLeft: 10, marginTop: 50 }}>
                <Text style={styles.title}>Event Details</Text>

                <View style={{ marginTop: 25 }}>
                    <Text style={styles.text}>Class</Text>

                    <TextField
                        style={{
                            width: 300,
                            marginBottom: 5,
                            fontSize: 16,
                            fontFamily: "Comfortaa"
                        }}
                        placeholder="Class name"
                        onChangeText={className => this.setState({ className })}
                        value={this.state.className}
                        autoCapitalize="words"
                    />
                </View>

                <View style={{ marginTop: 25 }}>
                    <Text style={styles.text}>Type of Session</Text>
                    <TextField
                        style={{
                            width: 300,
                            marginBottom: 5,
                            fontSize: 16,
                            fontFamily: "Comfortaa"
                        }}
                        placeholder="Session type"
                        onChangeText={sessionType => this.setState({ sessionType })}
                        value={this.state.sessionType}
                        autoCapitalize="words"
                    />
                </View>

                <View style={{ marginTop: 25 }}>

                    <Text style={styles.text}>Date</Text>

                    <TextField
                        style={{
                            width: 300,
                            marginBottom: 5,
                            fontSize: 16,
                            fontFamily: "Comfortaa"
                        }}
                        placeholder="Change to automatically be current date"
                        onChangeText={date => this.setState({ date })}
                        value={this.state.date}
                        autoCapitalize="none"
                    />
                </View>

                <View style={{ marginTop: 25 }}>

                    <Text style={styles.text}>Link to Event</Text>

                    <TextField
                        style={{
                            width: 300,
                            marginBottom: 5,
                            fontSize: 16,
                            fontFamily: "Comfortaa"
                        }}
                        placeholder="https://"
                        onChangeText={eventLink => this.setState({ eventLink })}
                        value={this.state.eventLink}
                        autoCapitalize="none"
                    />

                </View>

                <View style={{ marginTop: 25 }}>

                    <Text style={styles.text}>Reminder</Text>

                    <TextField
                        style={{
                            width: 300,
                            marginBottom: 5,
                            fontSize: 16,
                            fontFamily: "Comfortaa"
                        }}
                        placeholder="30 min before"
                        onChangeText={reminder => this.setState({ reminder })}
                        value={this.state.reminder}
                        autoCapitalize="none"
                    />
                </View>

                <View style={{ marginTop: 25 }}>
                    <Text style={styles.text}>Repeats</Text>

                    <TextField
                        style={{
                            width: 300,
                            marginBottom: 5,
                            fontSize: 16,
                            fontFamily: "Comfortaa"
                        }}
                        placeholder="Every Monday"
                        onChangeText={repeatEvent => this.setState({ repeatEvent })}
                        value={this.state.repeatEvent}
                        autoCapitalize="none"
                    />
                </View>

                <View style={{ marginTop: 25 }}>
                    <Text style={styles.text}>Notes</Text>

                    <TextField
                        style={{
                            width: 300,
                            marginBottom: 5,
                            fontSize: 16,
                            fontFamily: "Comfortaa"
                        }}
                        placeholder="Notes here"
                        onChangeText={notes => this.setState({ notes })}
                        value={this.state.notes}
                        autoCapitalize="words"
                    />
                </View>

                <View style={{ marginTop: 25 }}>

                    <Text style={styles.text}>Peers</Text>

                    <WideButton label="Example Data" />
                    <WideButton label="Dr. Grissom" />
                    <WideButton label="Blake" />

                    <View style={{ marginTop: 15, marginBottom: 15 }}>
                        <TouchableOpacity
                            style={[
                                GlobalStyle.pillButton,
                                GlobalStyle.shadow,
                                {
                                    width: Constant.MAX_WIDTH / 9,
                                    height: Constant.MAX_HEIGHT / 22
                                }
                            ]}
                        >
                            <Text style={styles.textPlus}> + </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 25 }}>
                    <Text style={styles.text}>Settings</Text>

                    <WideButton label="Mute Alarm" />
                    <WideButton label="Auto-Collaboration" />
                    <WideButton label="Use Study Techniques" />
                </View>



                <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 25, marginBottom: 25 }}>
                    <TouchableOpacity
                        style={[
                            GlobalStyle.pillButton,
                            GlobalStyle.shadow,
                            {
                                width: Constant.MAX_WIDTH / 4.5,
                                height: Constant.MAX_HEIGHT / 22
                            }
                        ]}
                    >
                        <Text style={styles.textSave}> Save </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            GlobalStyle.pillButton,
                            GlobalStyle.shadow,
                            {
                                backgroundColor: "#828282",
                                width: Constant.MAX_WIDTH / 4.5,
                                height: Constant.MAX_HEIGHT / 22,
                            }
                        ]}
                    >
                        <Text style={styles.textCancel}> Cancel </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        fontWeight: "bold",
        fontFamily: "Comfortaa",
        color: Constant.COLORS.MAROON
    },
    text: {
        fontSize: 13,
        color: "#828282",
        fontFamily: "Comfortaa"
    },
    textSave: {
        color: "white",
        paddingVertical: 6,
        fontSize: 17,
        marginBottom: 6
    },
    textCancel: {
        color: "black",
        paddingVertical: 6,
        fontSize: 17,
        marginBottom: 6
    },
    textPlus: {
        color: "white",
        paddingVertical: 1,
        fontSize: 25,
        marginBottom: 7
    }
});