/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { useState } from 'react';

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
const sharedprops = {
  apiKey:"API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
const InitialARScene = require('./js/HelloWorldSceneAR');
const InitialVRScene = require('./js/HelloWorldScene');

const UNSET = "UNSET";
const VR_NAVIGATOR_TYPE = "VR";
const AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
const defaultNavigatorType = UNSET;

function ViroSample () {

  const [navigatorType, setNavigatorType] = useState(defaultNavigatorType)
  const [sharedProps, setSharedProps] = useState(sharedprops)

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  if (navigatorType == UNSET) {
    return _getExperienceSelector();
  } else if (navigatorType == VR_NAVIGATOR_TYPE) {
    return _getVRNavigator();
  } else if (navigatorType == AR_NAVIGATOR_TYPE) {
    return _getARNavigator();
  }
  // Presents the user with a choice of an AR or VR experience
  function _getExperienceSelector () {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Welcome to disARner:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={_getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#000'} >

            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  function _getARNavigator () {
    return (
      <>
          <ViroARSceneNavigator {...sharedProps}
            initialScene={{scene: InitialARScene}}/>
          <Text style={{ backgroundColor: 'red', position: 'absolute',bottom: 10, margin: 10}}>
            Back Button
          </Text>
      </>
    );
  }
  
  // Returns the ViroSceneNavigator which will start the VR experience
  function _getVRNavigator () {
    return (
      <ViroVRSceneNavigator {...sharedProps}
        initialScene={{scene: InitialVRScene}} onExitViro={_exitViro}/>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  function _getExperienceButtonOnPress (navigatorType) {
    return () => {
      setNavigatorType(navigatorType)
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  function _exitViro () {
    setNavigatorType(UNSET)
  }
}

const localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "#F5FCFF",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "#F5FCFF",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#F5FCFF",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 50,
    color:'#000',
    textAlign:'center',
    fontSize : 30
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
