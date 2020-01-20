import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login'
import Signup from '../screens/Signup';
import Forgotpassword from '../screens/Forgotpassword';
import UserSettings from '../screens/UserSettings';

import MonlthyView from '../screens/MonthlyView';

const MainNavigator = createStackNavigator({
  Monthly: {screen: MonlthyView},
  Login: {screen: Login},
  Forgotpassword: {screen: Forgotpassword},
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
