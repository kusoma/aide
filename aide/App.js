import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Forgotpassword from './screens/Forgotpassword';
import UserSettings from './screens/UserSettings';

const MainNavigator = createStackNavigator({
  UserSettings: { screen: UserSettings },
  Login: {screen: Login},
  Forgotpassword: {screen: Forgotpassword},
  Signup: {screen: Signup},

}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }}
);

const App = createAppContainer(MainNavigator);

export default App;
