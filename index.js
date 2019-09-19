import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
  VrButton,
} from "react-360";

import {default as VideoModule, VideoPlayerInstance, VideoStatusEvent} from 'VideoModule';

import BasicAppTemplateInfoButton from "BasicAppTemplateInfoButton.react";
import BasicAppTemplateScenePage from "BasicAppTemplateScenePage.react";

// referencing an asset from 'static_assets' directory
const INFO_BUTTON_IMAGE = asset("info_icon.png");
const SCENE_COUNT = 5;
const player = VideoPlayerInstance;
//const MenuOpen = [];


// The root react component of the app
export default class BasicAppTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      MenuOpen: [
        <View key={99} style={styles.QueMenuOpen}>
          <VrButton style={styles.Questions}>
            <Text style={styles.text}>Question one</Text>
          </VrButton>
          <VrButton style={styles.Questions}>
            <Text style={styles.text}>Question two</Text>
          </VrButton>
          <VrButton style={styles.Questions}>
            <Text style={styles.text}>Question three</Text>
          </VrButton>
          <VrButton style={styles.Questions}>
            <Text style={styles.text}>Question four</Text>
          </VrButton>   
          <VrButton style={styles.Questions}>
            <Text style={styles.text}>Question five</Text>
          </VrButton>                     
      </View>
      ]
    };
  }

  componentWillMount() {
    // create a play to play video
    this.player = VideoModule.createPlayer('myplayer');
    this.player.addListener('onVideoStatusChanged', this._onVideoStatus);
    //this._setData(this.props);
  }
  _playVideo = () => {
    this.player.play({
      source: asset('video360.webm')
    });
    Environment.setBackgroundVideo('myplayer');
    console.log("Video start playing");
  }

  // Method change background
_nextPage = () => { if (this.state.pageNumber < 3 ) {
  this.setState({pageNumber: this.state.pageNumber + 1});
  console.log(this.state.pageNumber);
  } else {
    this.setState({pageNumber: 0});
    console.log(this.state.pageNumber);
    console.log("else submited");
  }
}

_openMenu = () => {
  console.log("open menu clicked");
  this.state.MenuOpen.push(
    <View style={styles.QueMenuOpen}>
      <VrButton style={styles.Questions}>
        <Text style={styles.text}>Question one</Text>
      </VrButton>
      <VrButton style={styles.Questions}>
        <Text style={styles.text}>Question two</Text>
      </VrButton>
      <VrButton style={styles.Questions}>
        <Text style={styles.text}>Question three</Text>
      </VrButton>
      <VrButton style={styles.Questions}>
        <Text style={styles.text}>Question four</Text>
      </VrButton>   
      <VrButton style={styles.Questions}>
        <Text style={styles.text}>Question five</Text>
      </VrButton>                     
    </View>
  )
  console.log(this.state.MenuOpen[1].props);
}
  render() {
    const page01 = [];
    const sceneNumber = [];
    

    for (const i = 0; i < SCENE_COUNT; i++) {
      page01.push(
        <BasicAppTemplateInfoButton
          key={i}
          style={styles.button}
          source={INFO_BUTTON_IMAGE}
          text={`Agent ${i}`}
          onClick={() => {
            this._onClick(i);
          }}
        />
      );
    }
    // Change scenes 
    switch (this.state.pageNumber) {
      case 0:
          Environment.setBackgroundImage(
            asset("360_Office.jpg")  
          );
        sceneNumber.push(
        <View key={10} style={styles.scenePage}>
          <VrButton style={styles.buttonActive} onClick={this._nextPage}>
            <Text style={styles.text}>Start an Interview </Text>
          </VrButton>
          <VrButton style={styles.buttonInActive}>
            <Text style={styles.text}> Previous Sessions </Text>
          </VrButton>
        </View>
        );
        break;
      case 1:
          Environment.setBackgroundImage(
            asset("360_Zen.jpg")  
          );
        sceneNumber.push(
          <View key={11} style={styles.scenePage2}>
            <VrButton style={styles.buttonActive} onClick={this._nextPage}>
                <Text style={styles.text}>General</Text>
              </VrButton>
            <VrButton style={styles.buttonInActive}>
              <Text style={styles.text}>Tech</Text>
            </VrButton>
            <VrButton style={styles.buttonInActive}>
              <Text style={styles.text}>Medical</Text>
            </VrButton>
            <VrButton style={styles.buttonInActive}>
              <Text style={styles.text}>Policing</Text>
            </VrButton>
          </View>
          );
        break;
        case 2:
            Environment.setBackgroundImage(
              asset("360_Hassan.jpg")  
            );
          //{this._playVideo()}
          sceneNumber.push(
            <View key={22} style={styles.scenePage3}>
              <VrButton style={styles.menuButton}  onClick={this._openMenu}>
                <Image style={styles.icon} source={asset("MenuButton.png")}/>
              </VrButton>
              {this.state.MenuOpen}
                <View style={styles.arrowsContainer}>
                  <VrButton style={styles.arrowRight}  onClick={this._nextPage}>
                    <Image style={styles.icon} source={asset("next.png")}/>
                  </VrButton>
                  <VrButton style={styles.arrowLeft}  onClick={this._openMenu}>
                    <Image style={styles.icon} source={asset("back.png")}/>
                  </VrButton>
                </View>
            </View>
            );
          break;
          case 3:
            //{this._playVideo()}
            sceneNumber.push(
              <View key={33} style={styles.scenePage}>
                <View key={111} style={styles.scenePage4}>
                  {this.state.MenuOpen}
                </View>
               
                <View key={222} >
                  <VrButton style={styles.buttonActive} onClick={this._nextPage}>
                    <Text style={styles.text }>Submit</Text>
                  </VrButton>
                  <VrButton style={styles.buttonInActive}>
                    <Text style={styles.text}>Discard</Text>
                  </VrButton>
                </View>

              </View>
              );
            break;
        default:
    }
    
    return (
      <View style={styles.panel}>
        {sceneNumber}
      </View>
    );
  }
}

