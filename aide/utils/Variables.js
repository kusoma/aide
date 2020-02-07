import { Dimensions , StyleSheet } from 'react-native';

export const Constant = {
    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    COLORS: {
        MAROON: '#8B1D1D',
        SHADOW_COLOR: 'rgba(0,0,0,0.25)'
    }
}

export const GlobalStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20
    },
    form: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        margin: 16
    },
    formIcon: {
        width: 300,
        marginBottom: 5,
        fontSize: 16,
        fontFamily: 'Comfortaa',
    },
    pillButton: {
        backgroundColor: Constant.COLORS.MAROON,
        borderRadius: 50,
        width: Constant.MAX_WIDTH / 2,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillButtonText: {
		color: "#fff",
		fontFamily: 'Comfortaa',
		fontSize: 24
    },
    pillButtonSide: {
        backgroundColor: Constant.COLORS.MAROON,
        borderRadius: 50,
        width: Constant.MAX_WIDTH / 2,
        height: 60,
        left: Constant.MAX_WIDTH / 2 - 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillButtonSideText: {
        letterSpacing: -0.41,
        color: '#fff',
        fontSize: 24,
        right: 30,
        fontFamily: 'Comfortaa'
    },
    shadow: {
        shadowColor: Constant.COLORS.SHADOW_COLOR,
        shadowOffset: { width: 3, height: 8 },
        shadowOpacity: 0.8,
        shadowRadius: 12,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Comfortaa',
        color: Constant.COLORS.MAROON,
    },
    textField: {
        width: 300,
        marginBottom: 5,
        fontSize: 16,
        fontFamily: 'Comfortaa',
    },  
    title: {
        fontSize: 72,
        fontFamily: 'Comfortaa_Bold',
        letterSpacing: 10,
    },
    heading: {
        fontSize: 36,
        fontWeight: "bold",
        fontFamily: 'Comfortaa',
        color: Constant.COLORS.MAROON  
    }
});


