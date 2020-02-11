import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import MainNavigation from "./router/MainNavigation";
import Fonts from "./utils/Fonts"

const getFont = () => 
   Font.loadAsync({
    'Comfortaa': Fonts.Comfortaa,
    'Comfortaa_Bold': Fonts.Comfortaa_Bold,
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

 if(fontLoaded) {
   return ( <MainNavigation />);
 }  
   return (
     <AppLoading
       startAsync={getFont}
       onFinish={() => setFontLoaded(true)}
     />
    )

}