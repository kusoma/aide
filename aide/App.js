import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Forgotpassword from './screens/Forgotpassword';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Forgotpassword: {screen: Forgotpassword},
  Signup: {screen: Signup},

}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const App = createAppContainer(MainNavigator);

export default App;