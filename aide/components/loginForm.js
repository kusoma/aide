import React, { Component } from 'react';
import { StyleSheet, TextField, ScrollView } from 'react-native';

export default class LoginForm extends Component ()
{
    state = {
        email: "",
        password: "",
        error: "",
        showPassword: true
      };

    render() {
        return(
          <ScrollView> 
            {/* <TextField
              label="Email"
              placeholder="john.doe@example.com"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              autoCapitalize="none"
            />
            <TextField
              style={{
              width: 300
            }}
              label="Password"
              secureTextEntry={this.state.showPassword}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              autoCapitalize="none"
            /> */}
          </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  