// defining StyleSheet
const styles = StyleSheet.create({
  text: {
    textAlign: "center", alignItems: "center",
    color: "#000000"
    },
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: "rgba(140, 140, 140, 0.0)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  section: {
    padding: 5,
    width: 750,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
    flexDirection: "row"
  },
  buttonActive : {
    padding:10, marginTop:10,
    width: "30px",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  buttonInActive: {
    padding:10, marginTop:10,
    width: "30px",
    backgroundColor: "#FFFFFF", backgroundColor: "rgba(140, 140, 140, 0.5)",
    borderRadius: 5,
  },
  scenePage: {
    width: 1000, height: 550,
    backgroundColor: "rgba(50, 50, 50, 0.5)",
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
  },
  scenePage2: {
    marginTop:100,
    padding: 5,
    width: 1000,
    height: 300,
    backgroundColor: "rgba(50, 50, 50, 0.0)",
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scenePage3: {
    padding: 5,
    width: 1000,
    height: 1000,
    backgroundColor: "rgba(50, 50, 50, 0.1)",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scenePage4: {
    width: 300, height: 300, borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
  },
  menuButton: {
    width: 50,height: 50,
    position: 'absolute', right: 0,
  },
  QueMenuOpen: {
    padding: 5,
    width: 300,height: 400,
    position: 'absolute', right: 0,
    backgroundColor: "rgba(50, 50, 50, 0.1)",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Questions: {
    padding:10, marginTop:10,
    width: "80px",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  icon: {
    padding: 20,
    height: '80%',
    aspectRatio: 1,
  },
  arrowsContainer: {
    width: 100,height: 50,
    position: "relative",marginRight: 900, marginTop: 550,
  },
  arrowRight: {
    width: 50,height: 50,
    position: 'absolute', right: 0,
  },
  arrowLeft: {
    width: 50,height: 50,
    position: 'absolute', left: 0,
  }
});

// register the root component
// this will be used from client.js by r360.createRoot('BasicAppTemplate' ...)
AppRegistry.registerComponent("BasicAppTemplate", () => BasicAppTemplate);
