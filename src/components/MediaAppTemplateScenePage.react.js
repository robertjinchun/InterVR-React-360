/**
 * @providesModule MediaAppTemplateScenePage.react
 */
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  NativeModules,
  Environment,
  VrButton,
} from 'react-360';
import { UIManager, findNodeHandle } from 'react-native';
import {
  default as VideoModule, VideoPlayerInstance,
  type VideoStatusEvent
} from 'VideoModule';

const { AudioModule } = NativeModules;

type Players = {
  scene: VideoPlayerInstance,
  screen: VideoPlayerInstance,
};

const TRANSITION_TIME = 500;

class MediaAppTemplateScenePage extends React.Component {
  _players: Players;
  _nextPlayers: Players;
  _preloadJob: ?Promise<void>;
  _preloading: boolean = false;
  state = {
    inTransition: false,
  };
  constructor(props){
    super(props)
    this.state = {
       seconds: 60,
       sceneSeconds: 0,
    }

    this.timer = 0;
    this.sceneTimer = 0;

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.answerCountDown = this.answerCountDown.bind(this);
  }

  componentWillMount() {
    this._players = {
      scene: VideoModule.createPlayer(),
      screen: VideoModule.createPlayer(),
    };

    this._nextPlayers = {
      scene: VideoModule.createPlayer(),
      screen: VideoModule.createPlayer(),
    };
    this._renderScene(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._renderScene(nextProps);
  }

  _preloadVideo(player, source) {
    // Video can be preloaded by calling `play()`
    // on a video player that is not attached to the environment or a screen
    // with `muted=true` and `autoPlay=false`.
    // Here we are swaping two sets of video players, one set for displaying
    // another set for preloading.
    // You can listen to the 'onVideoStatusChanged' event to check when
    // the loading is done.
    return new Promise((resolve, reject) => {
      const onVideoLoadedSubscription =
        player.addListener('onVideoStatusChanged', (event: VideoStatusEvent) => {
          if (event.status === 'ready') {
            player.removeSubscription(onVideoLoadedSubscription);
            resolve();
          }
        });
      player.play({
        source: source,
        muted: false,
        autoPlay: false,
      });
    });
  }

  _preloadScene(data) {
    const promises = [];
    if (data.type == 'photo') {
      // Preload the background 360 photo
      // Calling setBackgroundImage while the photo is still preloading is fine,
      // it will keep on loading and display the background image when it's done.
      Environment.preloadBackgroundImage(data.source, { format: '2D' });
      promises.push(Promise.resolve());
    } else {
      // Preload the background 360 video
      promises.push(this._preloadVideo(this._nextPlayers.scene, data.source));
    }

    if (data.screen) {
      // Preload the rectilinear video on the screen.
      promises.push(this._preloadVideo(this._nextPlayers.screen, data.screen));
    }

    return Promise.all(promises);
  }

  _renderScene(nextProps) {
    const data = nextProps.currentScene;
    this._preloading = true;
    const loadScene = () => {
      this._preloading = false;
      // video player clean up work
      this._players.scene.stop();
      this._players.screen.stop();
      // swap the players for next preload
      const temp = this._players;
      this._players = this._nextPlayers;
      this._nextPlayers = temp;

      // render current scene
      if (data.type == 'photo') {
        // display background 360 photo
        Environment.setBackgroundImage(data.source, { format: '2D', transition: TRANSITION_TIME });
      } else {
        // calling resume will start playing the already preloaded video
        this._players.scene.resume();
        Environment.setBackgroundVideo(this._players.scene._player, { transition: TRANSITION_TIME });
      }

      this.setState({ inTransition: true });
      setTimeout(() => { this.setState({ inTransition: false }); }, TRANSITION_TIME);

      if (data.screen) {
        this._players.screen.resume();
      }

      if (data.audio) {
        // play an environmental audio
        AudioModule.playEnvironmental({
          source: data.audio,
          volume: 0.9,
        });
      } else {
        AudioModule.stopEnvironmental();
      }

      // preload next scene
      const nextData = nextProps.nextScene;
      this._preloadJob = this._preloadScene(nextData);
    };

    if (this._preloadJob != null) {
      this._preloadJob.then(loadScene);
    } else {
      this._preloadScene(data).then(loadScene);
    }
  }

  _onClickNext = () => {
    this.props.onClickNext && this.props.onClickNext();
  }

  _onClickPrev = () => {
    this.props.onClickPrev && this.props.onClickPrev();
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0 && this.props.currentSceneNumber === 3) {
      //timer until the time for the answer to starts
      //this.timer = setInterval(this.countDown, 1000);
      this.sceneTimer = setInterval(this.answerCountDown, 1000);

    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    //console.log(seconds)
    this.setState({
      seconds: seconds,
    });
    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  answerCountDown() {
    // Remove one second, set state so a re-render happens.
    let sceneSeconds = this.state.sceneSeconds + 1;
    console.log(this.sceneTimer)
    this.setState({
      sceneSeconds: sceneSeconds,
    });
        // Check if we're at zero.
        if (sceneSeconds == 0) {
          clearInterval(this.sceneTimer);
        }
  }

  render() {
    const currentTitle = this.props.currentScene.title;
    const nextTitle = this.props.nextScene.title;
    const showScreen = !!(!this._preloading
      && !this.state.inTransition
      && this.props.currentScene.screen);

    const sceneButtons = [];
    let hello;
    let sceneButtoninfo = this.props.buttonInfo;
    let enterBackground = this.props.enterBackground;
    let currentSceneNumber = this.props.currentSceneNumber
    let counter = this.state.count;
    let flag = this.state.flag;
    let timercounter = 60;
    //console.log(flag)

    if (currentSceneNumber === 3 ) {
      this.startTimer()
      }


    switch (currentSceneNumber) {
      case 0:
        sceneButtons.push(
          <View key={10} style={styles.scenePage}>
            <Text style={styles.text2}>Welcome to InterVR ( prototype )</Text>
            <Text style={styles.text3}>InterVR is a Mix reality experience designed to simulate a virtual environment of an interview session, putting the users under pressure allowing them to practice and overcome their anxieties. 

</Text>

            <VrButton style={styles.buttonActive} onClick={this._onClickNext}>
              <Text style={styles.text}>Start an Interview </Text>
            </VrButton>
            <VrButton style={styles.buttonInActive}>
              <Text style={styles.text}> Previous Sessions </Text>
            </VrButton>
          </View>
        );
        break;
      case 1:
        sceneButtons.push(
          <View key={11} style={styles.scenePage3}>
            <View style={styles.QueMenuOpen}>
              <VrButton
                style={styles.buttonActive}
                onClick={this._onClickNext}
                onEnter={() => Environment.setBackgroundImage(asset("360_Zen.jpg"), { transition: 50 })}
                onExit={() => Environment.setBackgroundImage(asset("360_Office.jpg"), { transition: 50 })}
              >
                <Text style={styles.text}>General</Text>
              </VrButton>
              <VrButton style={styles.buttonInActive}
                onEnter={() => Environment.setBackgroundImage(asset("360_Lisa.jpg"), { transition: 50 })}
                onExit={() => Environment.setBackgroundImage(asset("360_Office.jpg"), { transition: 50 })}
              >
                <Text style={styles.text}>Tech</Text>
              </VrButton>
              <VrButton style={styles.buttonInActive}
                onEnter={() => Environment.setBackgroundImage(asset("360_Hassan.jpg"), { transition: 50 })}
                onExit={() => Environment.setBackgroundImage(asset("360_Office.jpg"), { transition: 50 })}
              >
                <Text style={styles.text}>Medical</Text>
              </VrButton>
              <VrButton style={styles.buttonInActive}
                onEnter={() => Environment.setBackgroundImage(asset("360_Aysha.jpg"), { transition: 50 })}
                onExit={() => Environment.setBackgroundImage(asset("360_Office.jpg"), { transition: 50 })}
              >
                <Text style={styles.text}>Policing</Text>
              </VrButton>
            </View>
          </View>
        );
        break;
      case 2:
        sceneButtons.push(
          <View key={11} style={styles.scenePage3}>
            <View style={styles.BeforeVideoScene}>

              <VrButton style={styles.buttonActive} onClick={this._onClickNext}>
                <Text style={styles.text}>Start</Text>
              </VrButton>
              
              <VrButton style={styles.buttonInActive} onClick={this._onClickPrev}>
                <Text style={styles.text}>Go Back</Text>
              </VrButton>

            </View>
          </View>
        );
        break;
      case 3:
        sceneButtons.push(
          <View key={11} style={styles.scenePage3}>
          <View style={styles.MenuVideoScene}>
            <VrButton
              style={styles.buttonActive}
              onClick={this._onClickNext}
            >
              <Text style={styles.text}>End the Session </Text>
            </VrButton>
            <Text>Answer time :{this.state.seconds}</Text>

          </View>
        </View>
          
        );
        break;
      case 4:
        sceneButtons.push(
          <View key={11} style={styles.scenePage3}>
            <View style={styles.QueMenuOpen}>

              <Text style={styles.text2}>Listen back to your answers before submission </Text>

              <VrButton style={styles.buttonInActive}>
                <Text style={styles.text}>Your Answer</Text>
              </VrButton>
              
              <VrButton style={styles.buttonActive} onClick={this._onClickPrev}>
                <Text style={styles.text}>Try Again</Text>
              </VrButton>

              <VrButton style={styles.buttonActive} onClick={this._onClickNext}>
                <Text style={styles.text}>Submit</Text>
              </VrButton>


            </View>
          </View>
        );
        break;


      default:
    }

    return (
      <View style={[styles.container, this.state.inTransition && { opacity: 0 }]} >
        {sceneButtons}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
  screen: {
    width: 480,
    height: 320,
  },
  text: {
    textAlign: "center", alignItems: "center", color: "#000000"
  },
  text2: {
    textAlign: "center", alignItems: "center", color: "#FFFFFF",
    fontSize: 22,fontWeight:"bold"
  },
  text3: {
    textAlign: "center", alignItems: "center", color: "#FFFFFF",
    fontSize: 18, fontWeight:"bold"
  },
  panel: {
    width: 1000, height: 600, padding: 20,
    backgroundColor: "rgba(140, 140, 140, 0.0)",
    justifyContent: "center", alignItems: "center",
  },
  section: {
    padding: 5,
    width: 750,
    backgroundColor: "#000000", borderColor: "#639dda", borderWidth: 2,
    flexDirection: "row"
  },
  buttonActive: {
    width: "85px", backgroundColor: "#FFFFFF",
    padding: 10, marginTop: 10, borderRadius: 5,

  },
  buttonInActive: {
    width: "85px", backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 10, marginTop: 10, borderRadius: 5,
  },
  scenePage: {
    width: 1000, height: 300, padding: 20,
    backgroundColor: "rgba(50, 50, 50, 0.5)",
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
  },
  scenePage3: {
    padding: 5, width: 1000,height: 1000,
    backgroundColor: "rgba(50, 50, 50, 0.0)",
    borderRadius: 5,
    justifyContent: 'center',alignItems: 'center',
  },
  QueMenuOpen: {
    paddingTop: 10, paddingBottom: 18,
    width: 300, height: "auto",
    position: 'absolute', right: 0,
    backgroundColor: "rgba(50, 50, 50, 0.65)",
    borderRadius: 5,
    justifyContent: 'center',alignItems: 'center',
  },
  BeforeVideoScene: {
    paddingTop: 10, paddingBottom: 18,
    width: 300, height: 150,
    position: 'absolute', right: 0,
    backgroundColor: "rgba(50, 50, 50, 0.65)",
    borderRadius: 5,
    justifyContent: 'center',alignItems: 'center',
  },
  MenuVideoScene: {
    //paddingTop: 10, paddingBottom: 18,
    width: 300, height: "auto",
    position: 'absolute', left: 20,
    backgroundColor: "rgba(50, 50, 50, 0.65)",
    borderRadius: 5,
    justifyContent: 'center',alignItems: 'center'
  },
  icon: {
    padding: 20,
    height: '80%',
    aspectRatio: 1,
  },
  arrowsContainer: {
    width: 100, height: 50, padding: 10, borderRadius: 5,
    position: "relative", marginLeft: 900, marginTop: 500,
    backgroundColor: "rgba(50, 50, 50, 0.7)",
  },
  arrowRight: {
    width: 50, height: 50,
    position: 'absolute', right: 0, marginTop: 5
  },
  arrowLeft: {
    width: 50, height: 50,
    position: 'absolute', left: 0, marginTop: 5
  }
});

module.exports = MediaAppTemplateScenePage;
