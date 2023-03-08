import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import { COLORS, FONTS, SIZES, constants, icons, dummyData } from "../../constants";

import { FlatList } from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from "../../components";


const FrameModal = ({ isVisible, onClose, selectedFrameId, BaseUrl }) => {

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
  const [showFrameModal, setShowFrameModal] = React.useState(isVisible)

  const frameId = selectedFrameId
    
  console.log(frameId)
  const frameUrl = `${BaseUrl}/frame/{frameId}?frameId=${frameId}`;
  // const [framePath, setFramePath] = React.useState('')
  const [data, setData] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  
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