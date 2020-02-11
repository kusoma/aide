import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Constant } from '../utils/Variables';

export const Title = ({first, second}) => (
    <View style={[styles.container]}>
        <Text style={[styles.title, { color: Constant.COLORS.MAROON }]}>{first}</Text>
        <Text style={styles.title}>{second}</Text>
    </View>
)

const styles = StyleSheet.create({ 
    container: {
        flexDirection: 'row',
        top: 125,
        position: 'absolute',
    },
    title: {
        fontSize: 72,
        fontFamily: 'Comfortaa_Bold',
        letterSpacing: 10,

    },
});