import React, {Component} from 'react';
import {StyleSheet,
    Dimensions, ImageBackground, View,Text, ScrollView} from 'react-native';
import {Header, NavigationActions} from "react-navigation";
import {Toolbar,} from 'react-native-material-ui';
import LinearGradient from 'react-native-linear-gradient';
import { TextField } from "react-native-material-textfield";
import stylesCss from "../assets/css/style";

export default class FeedbackForm extends Component {

    constructor(){
        super()

        this.state={
            subject: 'hallo',
            problem: ''

        }
     }



    render(){
        return (
            <ImageBackground
                blurRadius={3}
                source={require("../assets/sport_kids_bslim.jpg")}
                style={{width: "100%", height: "100%"}}
            >

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
                    style={{height: Header.HEIGHT}}
                >
                    <Toolbar
                        iconSet="MaterialCommunityIcons"
                        centerElement={"Feedback"}
                        leftElement={"arrow-left"}
                        onLeftElementPress={() =>
                            this.props.navigation.dispatch(NavigationActions.back())
                        }
                     />
                </LinearGradient>

                <View style={styles.cardContainer}>
                    <View style={styles.card} elevation={5}>
                        <View
                            style={{
                                height: Dimensions.get("window").height - 160,
                                borderRadius: 10,
                                width: Dimensions.get("window").width - 50
                            }}
                            >
                            <View style={styles.layoutContent}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                                    Feedback formulier
                                </Text>
                                <View
                                    style={{
                                        height: '100%'
                                    }}>
                                    <TextField
                                        textColor="green"
                                        tintColor="green"
                                        baseColor="green"
                                        label="Onderwerp"
                                        autoCapitalize="none"
                                        value={this.state.subject}
                                        onChangeText={subject => this.setState({ subject })}
                                    />


                                </View>
                            </View>

                        </View>
                    </View>

                </View>


            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 150
    },

    card: {
        backgroundColor: "white",
        margin: 10,
        marginBottom: 0,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 13 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3
    },

    layoutContent: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:'10%'

    },

    cardTitle: {
        flexDirection: "row",
        margin: 0,
        padding: 0
    }
});