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

  //function to change
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
          <VrButton>
            <Text style={styles.button}>Start an Interview </Text>
          </VrButton>
          <VrButton>
            <Text style={styles.button2}>Previous Sessions</Text>
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
    backgroundColor: "#000000"
  },
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: "rgba(140, 140, 140, 0.5)",
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
  button: {
    marginLeft: 5,
    marginRight: 5,
    width: "40px",
    height: "30px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    textAlign: "center"
  },
  button2: {
    marginLeft: 5,
    marginRight: 5,
    width: "40px",
    height: "30px",
    backgroundColor: "rgba(140, 140, 140, 0.5)",
    color: "#000000",
    textAlign: "center"
  },
  scenePage: {
    padding: 5,
    width: 600,
    height: 300,
    backgroundColor: "rgba(140, 140, 140, 0.5)",
    borderRadius: 5
  }
});

// register the root component
// this will be used from client.js by r360.createRoot('BasicAppTemplate' ...)
AppRegistry.registerComponent("BasicAppTemplate", () => BasicAppTemplate);
