import React, { useEffect } from 'react';
import {
  View,
  Animated,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image
} from 'react-native';

import { SIZES, icons } from "../../constants";

import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from "../../components";

import Swiper from 'react-native-swiper';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const GalleryModal = ({ isVisible, onClose }) => {

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
  const [showGalleryModal, setShowGalleryModal] = React.useState(isVisible)

  const [nodes, setNodes] = React.useState([]);
  const [detailViewVisible, setDetailViewVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function renderGallery() {
    
    const getPhotos = async () => {
      const photos = await CameraRoll.getPhotos
      ({
        first: 50
      })
  
      setNodes(photos.edges.map(edge => edge.node))
    }

    getPhotos();

    return (
      <SafeAreaView>
        <ScrollView>
          {
            detailViewVisible ? (
              <Swiper
              loop={false}
              index={selectedIndex}>
                {
                  nodes.map(
                    (node, index) => (
                      <View
                      key={index}
                      style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center',

                      }}>
                        <View>
                        <IconButton
                          icon={icons.close}
                          onPress={() => setDetailViewVisible(false)}
                          />
                        </View>

                        <Image
                        style={{
                          width: "100%",
                          flex:1,
                        }}
                        resizeMode="contain"
                        source={{uri:node.image.uri}}/> 
                      </View>
                    )
                  )
                }
              </Swiper>
            ) : (
              <View 
              style={{
                flex:1,
                flexDirection:'row',
                flexWrap: 'wrap'
              }}>
                {
                  nodes.map(
                    (node, index) => (
                      <TouchableOpacity
                      key={index}
                      style={{
                        height: 100,
                        minWidth: 100,
                        flex: 1
                      }}
                      onPress={()=> {
                        setDetailViewVisible(true)
                        setSelectedIndex(index)
                      }}>
                        <Image
                        style={{
                          height: 100,
                          minWidth: 100,
                          flex: 1,
                          marginHorizontal:5,
                          marginVertical: 5
                        }}
                        source={{uri: node.image.uri}}/>

                      </TouchableOpacity>
                    )
                  )
                }
              </View>
            )
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0,1],
    outputRange: [SIZES.height, 1]
  });

  useEffect(()=> {
    if(showGalleryModal) {
        Animated.timing(modalAnimatedValue,{
          toValue:1,
          duration: 500,
          useNativeDriver: false
        }).start();
    } else {
      Animated.timing(modalAnimatedValue,{
        toValue:0,
        duration: 500,
        useNativeDriver: false
      }).start(()=> onClose());
    } 
  }, [showGalleryModal])

  function renderHeader() {
    return(
      <View>
        
    {/*close*/}
    <IconButton
      icon={icons.close}
      onPress={() => setShowGalleryModal(false)}
      />
      </View>
    )
  }


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      >
        <View
          style={{
            flex: 1
          }}
          >

            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: modalY,
                width: "100%",
                height: "100%",
                padding: SIZES.padding,
                backgroundColor: '#251B37'
              }}>
          <View>
            {renderHeader()}
            {renderGallery()}
          </View>
            </Animated.View>

            

          </View>
      </Modal>
  )
}

export default GalleryModal;