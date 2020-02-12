import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/Login'
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import UserSettings from '../screens/UserSettings';
import ClassSettings from '../screens/ClassSettings';
import BottomNavigation from './BottomNavigation';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  ForgotPassword: {screen: ForgotPassword},
  SignUp: {screen: SignUp},
  UserSettings: { screen: UserSettings },
  ClassSettings: { screen: ClassSettings },
  BottomNavigation: { screen: BottomNavigation},
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
);

const App = createAppContainer(MainNavigator);

export default App;
