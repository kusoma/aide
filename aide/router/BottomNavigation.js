import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

<<<<<<< HEAD
import MonthlyView from "../screens/MonthlyView";
import WeeklyView from "../screens/WeeklyView";
import SignUp from "../screens/SignUp";
import UserSettings from "../screens/UserSettings";
import { Constant } from "../utils/Variables";
import StudyPreferences from "../screens/StudyPreferences";
import StudySession from "../screens/StudySession"

const ICON_SIZE = 25;

const BottomNavigator = createMaterialBottomTabNavigator(
  {
    MonthlyView: {
      screen: MonthlyView,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={ICON_SIZE}
              name={"calendar"}
            />
          </View>
        ),
        tabBarColor: Constant.COLORS.MAROON
      }
    },
    WeeklyView: {
      screen: WeeklyView,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={ICON_SIZE}
              name={"tasks"}
            />
          </View>
        ),
        tabBarColor: Constant.COLORS.MAROON
      }
    },
    StudySession: {
      screen: StudySession,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={ICON_SIZE}
              name={"lightbulb-o"}
            />
          </View>
        ),
        tabBarColor: Constant.COLORS.MAROON
      }
    },
    UserSettings: {
      screen: UserSettings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={ICON_SIZE}
              name={"user"}
            />
          </View>
        ),
        tabBarColor: Constant.COLORS.MAROON
      }
    },
    StudyPreferences: {
      screen: StudyPreferences,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={ICON_SIZE}
              name={"user"}
            />
          </View>
        ),
        tabBarColor: Constant.COLORS.MAROON
      }
    }
  },
  {
    labeled: false,
    activeColor: "#FFF",
    inactiveColor: "#C0C0C0"
  }
=======
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import StudySession from '../screens/StudySession';
import ForgotPassword from '../screens/ForgotPassword';
import UserSettings from '../screens/UserSettings';
import ClassSettings from '../screens/ClassSettings';
import CustomStudySession from '../screens/CustomStudySession';

const BottomNavigator = createMaterialBottomTabNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Icon style={[{ color: tintColor }]} size={25} name={'calendar'} />
					</View>
				),
				tabBarColor: '#8B1D1D'
			}
		},
		ClassSettings: {
			screen: ClassSettings,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Icon style={[{ color: tintColor }]} size={25} name={'tasks'} />
					</View>
				),
				tabBarColor: '#8B1D1D'
			}
		},
		// SignUp: {
		//   screen: SignUp,
		//   navigationOptions: {
		//     tabBarIcon: ({ tintColor }) => (
		//       <View>
		//         <Icon style={[{ color: tintColor }]} size={25} name={"lightbulb-o"} />
		//       </View>),
		//     tabBarColor: '#8B1D1D',
		//   }
		// },
		StudySession: {
			screen: StudySession,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Icon style={[{ color: tintColor }]} size={25} name={'lightbulb-o'} />
					</View>
				),
				tabBarColor: '#8B1D1D'
			}
		},
		CustomStudySession: {
			screen: CustomStudySession,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Icon style={[{ color: tintColor }]} size={25} name={'user'} />
					</View>
				),
				tabBarColor: '#8B1D1D'
			}
		}
	},
	{
		labeled: false,
		activeColor: '#FFF',
		inactiveColor: '#C0C0C0'
	}
>>>>>>> feature/matts-branch
);

const App = createAppContainer(BottomNavigator);

export default App;
