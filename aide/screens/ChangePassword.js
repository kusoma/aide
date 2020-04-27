import React, { Component } from 'react';
import {
   TouchableOpacity,
   Text,
   View,
   PanResponder,
   Animated } from 'react-native';
   import { TextField } from '../components/Form';
   import  { Title } from '../components/Title';
   import { Constant, GlobalStyle } from '../utils/Variables';
import { callResetPassword } from '../utils/API';
import Icon from "react-native-vector-icons/FontAwesome";


export default class app extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onPanResponderRelease: () => {
        if(this.state.changeScreen)
        {
            setTimeout(() => {
              position.setValue({ x: 0, y: 0})
            }, 100);
        }
        else
          position.setValue({ x: 0, y: 0})
     },
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {          
          position.setValue({ x: gesture.dx, y: gesture.dy });
          if(gesture.dx > (Constant.MAX_WIDTH * 0.3) || gesture.dx < -(Constant.MAX_WIDTH * 0.3))
            this.setState({ changeScreen: true })
      }
   });

    this.state = {
      email: navigation.getParam("email"),
      oldPassword: "",
      newPassword: "",
      message: "",
      position,
      panResponder,
      changeScreen: false,
    }
  }

  handleResetPassword = () => {
    const request = {
        email: this.state.email,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        isEmailSent: false
    }
    
    callResetPassword(request, json => {
      if (json.errors) {
          this.setState({ isError: true });
          this.setState({ isErrorText: json.errors[0].message });
          console.log(this.state.isErrorText);
          
        } 
      else {
          this.setState({ isError: true });
          this.setState({ isErrorText: "Password Sucessfully Reseted" });
          console.log(this.state.isErrorText);
          
      }

    })
 }
  
  
  render() {
    const handles = this.state.panResponder.panHandlers;
    return (
      <Animated.View
        {...handles} 
        style={[GlobalStyle.container, this.state.position.getLayout()]}
      >
        <Title first="AI" second="DE" />
        <View style={[GlobalStyle.form, GlobalStyle.shadow]}>
          <TextField
            image="key"
            style={GlobalStyle.formIcon}
            placeholder="Old Password"
            secureTextEntry={true}
            onChangeText={oldPassword => this.setState({ oldPassword })}
            value={this.state.oldPassword}
            autoCapitalize="none"
          />
          <TextField
            image="key"
            style={GlobalStyle.formIcon}
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={newPassword => this.setState({ newPassword })}
            value={this.state.newPassword}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={[GlobalStyle.pillButtonSide, { top: 30 }]} onPress={() => this.handleResetPassword()}>
          <Text style={GlobalStyle.pillButtonSideText}>Change</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}