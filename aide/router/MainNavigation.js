import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login'
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import UserSettings from '../screens/UserSettings';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  ForgotPassword: {screen: ForgotPassword},
  Signup: {screen: Signup},
  UserSettings: { screen: UserSettings },

}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }}
);

const App = createAppContainer(MainNavigator);

export default App;
