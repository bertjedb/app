import React, { Platform, StyleSheet, Dimensions } from 'react-native';
import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

export default StyleSheet.create({
    pointCard: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height - 120,
        width: Dimensions.get('window').width - 20,
        alignSelf: 'center'
    },

    pointCardRow: {
        flex: 1,
        flexDirection: 'row',
    },

    pointCardColumn: {
        flex: 1,
        flexDirection: 'column',
    },

    stampFilled: {
        margin: 14,
        height: 100,
        width: 100,
    },

    stampUnFilled: {
        margin: 14,
        height: 100,
        width: 100,
        opacity: 0.3
    },

    defaultBtn: {
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#FF6700'
    },

    RegistrateBackground: {
        backgroundColor: '#3BB222',
        height: Dimensions.get('window').height,
    },

    inputField: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        width: 300,
        height: 40
    },

    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});