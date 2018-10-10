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

	container: {
			flex: 1,
		},

	card: {
			backgroundColor: '#FFFFFF',
			height: 390,
			margin: 10,
			borderRadius: 10,
			shadowOffset: {width: 0, height: 13},
	       shadowOpacity: 0.3,
	       shadowRadius: 6,
	       // android (Android +5.0)
	       elevation: 3,
		},

    cardGreen: {
        backgroundColor: '#93D500',
        margin: 10,
        borderRadius: 10,
        shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 3,
        },

	  SectionStyleTop: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#fff',
	    borderWidth: .5,
	    borderColor: '#000',
	    height: 40,
			borderTopLeftRadius: 5 ,
			borderTopRightRadius: 5 ,
		},

	SectionStyleBottom: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#fff',
	    borderWidth: .5,
	    borderColor: '#000',
	    height: 40,
	    borderRadius: 5 ,
			borderBottomRightRadius: 5 ,
		},

	SectionStyle: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#fff',
	    borderWidth: .5,
	    borderColor: '#000',
	    height: 40,
	    borderRadius: 5 ,
		},

		ImageStyle: {
		    margin: 5,
		    alignItems: 'center'
		},

    pointCard: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height - 135,
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
        marginTop: 0,
				marginBottom: 5,
				marginLeft: 5,
				marginRight: 5,
        height: 90,
        width: 90,
    },

	stamp: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		height: 90,
        width: 90,
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

    datePick: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#93D500',
        margin: 5,
        marginTop: 10
    },

    rgstBtn: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FF6700',
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
    },

    noCardContainer: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height -320,
        width: Dimensions.get('window').width -40,
        borderRadius: 10,
        alignItems: 'center',
    },

    makeEventContainer: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        margin: 30,
    },

    makeEventInput: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 3
    }, 

    imgSel: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        width:100,
        height:100,
    },

});
