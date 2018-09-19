import React, {
    Component
} from 'react';

import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import logoImg from '../../assets/Bslim_logo.png';


class Form extends Component {

  render() {
    return(
      <TextInput
      >
      </TextInput>
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

export default Form;
