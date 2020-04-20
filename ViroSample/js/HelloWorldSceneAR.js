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
            source={require('./res/sample.png')}
            position={[0, 1, -2]}
            dragType="FixedToWorld"
            onDrag={()=>{}}
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

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Serif',
    fontSize: 30,
    color: 'gold',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
