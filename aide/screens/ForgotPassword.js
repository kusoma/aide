import React, { Component } from 'react';
import {
   TouchableOpacity,
   Text,
   View,
   PanResponder,
   Animated } from 'react-native';
   import { TextField } from '../components/Form';
   import  { Title } from '../components/Title';
   import { WebModal } from '../components/Modal';
   import { Constant, GlobalStyle } from '../utils/Variables';
import { callResetPassword } from '../utils/API';


export default class app extends Component {
  constructor() {
    super();

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onPanResponderRelease: () => {
        if(this.state.changeScreen)
        {
            setTimeout(() => {
              position.setValue({ x: 0, y: 0})
              this.props.navigation.navigate('Login')
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

   handleResetPassword = () => {
      callResetPassword(this.state.email, {
        
      })
   }

    this.state = {
      email: "",
      position,
      panResponder,
      changeScreen: false,
    }
  }
  
  
  render() {
    const handles = this.state.panResponder.panHandlers;
    return (
      <Animated.View
        {...handles} 
        style={[GlobalStyle.container, this.state.position.getLayout()]}
      >
        <WebModal visible={true} url="www.google.com" />
        <Title first="AI" second="DE" />
        <View style={[GlobalStyle.form, GlobalStyle.shadow]}>
          <TextField
            image="envelope"
            style={GlobalStyle.formIcon}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={[GlobalStyle.pillButtonSide, { top: 30 }]} onPress={() => handleResetPassword()}>
          <Text style={GlobalStyle.pillButtonSideText}>Reset</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}