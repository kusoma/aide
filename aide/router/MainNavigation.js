import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

<<<<<<< HEAD
import Login from '../screens/Login'
=======
import Login from '../screens/Login';
>>>>>>> feature/matts-branch
import SignUp from '../screens/SignUp';
import StudySession from '../screens/StudySession';
import ForgotPassword from '../screens/ForgotPassword';
import UserSettings from '../screens/UserSettings';
import ClassSettings from '../screens/ClassSettings';
<<<<<<< HEAD
import BottomNavigation from './BottomNavigation';
import Week from '../screens/WeeklyView';
import Monthly from '../screens/MonthlyView';


const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  ForgotPassword: {screen: ForgotPassword},
  SignUp: {screen: SignUp},
  StudySession: {screen: StudySession},
  UserSettings: { screen: UserSettings },
  ClassSettings: { screen: ClassSettings },
  BottomNavigation: { screen: BottomNavigation },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
=======
import CustomStudySession from '../screens/CustomStudySession';

const MainNavigator = createStackNavigator(
	{
		Login: { screen: Login },
		ForgotPassword: { screen: ForgotPassword },
		SignUp: { screen: SignUp },
		StudySession: { screen: StudySession },
		UserSettings: { screen: UserSettings },
		ClassSettings: { screen: ClassSettings },
		CustomStudySession: { screen: CustomStudySession }
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
>>>>>>> feature/matts-branch
);

const App = createAppContainer(MainNavigator);

export default App;
