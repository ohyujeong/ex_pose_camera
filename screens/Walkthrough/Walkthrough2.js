import React from 'react';
import {
  View,
  Image
} from 'react-native';

import { FlatList } from "react-native-gesture-handler"

import {constants} from "../../constants";

const ITEM_WIDTH = 120;

const Walkthrough2 = () => {
  
  const [row2Images, setRowImages] = React.useState([
    ...constants.walkthrough_02_01_images
  ])

  const [currentPosition,setCurrentPosition] = React.useState(0)

  const row1FlatListRef = React.useRef()

  return (
    <View>
      {/*Slider 1*/}
      <FlatList
        ref={row1FlatListRef}
        delcelerationRate="fast"
        horizontal
        showsHorizontalScrollIndicator={false}
        listKey="Slider2"
        keyExtractor={(_, index)=> `Slider2_${index}`}
        data={row2Images}
        renderItem={({item, index}) => {
      return (
        <View
        style={{
          width: ITEM_WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 120
        }}
        >
          <Image
            source={item}
            style={{
              width:250,
              height: 250,
              
            }}
            resizeMode= 'contain'
          />
          </View>
        )
        }}
      />
    </View>
  )
}

export default Walkthrough2;