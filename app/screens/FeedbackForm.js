import React, {Component} from 'react';
import * as capitalize from "capitalize";

export default class FeedbackForm extends Component {

    constructor(){
        super()
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
                        centerElement={"Profiel"}
                        leftElement={"arrow-left"}
                        onLeftElementPress={() =>
                            this.props.navigation.dispatch(NavigationActions.back())
                        }
                    />
                </LinearGradient>

                <View style={styles.cardContainer}>
                    <View style={styles.card} elevation={5}>

                    </View>

                </View>


            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({

    cardContainer: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 150

    },

    card: {
        backgroundColor: 'white',
        margin: 10,
        marginBottom: 0,
        borderRadius: 10,
        shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3,
    },

    cardTitle: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        margin: 0,
        padding: 0,
    },
})