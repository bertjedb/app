import React, {
    Component
} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Toolbar, Button } from 'react-native-material-ui';
import { Header, NavigationActions } from 'react-navigation';
import styles from '../assets/css/style.js';
import ImagePicker from "react-native-image-picker";
import Video from 'react-native-video';
import RNFetchBlob from "rn-fetch-blob";

export default class VideoPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uri: ''
        };
    }

    recordVideo = () => {
        const options = {
            title: 'Video picker',
            mediaType: 'video',
            storageOptions: {
                skipBackup: true,
                path: 'image'
            }
        }
        ImagePicker.launchCamera(options, response => {
            const uri = response.uri
            this.setState({ uri });
            console.log(this.state);
            this.uploadContent("Video", uri, "video/mp4", "mp4");
        });
    };

    uploadContent(fileName, imageSource, mimeType, fileExtension) {
    this.setState({
      uploading: true
    });
    RNFetchBlob.fetch(
      "POST",
      "http://gromdroid.nl/bslim/wp-json/wp/v2/media",
      {
        Authorization: "Basic YWRtaW46YnNsaW1faGFuemUh",
        "Content-Type": + mimeType,
        "Content-Disposition":
          "attachment; filename=" + fileName + "." + fileExtension
      },
      RNFetchBlob.wrap(imageSource)
    )
      .uploadProgress({ interval: 250 }, (written, total) => {
      })
      .then(res => {
        this.setState({
          uploading: false
        });
      })
      .catch(err => {
            console.log(err)
      });
  }



    
    render() {
    return(
        <ImageBackground
            blurRadius={3}
            source={require("../assets/sport_kids_bslim.jpg")}
            style={{ width: "100%", height: "100%" }}
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
          style={{ height: Header.HEIGHT }}
        >
          <Toolbar
            iconSet="MaterialCommunityIcons"
            centerElement="Evenement aanmaken"
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>
        <View style={styles.container}>
          <View style={styles.cardGreen} elevation={5}>
            <Text
              style={{
                margin: 15,
                fontWeight: "bold",
                fontSize: 24,
                color: "white"
              }}
            >
              Video opnemen
            </Text>
            <View
              style={{
                backgroundColor: "white",
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 15,
                paddingTop: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
                <Button
                    style={{container: styles.defaultBtn, text: {color: 'white'}}}
                    raised text="Video opnemen"
                    onPress={this.recordVideo}
                />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
    }
}