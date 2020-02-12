import React, { Component } from 'react';
import { ScrollView,
   TouchableOpacity,
   Text,
   View,
   PanResponder,
   Animated } from 'react-native';
import { GlobalStyle } from '../utils/Variables';
import { TextField } from '../components/Form';
import  { Title } from '../components/Title';


export default class app extends Component {
  constructor() {
    super();

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onPanResponderRelease: () => {position.setValue({ x: 0, y: 0})},
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
         
          
          position.setValue({ x: gesture.dx, y: 0 });
      }
   });

    this.state = {
      email: "",
      position,
      panResponder
    }

  }
  
  render() {

    const handles = this.state.panResponder.panHandlers;

    return (
      <ScrollView contentContainerStyle={GlobalStyle.container}>
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
        <TouchableOpacity style={[GlobalStyle.pillButtonSide, { top: 30 }]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={GlobalStyle.pillButtonSideText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}