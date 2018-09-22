import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
    Drawer,
    Avatar,
} from 'react-native-material-ui';

class More extends Component {

  navigateToScreen = (route) => () => {
      const navigate = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigate);
    }

  render () {
      return (

        <Drawer>
          <Drawer.Section
              divider
              items={[
                  { icon: <Icon size={25} name={ 'login-variant' } style={{ color: 'grey' }} />, value: 'Login', onPress: () => this.props.navigation.navigate('LoginScreen')},
                  { icon: 'today', value: 'Lorem ipsum'},
                  { icon: 'assignment', value: 'Lorem ipsum' },
              ]}
          />
          <Drawer.Section
              title="Lorem ipsum"
              items={[
                  {
                    icon: 'info',
                    value: 'Lorem ipsum',
                  },
                  {
                    icon: 'power-settings-new',
                    value: 'Lorem ipsum',
                    onPress: () => this.props.navigation.navigate('Registration'),
                  },
              ]}
          />
        </Drawer>
      );
    }
}

const styles = StyleSheet.create({

  drawerPadding: {
    paddingTop: 100,
  },

});

export default More;
