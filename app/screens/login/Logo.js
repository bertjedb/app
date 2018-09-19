import React, {
    Component
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import logoImg from '../../assets/Bslim_logo.png';


class Logo extends Component {

  render() {
    return(
        <View style={styles.container}>
          <Image source={logoImg} style={styles.image}/>
          <Text style={styles.text}>BSLIM APPLICATION</Text>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3bb222',
  },
  image: {
    width: 400,
    height: 250,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
})

export default Logo;
