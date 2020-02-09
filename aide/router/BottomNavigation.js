import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import MonthlyView from '../screens/MonthlyView';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import UserSettings from '../screens/UserSettings';
import { Constant } from '../utils/Variables';

const ICON_SIZE = 25;

const BottomNavigator = createMaterialBottomTabNavigator({
  MonthlyView: {
    screen: MonthlyView,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={ICON_SIZE} name={"calendar"} />
        </View>),
      tabBarColor: Constant.COLORS.MAROON,
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={ICON_SIZE} name={"tasks"} />
        </View>),
      tabBarColor: Constant.COLORS.MAROON,
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={ICON_SIZE} name={"lightbulb-o"} />
        </View>),
      tabBarColor: Constant.COLORS.MAROON,
    }
  },
  UserSettings: {
    screen: UserSettings,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={ICON_SIZE} name={"user"} />
        </View>),
      tabBarColor: Constant.COLORS.MAROON,
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