import React, {
    Component
} from 'react';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { DrawerActions } from 'react-navigation';

import styles from '../assets/css/style.js';



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
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 60,
        },
    },
};

class PointCard extends Component {

  constructor() {
      super();
      this.state = {
        card: this.fillCard()
      };
    
  }

  fillCard() {
    let holderArray = [];
    for(let count =0; count <5; count++) {
        holderArray.push(
                <View key = {count} style= {styles.pointCardColumn }>
                    <View style={ styles.pointCardRow}>
                        <View style ={ styles.pointBlock }>
                            <Text>
                                vakje
                            </Text>
                        </View>
                        <View style ={ styles.pointBlock }>
                            <Text>
                                vakje
                            </Text>
                        </View>
                        <View style ={ styles.pointBlock }>
                            <Text>
                                vakje
                            </Text>
                        </View>
                    </View>
                </View>
            );
    }
    return holderArray;
  }

  render() {
    return(
        <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Toolbar
               elevation={5}
               styles={styles.toolbar}
                 leftElement="menu"
                 onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                 centerElement={"Bslim"}
                 rightElement="crop-free"
                 onRightElementPress={() => this.props.navigation.navigate('ScannerQR')}
            />
            <ScrollView style= { styles.pointCard }>
                {this.state.card}
            </ScrollView>
        </ThemeContext.Provider>
    );
  }
}



export default PointCard;