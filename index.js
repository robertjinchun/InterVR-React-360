import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
} from 'react-360';
import EventEmitter from "EventEmitter";
import MediaAppTemplateScenePage from "MediaAppTemplateScenePage.react";

// import MediaAppTemplateSubtitleText from "MediaAppTemplateSubtitleText.react";

// The mock database
const SCENE_DEF = [
  {
    type: 'photo',
    title: 'Welcome Scene',
    source: asset('360_Office.jpg'),
    //screen: { url: asset('NYL_Zen_Interview.mp4').uri },
    sceneNumber:0,
    //audio: asset('cafe.wav'),
    next: 1,
    subtitle: 'This is the welcome scene, just look around!',
    
  },
  {
    type: 'photo',
    title: 'Pick your interview topic',
    source: asset('office_360_02.jpg'),
    //screen: { url: asset('NYL_Zen_Interview.mp4').uri },
    sceneNumber: 1,
    next: 2,
    previous:0,
    subtitle: 'This is a 360 street view, you can see the traffic.',
  },
  {
    type: 'photo',
    title: 'Start interview or go back',
    source: asset('office_360_02.jpg'),
    //screen: { url: asset('NYL_Zen_Interview.mp4').uri },
    next: 3,
    previous:1,
    sceneNumber: 2,
    subtitle: 'This is a 2d video of street view, you can see the traffic.',
  },
  {
    type: 'video',
    title: 'interview video',
    source: { url: asset('NYL_Zen_Interview.mp4').uri },
    sceneNumber: 3,
    next: 4,
    previous:2,
    subtitle: 'This is a 2d video of street view, you can see the traffic.',
  },
  {
  type: 'photo',
  title: 'Review your answers',
  source: asset('office_360_02.jpg'),
  next: 5,
  previous: 3,
  sceneNumber: 4,
  subtitle: 'This is a 2d video of street view, you can see the traffic.',
  },
  {
    type: 'photo',
    title: 'Thank you for being part of this expeirence',
    source: asset('360_Office.jpg'),
    next: 0,
    previous: 4,
    sceneNumber: 5,
    subtitle: 'This is a 2d video of street view, you can see the traffic.',
    },

];

// To share data between different root views, the best way is to
// use data frameworks such as flux or redux.
// Here we just use a simple event emitter.
const dataStore = new EventEmitter();

// The root react component of the app main surface
export default class MediaAppTemplate extends React.Component {
  constructor(props) {
    super(props);

    

    this.state = {
      index: 0,
    };
  }

  _onClickNext = () => {
    const nextID = SCENE_DEF[this.state.index].next;
    console.log(SCENE_DEF[this.state.index])
    this.setState({index: nextID});
    dataStore.emit('dataChange', nextID);
  };

  _onClickPrev = () => {
    const prevID = SCENE_DEF[this.state.index].previous;
    this.setState({ index: prevID });
    dataStore.emit('dataChange', prevID);
  };
    
  _moveToVideoScene = () => {
    const nextID = 3;
    console.log(SCENE_DEF[this.state.index])
    this.setState({index: nextID});
    dataStore.emit('dataChange', nextID);
  };

  render() {
    const currentScene = SCENE_DEF[this.state.index];
    const nextScene = SCENE_DEF[SCENE_DEF[this.state.index].next];
    const buttonCount = SCENE_DEF[this.state.index].buttonCount;
    const buttonInfo = SCENE_DEF[this.state.index].buttonInfo;
    const enterBackground = SCENE_DEF[this.state.index].enterBackground
    const currentSceneNumber = SCENE_DEF[this.state.index].sceneNumber
    //console.log(enterBackground)
    return (
      <View style={styles.panel}>
        <MediaAppTemplateScenePage
          videoScene = {SCENE_DEF[3]}
          currentScene={currentScene}
          currentSceneNumber={currentSceneNumber}
          nextScene={nextScene} //the next scene number
          //function to switch scenes
          onClickNext={this._onClickNext}
          onClickPrev={this._onClickPrev}
          buttonCount={buttonCount}
          buttonInfo={buttonInfo}  
          //onEnter={this._moveToVideoScene()}
          /> 
      </View>
    );
  }
};

// defining StyleSheet
const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    width: 600,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    top: 600,
  },
});

// register the root component
// this will be used from client.js by r360.createRoot('MediaAppTemplate' ...)
AppRegistry.registerComponent('MediaAppTemplate', () => MediaAppTemplate);

// register another root component
// this will be used from client.js by r360.createRoot('MediaAppTemplate' ...)

// AppRegistry.registerComponent('MediaAppTemplateSubtitle', () => MediaAppTemplateSubtitle);
