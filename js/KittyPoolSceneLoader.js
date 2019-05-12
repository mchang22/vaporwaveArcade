import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';

const API_KEY = '4B132E39-801E-47A0-8F11-E44215B1CE84';

const CatScene = require('./CatScene');
// const JoshScene = require('./JoshScene');

const GAME_STATES = {
  INTRODUCTION: 'INTRODUCTION',
  IN_GAME: 'IN_GAME',
  POST_GAME: 'POST_GAME',
};

let timerIntervalId;

export default class KittyPoolSceneLoader extends Component {
  constructor() {
    super();
    this.state = {
      gameState: GAME_STATES.INTRODUCTION,
      score: 0,
      timer: 10,
      timeLeft: 10,
    };
    this.startGame = this.startGame.bind(this);
    this.gameEnd = this.gameEnd.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.checkTime = this.checkTime.bind(this);
    this.beginTimer = this.beginTimer.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
  }

  render() {
    switch (this.state.gameState) {
      case GAME_STATES.INTRODUCTION:
        return this.renderIntro();
      case GAME_STATES.IN_GAME:
        return this.renderCatGame();
      case GAME_STATES.POST_GAME:
        return this.renderPostGame();
    }
  }
  ////
  // render conditional states

  renderIntro() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>{`Kitty Pool`}</Text>
          <Text
            style={localStyles.text}
          >{`You have thirty seconds to catch as many cats as you can!  Tap the cats to rescue them.`}</Text>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this.startGame}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>Start Level</Text>
          </TouchableHighlight>
          {/* <Text>
            timer here
          </Text> */}
        </View>
      </View>
    );
  }

  renderCatGame() {
    return (
      <View style={localStyles.flex}>
        <ViroARSceneNavigator
          apiKey={API_KEY}
          initialScene={{ scene: CatScene }}
          viroAppProps={{
            gameEnd: this.gameEnd,
            incrementScore: this.incrementScore,
            score: this.state.score,
            timer: this.state.timer,
            beginTimer: this.beginTimer,
          }}
        />
        <View>
          <TouchableHighlight
            style={localStyles.hudButton}
            underlayColor="#68a0ff"
            onPress={this.props.propObj.returnToMenu}
          >
            <Text style={localStyles.buttonText}>QUIT</Text>
          </TouchableHighlight>
          <Text style={localStyles.timerText}> Score:{this.state.score}</Text>
          <Text style={localStyles.timerText}> Time Left:{this.state.timeLeft}</Text>
        </View>
      </View>
    );
  }

  renderPostGame() {
    console.log(this.state);
    return (
      <View>
        <Text style={localStyles.loseText}>
          Game has ended you won i guess
        </Text>
      </View>
    );
  }

  ////
  // helper functions

  startGame() {
    this.setState({
      gameState: GAME_STATES.IN_GAME,
    });
  }

  gameEnd() {
    this.setState({
      gameState: GAME_STATES.POST_GAME,
      timeLeft: 10,
    });
  }

  incrementScore(colliderTag) {
    // console.log(colliderTag);
    this.setState({
      score: this.state.score + 1,
    });
  }

  setTimer(timeDiff) {
    // calc new time
    this.setState({
      timeLeft: this.state.timer - timeDiff,
    });
  }

  checkTime() {
    const timeLeft = this.state.timeLeft;
    console.log(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerIntervalId);
      this.gameEnd();
    }
  }

  // function that gets run when game starts.
  beginTimer() {
    timerIntervalId = setInterval(this.decrementTime, 1000);
  }
  
  
  decrementTime() {
    let currentTime = this.state.timeLeft;
    let newTime = currentTime - 1;
    this.setState({
      timeLeft: newTime,
    });
    
    if (this.state.timeLeft <= 0) {
      this.handleGameOver()
    }
  }
  
  handleGameOver() {
    clearInterval(timerIntervalId);
    this.gameEnd();
  }
  
  
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  flex: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  topMenu: {
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  timerText: {
    color: '#ff0000',
    textAlign: 'right',
    fontSize: 25,
  },
  loseText: {
    color: '#ff0000',
    textAlign: 'right',
    fontSize: 45,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(123,123,231,.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(123,087,231,.4)',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  hudButton: {
      height: 55,
      width: 100,
      paddingTop: 20,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: 'rgba(123,123,231,.4)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(123,087,231,.4)',
  }
});

module.exports = KittyPoolSceneLoader;
