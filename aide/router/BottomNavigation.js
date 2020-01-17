import React from 'react';
import { View, Image } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';

import Login from '../screens/Login'
import Signup from '../screens/Signup';
import Forgotpassword from '../screens/Forgotpassword';
import UserSettings from '../screens/UserSettings';

import Icons from '../utils/Icons';


const BottomNavigator = createMaterialBottomTabNavigator({
    Login: {screen: Login,
        navigationOptions:{    
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                <Image style={{width: 30, height: 30}} source={Icons.calendar} />  
              </View>),  
        }  
    },
    Forgotpassword: {screen: Forgotpassword, 
        navigationOptions:{    
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                <Image style={{width: 30, height: 30}} source={Icons.canvas} />  
              </View>),  
        }  },
    Signup: {screen: Signup,
        navigationOptions:{    
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                <Image style={{width: 20, height: 30}} source={Icons.lightBlub} />  
              </View>),  
        }  
    },
    UserSettings: { screen: UserSettings,
        navigationOptions:{    
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                <Image style={{width: 20, height: 30}} source={Icons.person} />  
              </View>),  
        }  
    },
    }, {
        labeled: false,
        activeColor: '#000',
        inactiveColor: '#000',
        barStyle: { backgroundColor: '#EAEAEA' },
    })


const App = createAppContainer(BottomNavigator);

export default App;