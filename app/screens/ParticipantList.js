import React, {
    Component
} from 'react';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
		StyleSheet,
		ImageBackground,
		Dimensions,
		Share,
		TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-swipeable';



class ParticipantList extends Component {

constructor() {
  super();
  this.state = {
	  map: true
  }
}



  render() {

	  const leftContent = <Text>Pull to activate</Text>;

	  const rightButtons = [
	    <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
	    <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
	  ];

    return(
		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
		  <View style={styles.cardContainer} >
			  <Swipeable
				leftButtonWidth={45}
				leftButtons={[
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'red'}]}>
					<Text>-</Text>
				  </TouchableOpacity>,
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'green'}]}>
					<Text>+</Text>
				  </TouchableOpacity>,
				]}
				rightContent={(
				  <View style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
					<Text>Pull action</Text>
				  </View>
				)}>
			  	<Text style={{margin: 20}}>Gaauwe</Text>
			  </Swipeable>
			  <Swipeable
				leftButtonWidth={45}
				leftButtons={[
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'red'}]}>
					<Text>-</Text>
				  </TouchableOpacity>,
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'green'}]}>
					<Text>+</Text>
				  </TouchableOpacity>,
				]}
				rightContent={(
				  <View style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
					<Text>Pull action</Text>
				  </View>
				)}>
			  	<Text style={{margin: 20}}>Bert</Text>
			  </Swipeable>
			  <Swipeable
				leftButtonWidth={45}
				leftButtons={[
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'red'}]}>
					<Text>-</Text>
				  </TouchableOpacity>,
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'green'}]}>
					<Text>+</Text>
				  </TouchableOpacity>,
				]}
				rightContent={(
				  <View style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
					<Text>Pull action</Text>
				  </View>
				)}>
			  	<Text style={{margin: 20}}>Wouter</Text>
			  </Swipeable>
			  <Swipeable
				leftButtonWidth={45}
				leftButtons={[
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'red'}]}>
					<Text>-</Text>
				  </TouchableOpacity>,
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'green'}]}>
					<Text>+</Text>
				  </TouchableOpacity>,
				]}
				rightContent={(
				  <View style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
					<Text>Pull action</Text>
				  </View>
				)}>
			  	<Text style={{margin: 20}}>Jelmer</Text>
			  </Swipeable>
			  <Swipeable
				leftButtonWidth={45}
				leftButtons={[
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'red'}]}>
					<Text>-</Text>
				  </TouchableOpacity>,
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'green'}]}>
					<Text>+</Text>
				  </TouchableOpacity>,
				]}
				rightContent={(
				  <View style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
					<Text>Pull action</Text>
				  </View>
				)}>
			  	<Text style={{margin: 20}}>Jurgen</Text>
			  </Swipeable>
			  <Swipeable
				leftButtonWidth={65}
				leftButtons={[
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: '#f44336'}]}>
					<Icon style={{padding: 10}} name="minus" size={24} color='white' />
				  </TouchableOpacity>,
				  <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: '#4caf50'}]}>
					<Icon style={{padding: 10}} name="plus" size={24} color='white' />
				  </TouchableOpacity>,
				]}
				rightContent={(
				  <View style={[styles.rightSwipeItem, {backgroundColor: '#2196f3'}]}>
					<Icon style={{padding: 10}} name="delete" size={24} color='white' />
				  </View>
				)}>
			  	<Text style={{margin: 20}}>Joel</Text>
			  </Swipeable>
          </View>
		</ImageBackground>
    );
  }
}


const styles = StyleSheet.create({

    cardContainer:{
    	height: Dimensions.get('window').height,
    	width: Dimensions.get('window').width,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 150

    },
	listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
})


export default ParticipantList;
