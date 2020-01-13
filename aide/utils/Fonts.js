import * as Font from 'expo-font';

export const Fonts = {
    async componentDidMount() {
        await Font.loadAsync({
          'Comfortaa': require('../assets/fonts/Comfortaa_Regular.ttf'),
          'Comfortaa_Bold': require('../assets/fonts/Comfortaa_Bold.ttf'),
    });
}
}