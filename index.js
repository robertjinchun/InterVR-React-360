import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
  VrButton
} from "react-360";
import BasicAppTemplateInfoButton from "BasicAppTemplateInfoButton.react";
import BasicAppTemplateScenePage from "BasicAppTemplateScenePage.react";

// referencing an asset from 'static_assets' directory
const INFO_BUTTON_IMAGE = asset("info_icon.png");
const SCENE_COUNT = 3;

// The root react component of the app
export default class BasicAppTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  //function to change scene
  _onClick = index => {
    this.setState({ index: index });
  };

  render() {
    const sceneButtons = [];
    for (const i = 0; i < SCENE_COUNT; i++) {
      sceneButtons.push(
        //buttons
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
    return (
      <View style={styles.panel}>
        <View style={styles.scenePage}>
          <VrButton style={styles.buttonActive} onClick={() => {
                      this._onClick(i);
                    }}>
            <Text style={styles.text}>Start an Interview </Text>
          </VrButton>
          <VrButton style={styles.buttonInActive}>
            <Text style={styles.text}>Previous Sessions</Text>
          </VrButton>
        </View>
      </View>
    );
  }
}

// defining StyleSheet
const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
    margin: "0,  20, 0, 20",
    marginTop: 8,
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
    marginLeft: 5,
    marginRight: 5,
    marginTop:7,
    width: "40px",
    height: "15px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    borderRadius: 5,
    margin: "0,  20, 0, 20",

  },
  buttonInActive: {
    marginLeft: 5,
    marginRight: 5,
    marginTop:7,
    width: "40px",
    height: "15px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    borderRadius: 5,
    backgroundColor: "rgba(140, 140, 140, 0.5)",
  },
  scenePage: {
    padding: 5,
    width: 1000,
    height: 300,
    backgroundColor: "rgba(50, 50, 50, 0.5)",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

// register the root component
// this will be used from client.js by r360.createRoot('BasicAppTemplate' ...)
AppRegistry.registerComponent("BasicAppTemplate", () => BasicAppTemplate);
