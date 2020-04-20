'use strict';

import React, { useState } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroNode,
  ViroAnimations,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroARTrackingTargets,
  ViroDirectionalLight,
  ViroImage
} from 'react-viro';

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg')
  }
})

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

ViroARTrackingTargets.createTargets({
  "targetOne" : {
    source : require('./res/test3.arobject'),
    type: "Object"
  },
  "tesla": {
    source: require('./res/tesla.jpg'),
    orientation : "Up",
    physicalWidth : 0.1 // real world width in meters
  }
});


function HelloWorldSceneAR() {
  const [ text, setText ] = useState('Initializing AR...')
  
  function _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Belajar AR')
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

    return (
      <ViroARScene onTrackingUpdated={_onInitialized.bind(this)} >
        <ViroText text={text} scale={[.5, .5, .5]} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} 
          color="#ffffff" 
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={5}
          shadowOpacity={.7}/>
        {/* <ViroARPlaneSelector minHeight={.5} minWidth={.5}> */}
          <ViroBox position={[0, -0.25, -2]} 
            scale={[.3, .3, .3]}
            materials={["grid"]}
            animation={{name: "rotate", run: true, loop: true}}
            physicsBody={{
              type:'Dynamic', mass:1
            }}/>
        {/* </ViroARPlaneSelector> */}
        <ViroImage
            height={2}
            width={2}
            source={{uri:"data:image/jpeg;base64,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"}}
            position={[0, 1, -2]}
            scale={[0.5, 0.5, 0.5]}
        />
        <ViroARImageMarker target={"tesla"}>
          <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
              <Viro3DObject
                  source={require('./res/polo_shirt/13647_Polo_Team_Shirt_v2_L3.obj')}
                  resources={[require('./res/polo_shirt/13647_Polo_Team_Shirt_v2_L3.mtl'),
                  require('./res/polo_shirt/13647PoloTeamShirt_cloth_diffuse.jpg')]}
                  position={[1, .25, -1]}
                  scale={[.02, .02, .02]}
                  rotation={[90, 180, 180]}
                  type="OBJ" />
          </ViroNode>
        </ViroARImageMarker>
        {/* <ViroARObjectMarker target={"targetOne"} >
          <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
            <Viro3DObject
                source={require('./res/polo_shirt/13647_Polo_Team_Shirt_v2_L3.obj')}
                resources={[require('./res/polo_shirt/13647_Polo_Team_Shirt_v2_L3.mtl'),
                require('./res/polo_shirt/13647PoloTeamShirt_cloth_diffuse.jpg')]}
                position={[0, .25, -1]}
                scale={[.02, .02, .02]}
                rotation={[90, 180, 180]}
                type="OBJ" />
          </ViroNode>
        </ViroARObjectMarker> */}
      </ViroARScene>
    );
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Serif',
    fontSize: 30,
    color: 'gold',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
