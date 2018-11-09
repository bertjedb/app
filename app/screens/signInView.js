import React, {Component} from "react";

import {
    Dimensions,
    Image,
    ImageBackground,
    ListView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import {Header, NavigationActions} from "react-navigation";
import {Toolbar} from "react-native-material-ui";
import LinearGradient from "react-native-linear-gradient";
import Api from "../config/api";
import LocalStorage from "../config/localStorage";
import { ListItem } from 'react-native-elements'
import * as capitalize from "capitalize";



export default class signInView extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
        }

        let localStorage = LocalStorage.getInstance();
        localStorage.retrieveItem("userId").then(id => {

            let api = Api.getInstance();
            api.callApi("api/getAllSubs", "POST", {'id': id}, response => {
                if (response["responseCode"] != 503) {
                    if (response["responseCode"] == 200) {

                        this.setState({
                            data: response['subs'],
                        });
                    }
                } else {
                    this.setState({
                        data: response['subs'],
                    });
                }
            });

            })
            .catch(error => {
                //this callback is executed when your Promise is rejected
                console.log("Promise is rejected with error: " + error);
            });



    }
    render() {

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
                        centerElement={"Aanmeldingen"}
                        leftElement={"arrow-left"}
                        onLeftElementPress={() =>
                            this.props.navigation.dispatch(NavigationActions.back())
                        }
                    />
                </LinearGradient>

                <View style={styles.cardContainer}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item.title}

                        renderItem={({item}) =>  (
                            <ListItem

                            title={<Text>{item.name}</Text>}
                            onPress={() =>
                                this.props.navigation.navigate("EventDetail", {
                                    title: capitalize.words(
                                        item.name.toString().replace(", ,", " ")
                                    ),
                                    subscribed: item.subscribed,
                                    id: item.id,
                                    profilePicture: item.photo[0],
                                    content: item.desc,
                                    start: item.begin + " " + item.beginMonth + " 2018",
                                    startTime: item.beginTime,
                                    end: item.end + " " + item.endMonth + " 2018",
                                    endTime: item.endTime,
                                    created: item.created,
                                    author: capitalize.words(
                                        item.leader.replace(", ,", " ")
                                    ),
                                    link: item.link,
                                    img: item.img,
                                    qr_code: item.qrCode,
                                    location: item.location,
                                    participants: item.participants
                                })

                            }

                            />

                        )}

                     />
                </View>


            </ImageBackground>
        );
     }
}

const styles = StyleSheet.create({
    rowFront: {
        alignItems: "center",
        backgroundColor: "#b0bec5",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        justifyContent: "center",
        height: 50
    },
    cardContainer: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "white",
        paddingBottom: 150
    },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 5,
    },

});

