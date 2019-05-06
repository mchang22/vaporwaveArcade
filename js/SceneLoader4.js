/* eslint-disable default-case */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-use-before-define */
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

import {
  ViroARSceneNavigator
} from 'react-viro';


const API_KEY = "4B132E39-801E-47A0-8F11-E44215B1CE84";


const BallGameScene = require('./BallGameScene');


const GAME_STATES = {
  INTRODUCTION: "INTRODUCTION",
  IN_GAME: "IN_GAME",
  POST_GAME: "POST_GAME"
}


export default class SceneLoader4 extends Component {
  constructor() {
    super()
    this.state = {
      gameState: GAME_STATES.INTRODUCTION,
      score: 0,
    }
    this.startGame = this.startGame.bind(this);
    this.gameEnd = this.gameEnd.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
  }


  render() {
    switch (this.state.gameState) {
      case GAME_STATES.INTRODUCTION:
        return this.renderIntro();
      case GAME_STATES.IN_GAME:
        return this.renderBallGame();
      case GAME_STATES.POST_GAME:
        return this.renderPostGame();
    }
  }


  ////
  // render conditional states
  
  renderIntro() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>{`Welcome to Ball Game!`}</Text>
          <Text style={localStyles.text}>{`You have thirty seconds to catch as many balls as you can in the cup.`}</Text>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this.startGame}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Start Level</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  renderBallGame() {
    
    // setTimeout(() => {this.gameEnd()}, 6000)
    
    return (
      <View style={localStyles.flex}>
        <ViroARSceneNavigator
          apiKey={API_KEY}
          initialScene={{ scene: BallGameScene }}
          viroAppProps = {{
            gameEnd: this.gameEnd,
            incrementScore: this.incrementScore,
            score: this.state.score
          }}
          
        />
        <View>
          <TouchableHighlight style={localStyles.buttons}
            underlayColor="#68a0ff"
            onPress={this.props.propObj.returnToMenu}
          >
            <Text>
              BACK
        </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  renderPostGame() {
    return;
  }
  
  //
  ////
  
  ////
  // helper functions
  
  startGame() {
    this.setState({
      gameState: GAME_STATES.IN_GAME
    })
  }
  
  gameEnd() {
    this.setState({
      gameState: GAME_STATES.INTRODUCTION
    })
  }
  
  incrementScore(colliderTag) {
    console.log(colliderTag);
    this.setState({
      score: this.state.score + 1
    })
  }
  

}



var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
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
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
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
    borderColor: 'rgba(123,087,231,.4)'
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
  }
});

module.exports = SceneLoader4