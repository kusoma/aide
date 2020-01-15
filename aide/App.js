import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import UserSettings from "./screens/UserSettings";

const MainNavigator = createStackNavigator(
  {
    Signup: { screen: Signup },
    Login: { screen: Login },
    UserSettings: { screen: UserSettings }
    // Signup: {screen: Signup},
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
