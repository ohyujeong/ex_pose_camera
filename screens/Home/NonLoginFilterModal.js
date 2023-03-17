import React, { useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import { SIZES, dummyData } from "../../constants";

import { FlatList } from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context';

// loadFrameModal 사용해서 selectedFrameId넘김
const NonLoginFilterModal = ({ isVisible, onClose, loadFrameModal, BaseUrl }) => {

  const categoryUrl = `${BaseUrl}/frame?category=`;

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
  const [showNonLoginFilterModal, setShowNonLoginFilterModal] = React.useState(isVisible)
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState('half');

  useEffect(()=> {
    if(showNonLoginFilterModal) {
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
  }, [showNonLoginFilterModal])

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0,1],
    outputRange: [SIZES.height, SIZES.height-320]
  })

  const frameList = (category) => {
    
     useEffect(() => {
      getAllFrames(category);
    },[selectedCategory]);

    const getAllFrames = (selectedCategory) => {

        fetch(`${categoryUrl}${selectedCategory}`,{
          method : "GET",
        })
        .then((res) => res.json())
        .then((resJson)=>{setData(resJson.data)})
        .catch(console.error)
        .finally(() => setIsLoading(false));
      
    }

    const renderCategory = ({item}) => {
       
      return (

        <View>
          <TouchableOpacity
          onPress={()=> loadFrameModal(item.frameId)}>
          <Image
          source={{uri: item.framePath}}
          style={{width:150,height:150}}
          resizeMode= 'contain'
          />
          </TouchableOpacity>
      
          {/* 프레임 이름 텍스트 */}
          <View>
            <Text
            style={{
              color: "white",
              marginTop: 10,
              textAlign: 'center',
            }
            }
            > {`${item.frameName}`} </Text>
          </View>
        </View>
      )
      
    }
    return (
      <SafeAreaView>
        {
          isLoading ? <ActivityIndicator/> : (
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => `key-${item.frameId}`}
            renderItem={renderCategory}
            />
          )
        }
      </SafeAreaView>

    )
  }
    
  function renderFilterOption() {
    return (
      <FlatList
        horizontal
        data={dummyData.NonLoginFilterOption}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 5,
          marginBottom: 20,
        }}
        
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginRight: index == dummyData.NonLoginFilterOption.length -1 ? SIZES.padding : 10
            }}
            
        > 
        {/* 카테고리 버튼 */}
      <Text
        style={{backgroundColor:'#FFCACA', 
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius:5,
        width:65,
        height:23,
      }}
        onPress={()=>setSelectedCategory(item.category)}
        >
        {item.name}
        </Text>
        </TouchableOpacity>
        )}
      />
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
            <TouchableWithoutFeedback
              onPress={() => setShowNonLoginFilterModal(false)}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
            </TouchableWithoutFeedback>

          {/* 프레임 선택창 전체모달 */}
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
            {renderFilterOption()}
            {frameList(selectedCategory)}
          </View>
            </Animated.View>
          </View>
      </Modal>
  )
}

export default NonLoginFilterModal;