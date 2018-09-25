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
import ActionButton from 'react-native-action-button';

import styles from '../assets/css/style.js';


import ConfettiView from 'react-native-confetti-view';

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

const images = {
    image1: require('../assets/points/1.png'),
		image2: require('../assets/points/2.png'),
		image3: require('../assets/points/3.png'),
		image4: require('../assets/points/4.png'),
		image5: require('../assets/points/5.png'),
		image6: require('../assets/points/6.png'),
		image7: require('../assets/points/7.png'),
		image8: require('../assets/points/8.png'),
		image9: require('../assets/points/9.png'),
		image10: require('../assets/points/10.png'),
		image11: require('../assets/points/11.png'),
		image12: require('../assets/points/12.png'),
		image13: require('../assets/points/13.png'),
		image14: require('../assets/points/14.png'),
		image15: require('../assets/points/15.png'),
};

class PointCard extends Component {

  constructor() {
      super();
      this.state = {
        card: this.fillCard()
      };

  }

	componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
  }

  componentWillUnmount ()
  {
      if (this._confettiView)
      {
          this._confettiView.stopConfetti();
      }
  }

	getFile(id, total){
		if(id <= total){
			return require('../assets/points/check.png');
		}

		switch(id) {
    case 1:
        return require('../assets/points/1.png');
        break;
		case 2:
        return require('../assets/points/2.png');
        break;
		case 3:
        return require('../assets/points/3.png');
        break;
		case 4:
        return require('../assets/points/4.png');
        break;
		case 5:
        return require('../assets/points/5.png');
        break;
		case 6:
        return require('../assets/points/6.png');
        break;
		case 7:
        return require('../assets/points/7.png');
        break;
    case 8:
        return require('../assets/points/8.png');
        break;
		case 9:
        return require('../assets/points/9.png');
        break;
		case 10:
        return require('../assets/points/10.png');
        break;
		case 11:
        return require('../assets/points/11.png');
        break;
		case 12:
        return require('../assets/points/12.png');
        break;
		case 13:
        return require('../assets/points/13.png');
        break;
		case 14:
      	return require('../assets/points/14.png');
        break;
		case 15:
        return require('../assets/points/15.png');
        break;
    default:
        return require('../assets/points/1.png');
}
	}

  fillCard() {
    let holderArray = [];
    let numOfStamps = 15;
		let count = 1;

    for(let row = 0; row < 5; row++) {
				holderArray.push(
								<View key = {5 - count} style= {styles.pointCardColumn }>
										<View style={ styles.pointCardRow}>
												<Image  style = { styles.stampFilled}
																source = {this.getFile(count, numOfStamps)}
																/>
												<Image  style = { styles.stampFilled }
																source = {this.getFile(count+1, numOfStamps)}
												/>
												<Image  style = { styles.stampFilled }
																source = {this.getFile(count+2, numOfStamps)}
												/>
										</View>
								</View>
						);
					count = count + 3;
    }

    console.log(holderArray);
    return holderArray;
  }

  render() {
    return(
			<View style={{flex: 1}}>

            <ScrollView scrollEnabled = {false}
                        contentContainerStyle={styles.pointCard}>
												<ConfettiView>
                {this.state.card}
								</ConfettiView>
            </ScrollView>

			</View>
    );
  }
}



export default PointCard;
