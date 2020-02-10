import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login'
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import UserSettings from '../screens/UserSettings';
import ClassSettings from '../screens/ClassSettings';

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword },
  SignUp: { screen: SignUp },
  UserSettings: { screen: UserSettings },
  ClassSettings: { screen: ClassSettings }

}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
);

const App = createAppContainer(MainNavigator);

export default App;
