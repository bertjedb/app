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
		actionButtonIcon: {
				fontSize: 20,
				height: 22,
				color: 'white',
		},
    pointCard: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height - 140,
        width: Dimensions.get('window').width - 0,
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
			marginTop: 30,
        borderRadius: 10,
        backgroundColor: '#FF6700'
    },

    rgstBtn: {
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#FF6700',
        width: 260,
        height: 40
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
        alignItems: 'center',
        backgroundColor: '#3BB222',
        margin: 50,
        },

    rgstTitle: {
        fontSize: 30,
        color: 'black',
        fontWeight: "bold",
        marginBottom: 30
    }
});
