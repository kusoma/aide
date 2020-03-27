import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
    Clipboard,
    Alert
} from 'react-native';

import { WebView } from 'react-native-webview';

const Screen = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: Screen.height * 0.85,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: -1 },
    },
    loadingContainer: {
        position: 'absolute',
        top: 10,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    topBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    inputText: {
        color: '#3d3c41',
    },
});

export const EmbeddedCanvas = ({ url }) => (
    <View style={styles.container}>
        <WebView
            source={{ uri: 'https://canvas.apu.edu/login/saml' }}
            startInLoadingState
            renderLoading={() => (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        />
    </View>
);