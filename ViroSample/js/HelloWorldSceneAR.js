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
  },
  test: {
    diffuseTexture: {uri: 'https://cdn.imgbin.com/6/19/10/imgbin-t-shirt-gildan-activewear-polo-shirt-clothing-t-shirt-V54ikFbZhrJ1WyUUEMNPgvdYJ.jpg'}
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
      setText('Point your camera to a flat surface')
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
        {/* <ViroImage
            source={{uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISERUSEhIVFRUWFxUVFRYVFRUVFRcXFhcXFhUXFRUYHSggGBolHhUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lICYvKzUtKy0tLS0rLS0tKy0tLS0tLS8tLSstLS02LS0tLS0tLS0vLSstLS0tKy0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUDBgcCAf/EAEcQAAIBAgIGBwQFCAgHAAAAAAABAgMRBCEFBhIxQVETImFxgZGxBzKhwSNSYnLRFDNCgpKywuEkRGNzk6Lw8RUWNEODs9L/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQMEBQL/xAAmEQEAAgIBAwQCAwEAAAAAAAAAAQIDESEEMTISIlFhM0ETI3EU/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeak1FOTdkk232LNgegcb1j1vxbry2K84QecIxajZbrXSu3+JVrWbFv+s1v8SX4muOkt8s89RHw7wDhcNZ8Yv6zV/bb9SVR1zxsf6xJ/ejCXqh/wAdvk/6K/DtQKPVHTTxVCMp26RJbVlZO+6SXC5eGa1ZrOpX1tFo3AADykAAAAAAAAAAAAAAAAAAAAAAAAB4q1YxV5NJc27Gu6T1shG8aPXf1v0V+J7pjtftDza8V7r/ABWKhSjtVJKK5t+nNmka2627UHSpRspZObydrq9o8mVWkcZOq9qbu+e/y5eBXY2CnBNWvF/yfqbsfTVrzPMst8024hQ42lt9/B9vaVcZ2dnk1ky5rwavkVUaPSQk5vZrKTSjstRcUrrrbnyzz3cDUzvSqHvC0nVqKC47+xcSqVZ7vhxNh0dioYWvCjUjaVWOVS+W1eyglbJcnfNgjlumhse8NVU0urbZlHdeO63hZeR0HR+kadaKcJeDya70cvZLw8nF3i3Hu3eRRlwRk5/a7HlmjqANT0drLKNlVW0uafW8nvNkweNp1Y7VOSkuPNd63owZMVqd2umStuyQACp7AAAAAAAAAAAAAAAAAAAKvT+mYYWntPOUsoR5vi32ItDlOt2kunxcrPq0+pHw95+dy/Bj9dueyrLf014fcfpKdae1Uk3fcs9lc0lyyRG2jFQz8HZ+OfyMsHnJcn/M6cRrsxPUm7XWaIs1e/C5ljKx5aAj9AuOZkhSSd0jNGmSI0lYCixGh4VK+3eyUVfZy6/B+Vsu4k4nRVOrBRqrbyScnlJvnlud23kT8FUUqEOqtqX0jnx6yyj3JW8jJsDaEPBwqQ6kpbceEn765KXCXfk+/eT1Ix7J6QS+uRko15RalGTi1xTafwMdj2ogbzqzpZ1ouM2nOPH6y3bua+ZeHOtA4noqsJXy2rPulkzopzeoxxW3H7bMN/VXkABnXAAAAAAAAAAAAAAAAI+kK/R0qk/qwlLyTZxSi3e73t5nXda62xg67/s3Hxn1V6nJFDOS5Wl4NWfob+kj2zLJ1E8wlQdpdjVvGOa+FzLQn9JU7oP4W+RFc7078Yuz7Gs4t9jI2BxXWm3vcrLuSX4s1s6y4mSKMVORniEvUUZeD7meYo9pAQ9ER/o9H+7p/uolsx6LoSWEpT2Xs7MYXytdK1vgZBvY+M+WPWyNkD7FHuKPKy3kXEYtK8eO7w3sCZReXl8TpOjq23ShLnGLffbM5jhm7XfH04fj4nQ9WZ3w0OzaXlJmTq49sSv6eeZhaAAwNYAAAAAAAAAAAAAAADV/aHVthFD69SK8EpT9Yo55tWVOqvuS7mbz7QqmeHhzdSXkor+JmkYWN1UpPtaOn00axsWefe9To7LclnFq0lzj+KNZVXYxE4cFaSfY8vkjbaT6t/Ca7eaNP0jR/pLccrRs+1N3jl5mhTLY8NVJ9ORQYabSjG+bZcTnbMgWFNGRIj4R9RGeISi6Pm+ghG72Vd2u7XTavbmZUYtHfml4/vMz00BkiDynmYq0rNdoHrE11GEpPck2+OSXIqsBhXJKptR62ad7xXJJcWst/I86dqSjGKTafSRdlvkoqU2u1dXcSNGRjZyp+5LNxysnzV93cEJ9BcNratxN71RlfD905eifzNDTV7bS7kkjddSql6c48pJ+aS/hM/Ux/WuwebYgAc1tAAAAAAAAAAAAAAAAaDr5UvjKMeVJv9qT/wDlGsYqm1U2o718eaL7Xqoljou6ypxT7Lyk8+WVn4lRW9+51sP44YMnnI81tR4rNc/5mn0+tiK7fCSir8lFfibhWSSd0rPPPdfvNYxdHo6k1azkqU33ypQk/UsVpOj43m3yJ2KnujzI2jo2jc90XtVO4kXdHKJnpkZSyJEHkQliwFJfkyltpNTlHZ4tbbV1/rgzPFZEPR+dKHi/8zZNZAxreeMSskz2lmKq6pI17W+rsQw9Vb4Vo+TjJSv4E2FDo30lNXhJXlD1ce3sK/XNv8niuDqQv4Xat5EzV6u3Do27uOa5tEoWypxlFNJW3po2jUafWqxvwi/JtfM1SjOMHa7SfBppeBtepcPpKkrZbKV+d3/Ioz/jlbi84bcADltwAAAAAAAAAAAAABgiaWrqnQqzbso05y8otkxG50S4rj30lapVqVGnOcpXW1ZXeS3WyWXgTcJU6uc1K26Szv32PeGp3it78vwMcsNsS2ouUJcXGN0/vKKszsuaz9MmnsyTtwSTIOtU41MZKpBWjOnh5RSVkk6FOytwM9VqW92lvvFSt2vdl3FZXwVSlPYqy2pKMH3RlFShF9qi0vAjXu2fpkc9mJn0bDjzIT6zS8y0oKx6Qlt8CWl1fAhU3mTFKyISwaI/MU+2N/MmkfQ9SP5LBbHW4Su8o33W/wBb+wzyyIGO2Z6e5nxH1Eii1lgnhp3drSpyT5NTivmzDgnZRe6S8v8AYtNIYZTp1Ivdsyk12QW21/lKvR8uj6knPZ4PZd49l7NNBC9p1NuN1Z803l6MvtTsbKnW6OUVs1Mk029mUbtJprc8/gajTq2d4Vb9jUWvkXOhsXs1acnZraW52Tz5fhc8ZK+qsw90nVol08AHIdAAAAAAAAAAAAAACp1rqbODrv7DX7XV+ZbFBr1K2Arf+NedSB7x83j/AF5v4y59hYZH2rQXNLvivmhg3kSWddz2LBYLpakKTSkpyjF2TStfO/Ddci67TvpCuu2C8qcF8jaNUMPfFJ/VjKXHsj/EaZrNV2sfiHe/0sl+z1fkVRO8uvp7mPZv7YMNTsTKZip2aM0FYtVpFF5kut7pDw28lN3fcEvOiPzFPu+bJkkQNFN9BTdv0V58ieBgiz2meXvAFjoXCRq1thrKVOrF90qcov8AeNWwyayUt2TjLemsmrm5aof9SvuyNb1kw6p42tG36bms+E+v/EVxb+yY+nuY9kT9vNJ3ed/Un0E4u633v5biDhUWKLHh02nK6T5pM9GLC+5H7sfQynGnu6UAAIAAAAAAAAAAADX9fV/QKvfT/wDbA2AoNe0/yCrb+z8ukgWYvOP9h4yeMue4Fk2RX4GXY0+RPcjrMDa9R6OVSo+aivDN+sTllaoqtWpUS96pOX7Um/mdd0ZHoNHynx6OpV+Da+CRyDR0E7SjyzRnwzu9pW5OK1hMw8+DyZKRinHmn3mVSNCllpsy1H1WYaC4nuq+HiEs+jq81hKcE+rlO2W/v3kqlO6Ieh88PS7YR+KPdOWzK3AaNs1RZnxmSorowwlbes+YF7qerYlfcl8iB7ScNs4mnU4ThZ98Hn8JRJWrFXZxVPt2l5xdvikWntHwyeGVVr83ON/uzew/i4eRltPpzx9r6xvFLScCyzZTYTqtcYvcy328jUodNoe7HuXoezFhXeEX9mPoZTjT3dKAAEAAAAAAAAAAABRa70lLA1lJ2SUHl9mcX8i9NR9puKcMJGKv9JVjF23tJSlbzjEswxu8PGSdVlouEulZWavzu/xJ9JKTSW9tRfB2k7ZxZXYRZZKz4q7tl2tZl7oOLliKS2f043W+yXWunxWR1bTqNsERudNw1wqqjo+tbJKn0a/WtTX7xx3Bx2JX4cV2c0dP9qs3/wAPlFfpVILyvP1gjnlBJqL4NIz9JHs39ruo8tJq3b8jzsn3Dq14PdwPTppcTSpe4uxjqO0ZSfJ28j1FX7jDpF/RyfBJ+gQsMHhJQoUZXVnCKir59WKWaPuIjtK/FHylHZhTfKMV4WRIyefMhLDh6t1ZmSRHq02ndHqGI4MkTMDV2akJfVlGV+5pm6644fbwOIW+1Nz/AMPr/wAJod75pnR8K+mw0drPpKaUv1o2fzMnU8TWzRg5iYcbw1KUPcd4vgy3w829yV+MW1f4FRRw1Sm7KW68WmrvLJ+ha4dXydr8OGfZyZrZnUdD1VOhSkne8I+aVn8SYUup9VSwsfsynF33p7Tb9S6ORkjVph0aTusSAA8PQAAAAAAAAAABpntTjfC0sv8AvLPl9HUy8TczWPaLQ2sE5fUnCXm9j+MtwzrJCvL4S59o+nHLJPvNw1QoxeKbe+NNyilu3qLfkzTsFUSV20lzbsjZ9UtIU3jIKFSEnKE4tRkm921uX3To5vCWPH5Qt/aVhpTwTks+jqQm1zjnF/vHNtFtOGzfOMnbuOz6YwfTUKlJ/pwlHxayfnY4pRfR1HSq9SSbinuu09z+16+tPSW3WYW9RHu2tGLcwqElxv3nuMEalBFXI2ll9DUf2ZehNSIWmH9DP7r9AhaUFeEfur0RjjNxduB7wvuQ+7H0RknC4SKV9x9i0R+jktx6vfevgB7mzomr7/o1LK3URzGc5SqRoUryqTaXZBPi7cf9zq+BobEIxW6KS8lYx9XPEQ0dPHMy5brlhKmGxjtbYrbVSDabtdrbWT3pvyaGHpTULtRf3XbyT/EvfadQe3han6K6WD75dHJfCMvIraKvT8C/Db1Y4lVkjV5htWotVSpVP7z+GOfw+BspqPs+92svtx9H+Btxgz/klrxeEAAKVgAAAAAAAAAABA09gHiMNVoxajKcWotq6Ut8W1yukTwTE6ncImN8OX0PZjXb+lr0+9bcvg0jZdWdRMPhKqrbUqlVJqLaUYxvk3GK42bV22bWC22e9o1MvFcVI50+NGk68an/AJRerSSc2uvD632l9r179+7nxo8UvNJ3D1asWjUuB08TXwzcKkZSinbP3424O+/uefaW2C0hTqe7JX5bpfsvPyOqaV0HQxC+kgm+EllJfrL0eRqWkPZvRl7k2uyUVL4q1vI3U6qk9+GS2C0dlHsdpD0vH6Gf3X6FtP2e14+5Xy+/NfCxjqakYxq3Svl+cfoy2M1Pl4/jt8GHfUjy2V6GSL5Znj/knHNKPTKKSUVZpOyVveir/EzUvZ9iXlKvl/eTfyH82P5P47/CNXxUYe9JLxIX5XOq9ihFuUsk7Xf6sfmzacF7Pacc5zb+6rfF39DatF6HpUFanBR5ve33t5lV+qpHblZXBae6l1O1X/Jl0lTOrLtvs3358ZPiza0gkfTBe83nctVaxWNQ0L2sVqkKeHcacpxU57TWUYuyUdp8L3l5GoUdYKkYZ0Lrsnn8Yna2r5MrcTq/hanvUIZ77LZ/dsacPURSvpmFOTDNp3EtY9l2kIVliHG6alTvGSs1dS/14G9EPRui6OHi40aUaabu9lWu915Pe33kwoy3i95tC3HX011IACt7AAAAAAAAAAAAAAAAAAAFgAPmyfNk9AD5YWPoAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z'}}
            position={[0, 1, -2]}
            dragType="FixedToWorld"
            onDrag={()=>{}}
        /> */}
        {/* <ViroARPlane minHeight={.5} minWidth={.5} alignment={"Horizontal"}> */}
          <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
              {/* polo shirt red */}
              {/* <Viro3DObject
                  source={require('/Users/naufalyunan/OneDrive/HACKTIV8/Final Project/ARtest/ViroSample/js/res/polo_shirt/13647_Polo_Team_Shirt_v2_L3.obj')}
                  resources={[require('/Users/naufalyunan/OneDrive/HACKTIV8/Final Project/ARtest/ViroSample/js/res/polo_shirt/13647_Polo_Team_Shirt_v2_L3.mtl'),
                  require('/Users/naufalyunan/OneDrive/HACKTIV8/Final Project/ARtest/ViroSample/js/res/polo_shirt/13647PoloTeamShirt_cloth_diffuse.jpg')]}
                  position={[0, .5, 0]}
                  scale={[.02, .02, .02]}
                  rotation={[90, 180, 180]}
                  animation={{name: "rotate", run: true, loop: true}}
                  type="OBJ" /> */}
              {/* pants */}
              <Viro3DObject
                  source={require('/Users/naufalyunan/OneDrive/HACKTIV8/Final Project/ARtest/ViroSample/js/res/polo_pants/13648_Polo_Pants_v2_L3.obj')}
                  resources={[require('/Users/naufalyunan/OneDrive/HACKTIV8/Final Project/ARtest/ViroSample/js/res/polo_pants/13648_Polo_Pants_v2_L3.mtl'),
                  require('/Users/naufalyunan/OneDrive/HACKTIV8/Final Project/ARtest/ViroSample/js/res/polo_pants/13648PoloPants_cloth_diffuse.jpg')]}
                  position={[0, .5, -2]}
                  scale={[.02, .02, .02]}
                  rotation={[90, 180, 180]}
                  animation={{name: "rotate", run: true, loop: true}}
                  type="OBJ" />
              {/* polo shirt two */}
          </ViroNode>
        {/* </ViroARPlane> */}
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
    fontSize: 20,
    color: 'gold',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
