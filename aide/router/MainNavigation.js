import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BottomNavigation from './BottomNavigation';
import ClassSettings from '../screens/ClassSettings';
import EventDetail from '../screens/EventDetails';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login'
import Monthly from '../screens/MonthlyView';
import SignUp from '../screens/SignUp';
import StudyPreference from '../screens/StudyPreferences';
import StudySession from '../screens/StudySession';
import UserSettings from '../screens/UserSettings';
import Week from '../screens/WeeklyView';
import ConnectCanvas from "../screens/ConnectCanvas";


const MainNavigator = createStackNavigator({
  Login: { screen: Login},
  SignUp: { screen: SignUp},
  ForgotPassword: { screen: ForgotPassword},
  BottomNavigation: { screen: BottomNavigation },
  Monthly: { screen: Monthly},
  Week: { screen: Week},
  StudySession: {screen: StudySession},
  UserSettings: { screen: UserSettings },
  ClassSettings: { screen: ClassSettings },
  StudyPreference: { screen: StudyPreference},
  EventDetail: { screen: EventDetail },
  ConnectCanvas: {screen: ConnectCanvas}
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
);

const App = createAppContainer(MainNavigator);

export default App;
