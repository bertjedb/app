import React, {
    Component
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    NativeModules,
    Dimensions,
    Navigator,
    Platform,
    ListView,
    ActivityIndicator,
} from 'react-native';

import { DrawerActions } from 'react-navigation';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {TextField} from 'react-native-material-textfield';
import ActionButton from 'react-native-action-button';
import * as mime from 'react-native-mime-types';
import Video from 'react-native-af-video-player'
import QRCodeScanner from 'react-native-qrcode-scanner';

import Feed from '../screens/Feed';
import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import DrawerContent from '../screens/Sidebar';
import LoginScreen from '../screens/LoginScreen';
import PointCard from '../screens/PointCard';
import Registration from '../screens/Registration';
import News from '../screens/News';
import More from '../screens/More';
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: '#3bb222',
    },
    toolbar: {
        container: {
            height: 60,
        },
    },
};

const BottomTabs = TabNavigator({
	News: {
				screen: News,
				navigationOptions: {
					tabBarLabel: 'Evenementen',
					tabBarIcon: () => (
					<Icon name="calendar" size={24} color='white' />
				)
				}
			},
	PointCard: {
				screen: PointCard,
				navigationOptions: {
					tabBarLabel: 'Stempelkaart',
					tabBarIcon: () => (
					<Icon name="cards-outline" size={24} color='white' />
				)
				}
			},
	More: {
				screen: More,
				navigationOptions: {
					tabBarLabel: 'Meer',
					tabBarIcon: () => (
					<Icon name="format-list-bulleted" size={24} color='white' />
				)
				}
			},
}, {
	tabBarComponent: NavigationComponent,
	tabBarPosition: 'bottom',
	tabBarOptions: {
		bottomNavigationOptions: {
			labelColor: 'white',
			rippleColor: 'white',
			tabs: {
				News: {
					barBackgroundColor: '#37474F',
				},
				PointCard: {
					barBackgroundColor: '#00796B',
				},
				More: {
					barBackgroundColor: '#3E2723',
				},
			}
		}
	}
})

class Tabs extends Component {

  constructor() {
      super();
  }

  render() {
    return(
			<BottomTabs/>
    );
  }
}

export default Tabs;
