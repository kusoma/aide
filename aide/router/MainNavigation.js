import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import ForgotPassword from "../screens/Forgotpassword";
import UserSettings from "../screens/UserSettings";
import StudyPreferences from "../screens/StudyPreferences";

const MainNavigator = createStackNavigator(
  {
    //  Login: { screen: Login },
    //  ForgotPassword: { screen: ForgotPassword },
    //  Signup: { screen: Signup },
    //  UserSettings: { screen: UserSettings },
    StudyPreferences: { screen: StudyPreferences }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
