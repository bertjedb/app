import React, { Component } from "react";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button,
  Drawer,
  Avatar
} from "react-native-material-ui";
import stylesCss from "../assets/css/style.js";
import Api from "../config/api.js";
import LocalStorage from "../config/localStorage.js";
import LinearGradient from "react-native-linear-gradient";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

export default class More extends Component {
  constructor() {
	super();
	this.state = {
	  succesfull: false,
	  userId: null,
	  clearance: null
	};
  }

  navigateToScreen = route => () => {
	const navigate = NavigationActions.navigate({
	  routeName: route
	});
	this.props.navigation.dispatch(navigate);
  };

  errorMessage(msg) {
	showMessage({
	  message: msg,
	  type: "danger",
	  duration: 3000
	});
  }

  render() {
	let api = Api.getInstance();
	let localStorage = LocalStorage.getInstance();
	localStorage
	  .retrieveItem("userId")
	  .then(goals => {
		localStorage
		  .retrieveItem("clearance")
		  .then(clr => {
			this.setState({
			  clearance: clr,
			  userId: goals
			});
		  })
		  .catch(error => {
			//this callback is executed when your Promise is rejected
			console.log("Promise is rejected with error: " + error);
		  });
	  })
	  .catch(error => {
		//this callback is executed when your Promise is rejected
		console.log("Promise is rejected with error: " + error);
	  });

	return (
	  <View style={{ flex: 1 }}>
		<LinearGradient
		  colors={[
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201",
			"#94D600",
			"#76C201"
		  ]}
		  style={{ height: Header.HEIGHT }}
		>
		  <Toolbar centerElement="Meer" />
		</LinearGradient>
		<Drawer>
		  {this.state.userId == null && (
			<Drawer.Section
			  divider
			  items={[
				{
				  icon: (
					<Icon
					  size={25}
					  name={"login-variant"}
					  style={{ color: "grey" }}
					/>
				  ),
				  value: "Inloggen",
				  key: "1",
				  onPress: () =>
					this.props.navigation.dispatch(
					  NavigationActions.navigate({
						routeName: "LoginStack",
						action: NavigationActions.navigate({
						  routeName: "LoginScreen"
						})
					  })
					)
				},
				{
				  icon: (
					<Icon
					  size={25}
					  name={"account-plus"}
					  style={{ color: "grey" }}
					/>
				  ),
				  value: "Registreren",
				  key: "2",
				  onPress: () =>
					this.props.navigation.dispatch(
					  NavigationActions.navigate({
						routeName: "LoginStack",
						action: NavigationActions.navigate({
						  routeName: "Registration"
						})
					  })
					)
				},
				{
					icon: (
					  <Icon
						size={25}
						name={"email"}
						style={{ color: "grey" }}
					  />
					),
					value: "E-mail adress verandering opvragen",
					key: "3",
					onPress: () =>
						this.props.navigation.dispatch(
							NavigationActions.navigate({
							  routeName: "LoginStack",
							  action: NavigationActions.navigate({
								routeName: "ChangeEmailRequest"
							  })
							})
					  	)
			  	},
			  	{
					icon: (
					  <Icon
						size={25}
						name={"lock-question"}
						style={{ color: "grey" }}
					  />
					),
					value: "Wachtwoord vergeten",
					key: "4",
					onPress: () =>
						this.props.navigation.dispatch(
							NavigationActions.navigate({
							  routeName: "LoginStack",
							  action: NavigationActions.navigate({
								routeName: "RecoverPassword"
							  })
							})
					  	)
				  },
			  ]}
			/>
		  )}
		  {this.state.userId != null &&
			this.state.clearance == 0 && (
			  <Drawer.Section
				items={[
					{
					icon: (
					  <Icon
						size={25}
						name={"email"}
						style={{ color: "grey" }}
					  />
					),
					value: "E-mail adress verandering opvragen",
					key: "5",
					onPress: () =>
						this.props.navigation.dispatch(
							NavigationActions.navigate({
							  routeName: "LoginStack",
							  action: NavigationActions.navigate({
								routeName: "ChangeEmailRequest"
							  })
							})
					  	)
				  },
				  {
					icon: (
					  <Icon
						size={25}
						name={"email-alert"}
						style={{ color: "grey" }}
					  />
					),
					value: "E-mail adress veranderen",
					key: "6",
					onPress: () =>
						this.props.navigation.dispatch(
							NavigationActions.navigate({
							  routeName: "LoginStack",
							  action: NavigationActions.navigate({
								routeName: "ChangeEmail"
							  })
							})
					  	)
				  },
				  {
					icon: (
					  <Icon
						size={25}
						name={"lock-reset"}
						style={{ color: "grey" }}
					  />
					),
					value: "Wachtwoord veranderen",
					key: "7",
					onPress: () =>
						this.props.navigation.dispatch(
							NavigationActions.navigate({
							  routeName: "LoginStack",
							  action: NavigationActions.navigate({
								routeName: "ChangePassword"
							  })
							})
					  	)
				  },
				  {
					icon: "power-settings-new",
					value: "Uitloggen",
					key: "8",
					onPress: () =>
					  api.callApi(
						"logout",
						"POST",
						{
						  id: this.state.userId
						},
						response => {
						  if (response["responseCode"] != 503) {
						  	console.log(response);
							if (response["boolean"] == true) {
							  localStorage.storeItem("userId", null);
							  localStorage.storeItem("points", null);
							  api.getPoints();
							}
						  } else {
							this.errorMessage(
							  "Zorg ervoor dat u een internet verbinding heeft"
							);
						  }
						}
					  )
				  }
				]}
			  />
			)}

		  {this.state.userId != null &&
			this.state.clearance == 1 && (
			  <Drawer.Section
				title="Beheerder"
				divider
				items={[
				  {
					icon: (
					  <Icon
						size={25}
						name={"calendar-plus"}
						style={{ color: "grey" }}
					  />
					),
					value: "Nieuw evenement aanmaken",
					key: "9",
					onPress: () =>
					  this.props.navigation.dispatch(
						NavigationActions.navigate({
						  routeName: "AdminStack",
						  action: NavigationActions.navigate({
							routeName: "MakeEvent"
						  })
						})
					  )
				  },
				  {
					icon: (
					  <Icon
						size={25}
						name={"newspaper"}
						style={{ color: "grey" }}
					  />
					),
					value: "Nieuw artikel aanmaken",
					key: "10",
					onPress: () =>
					  this.props.navigation.dispatch(
						NavigationActions.navigate({
						  routeName: "AdminStack",
						  action: NavigationActions.navigate({
							routeName: "MakeNewsItem"
						  })
						})
					  )
				  },
				  {
					icon: (
					  <Icon
						size={25}
						name={"account-plus"}
						style={{ color: "grey" }}
					  />
					),
					value: "Beheerder account koppelen",
					key: "11",
					onPress: () =>
					  this.props.navigation.dispatch(
						NavigationActions.navigate({
						  routeName: "AdminStack",
						  action: NavigationActions.navigate({
							routeName: "CreateAdmin"
						  })
						})
					  )
				  },
				  {
					icon: (
					  <Icon
						size={25}
						name={"camera"}
						style={{ color: "grey" }}
					  />
					),
					value: "Video uploaden",
					key: "12",
					onPress: () =>
					  this.props.navigation.dispatch(
						NavigationActions.navigate({
						  routeName: "AdminStack",
						  action: NavigationActions.navigate({
							routeName: "VideoPicker"
						  })
						})
					  )
				  },
				  {
					icon: "people",
					value: "Deelnemers",
					key: "13",
					onPress: () =>
					  this.props.navigation.dispatch(
						NavigationActions.navigate({
						  routeName: "ParticipantListStack",
						  action: NavigationActions.navigate({
							routeName: "ParticipantList"
						  })
						})
					  )
				  },
				  {
					icon: (
					  <Icon
						size={25}
						name={"lock-question"}
						style={{ color: "grey" }}
					  />
					),
					value: "Wachtwoord veranderen",
					key: "14",
					onPress: () =>
					  this.props.navigation.dispatch(
						NavigationActions.navigate({
						  routeName: "LoginStack",
						  action: NavigationActions.navigate({
							routeName: "ChangePassword"
						  })
						})
					  )
				  },
				  {
					icon: "power-settings-new",
					value: "Uitloggen",
					key: "15",
					onPress: () =>
					  api.callApi(
						"logout",
						"POST",
						{
						  id: this.state.userId
						},
						response => {
						  if (response["responseCode"] != 503) {
							if (response["boolean"] == true) {
							  localStorage.storeItem("userId", null);
							  localStorage.storeItem("points", null);
							  api.getPoints();
							}
						  } else {
							this.errorMessage(
							  "Zorg ervoor dat u een internet verbinding heeft"
							);
							alert(
							  "Zorg ervoor dat u een internet verbinding heeft"
							);
						  }
						}
					  )
				  }
				]}
			  />
			)}
		</Drawer>
		<FlashMessage position="top" style={{ marginTop: Header.HEIGHT }} />
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  drawerPadding: {
	paddingTop: 100
  },

  card: {
	backgroundColor: "#FFFFFF",
	height: 220,
	margin: 10,
	borderRadius: 10,
	shadowOffset: { width: 0, height: 13 },
	shadowOpacity: 0.3,
	shadowRadius: 6,

	// android (Android +5.0)
	elevation: 3
  },

  SectionStyleTop: {
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#fff",
	borderWidth: 0.5,
	borderColor: "#000",
	height: 40,
	borderTopLeftRadius: 5,
	borderTopRightRadius: 5
  },

  SectionStyleBottom: {
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#fff",
	borderWidth: 0.5,
	borderColor: "#000",
	height: 40,
	borderBottomLeftRadius: 5,
	borderBottomRightRadius: 5
  },

  ImageStyle: {
	margin: 5,
	alignItems: "center"
  }
});
