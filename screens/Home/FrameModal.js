import React from 'react';
import {
  View,
  Animated,
  Image
} from 'react-native';

import { icons } from "../../constants";

import { IconButton } from "../../components";


const FrameModal = ({ onClose, selectedFrameId, BaseUrl }) => {

  const frameId = selectedFrameId
    
  console.log(frameId)
  const frameUrl = `${BaseUrl}/frame/{frameId}?frameId=${frameId}`;
  const [data, setData] = React.useState([]);
  
React.useEffect(()=> {
  fetch(`${frameUrl}`)
  .then((res) => res.json())
  .then((resJson)=>{setData(resJson.data)}
  // console.log(framePath)
  ) 
  .catch(console.error)
  // .finally(() => setIsLoading(false));
},[selectedFrameId])

  

    return (
      <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0}}>

      {/*close*/}
      <IconButton
        icon={icons.close}
        onPress={() => onClose()}
        />
        <Image
          source={{uri: data.framePath}}
          style={{width: 400,
          height: 600}}
          resizeMode= 'contain'
          />
        </View>
    )
}


export default FrameModal;