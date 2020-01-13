import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Signup: {screen: Signup},
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const App = createAppContainer(MainNavigator);

export default App;