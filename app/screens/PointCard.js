import React, {
    Component
} from 'react';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
        primaryColor: '#3bb222',
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
    let numOfStamps = 2;

    let filledRows = Math.floor(numOfStamps/3);
    let extra = numOfStamps%3
    let unfilledRows = 0;

    if(extra == 0) {
        unfilledRows = 5 - filledRows;
    } else {
        unfilledRows = 5 - (filledRows + 1);
    }

    for(let count =0; count < filledRows; count++) {
        holderArray.push(
                <View key = {count} style= {styles.pointCardColumn }>
                    <View style={ styles.pointCardRow}>
                        <Image  style = { styles.stampFilled}
                                source = {require('../assets/stempel_1.jpeg')}
                                />
                        <Image  style = { styles.stampFilled }
                                source = {require('../assets/stempel_1.jpeg')}
                        />
                        <Image  style = { styles.stampFilled }
                                source = {require('../assets/stempel_1.jpeg')}
                        />
                    </View>
                </View>
            );
    }

    if(extra > 0) {
        let extraStamps = [];
        for(let count = 0; count < extra; count++) {
            extraStamps.push(
                    <Image  key = {count}
                            style = { styles.stampFilled }
                            source = {require('../assets/stempel_1.jpeg')}
                    />
                );
        }
        for(let count = 0; count < 3 - extra; count++) {
            extraStamps.push(
                    <Image  key = {3 - count}
                            style = { styles.stampUnFilled }
                            source = {require('../assets/stempel_1.jpeg')}
                    />
                );
        }
        holderArray.push(
                <View key = {filledRows+1} style= {styles.pointCardColumn }>
                    <View style={ styles.pointCardRow}>
                        {extraStamps}
                    </View>
                </View>
            );
    }

    for(let count = 0; count < unfilledRows; count++) {
        holderArray.push(
                <View key = {5 - count} style= {styles.pointCardColumn }>
                    <View style={ styles.pointCardRow}>
                        <Image  style = { styles.stampUnFilled}
                                source = {require('../assets/stempel_1.jpeg')}
                                />
                        <Image  style = { styles.stampUnFilled }
                                source = {require('../assets/stempel_1.jpeg')}
                        />
                        <Image  style = { styles.stampUnFilled }
                                source = {require('../assets/stempel_1.jpeg')}
                        />
                    </View>
                </View>
            );
    }

    console.log(holderArray);
    return holderArray;
  }

  render() {
    return(
			<View style={{flex: 1}}>

            <ScrollView scrollEnabled = {false}
                        contentContainerStyle={styles.pointCard}>
                {this.state.card}
            </ScrollView>
            <Button
                    style={{container: styles.defaultBtn, text: {color: 'white'}}}
                    raised text="Nieuwe kaart"
                    onPress={() => alert("Je moet nu een nieuwe stempelkaart krijgen")} />
										</View>
    );
  }
}



export default PointCard;
