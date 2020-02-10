import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from '../screens/Login'
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import UserSettings from '../screens/UserSettings';
import ClassSettings from '../screens/ClassSettings';

const BottomNavigator = createMaterialBottomTabNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={"calendar"} />
        </View>),
      tabBarColor: '#8B1D1D',
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={"tasks"} />
        </View>),
      tabBarColor: '#8B1D1D',
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={"lightbulb-o"} />
        </View>),
      tabBarColor: '#8B1D1D',
    }
  },
  ClassSettings: {
    screen: ClassSettings,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={"user"} />
        </View>),
      tabBarColor: '#8B1D1D',
    }
  }
},
  {
    labeled: false,
    activeColor: '#FFF',
    inactiveColor: '#C0C0C0',
  })


const App = createAppContainer(BottomNavigator);

export default App;