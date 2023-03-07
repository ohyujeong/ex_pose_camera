import { correctBorderRadius } from 'framer-motion/types/render/dom/projection/scale-correction';
import React from 'react';
import {
    View,
    Text,
    Animated
} from 'react-native';

import { TextButton } from "../../components"; 
import { COLORS, SIZES, constants, FONTS } from "../../constants";
import Walkthrough1 from './Walkthrough1';
import {useRoute} from "@react-navigation/native";

import ImageCropPicker from 'react-native-image-crop-picker';


const Walkthrough = ({route, navigation}) => {

        const [images, setImages] = React.useState([]);
        const [chooseState, setChoosestate] = React.useState(false);

        const openImagePicker = () => {
            let imageList = [];

            ImageCropPicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
                forceJpg: true,
                compressImageQuality: 0.8,
                minFiles: 10,
                maxFiles: 20,
                mediaType: 'photo',
                includeBase64: true,
            })
            .then(response => {
                // console.log('Response: ', response);
                response.map(image => {
                    imageList.push({
                        filename: image.filename,
                        path: image.path,
                        data: image.data,
                    });
                    setImages(imageList);
                })
            .then(setChoosestate(true))
            .then(sendImages(imageList))
            .catch(e => console.log('Error ', e.message));
            })

        }
    
    //이미지 리스트 api연결 중
    const sendImages = (images) => {
        const testList = [];
        const test = () => {
            
            for (let i =0; i<images.length; i++) {
            console.log("test message")
            // fetch(``,{method: "POST"})
            // .then((res)=>res.json())
            testList.push(images[i].filename);
            }
            return testList;
        }

        
        test();
        return (
            console.log(testList)
        )
    }

    //API정보 이용 시
    const [userName, setUserName] = React.useState("");

    //토큰 전달 완료
    const {token} = route.params;

    //User정보 호출 완료
    const userNameInfo = () => {

        const BaseUrl = "http://52.79.250.39:8080";
        const userInfoApi = `${BaseUrl}/user/me`;

        //사용자 데이터 fetch 정보 호출 완료
        fetch(`${userInfoApi}`, {
                method : "GET",
                headers : {
                    Authorization : `Bearer ${token}`
                }
                }) 
                .then((res) => res.json())
                .then(res => {
                setUserName(res.nickname)
                console.log(userName)
                })
                .catch(console.error)
    }

    userNameInfo();

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const Dots = () => {
        const dotPostition = Animated.divide(scrollX, SIZES.width)

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItem: 'center',
                    justifyContent: 'center'
                }}
            >
                {
                    constants.walkthrough.map((item, index) => {
                        const dotColor = dotPostition.interpolate({
                            inputRange: [index -1, index, index+1],
                            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: 10,
                                    height: 10,
                                    backgroundColor: dotColor
                                }}
                                />
                        )
                    })
                }
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: SIZES.height * 0.2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.height > 700 ? SIZES.padding : 20
                }}
                >

                <Dots />

                {/*Buttons*/}
                {chooseState ? <View></View> :   
                   <View
                   style={{
                    flexDirection: 'row',
                    height: 55
                }}>
                    <TextButton
                        label="추천없이 사용"
                        contentContainerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGrey
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => {
                            navigation.navigate("Home", {token: token})
                    }}
                    />
                    
                    <TextButton
                        label="포즈 추천받기" 
                        contentContainerStyle={{
                            flex: 1,
                            marginleft: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                        labelStyle={{
                            ...FONTS.h3
                        }}
                        onPress= {openImagePicker}
                    />
                    </View>
                }
            </View>
        )
    }
    return (
       
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.light
            }}
        >
            {/* {chooseState ?
            <Text>{userName}님의 데이터를 분석중입니다.</Text> 
              : <Text> {userName}님 반갑습니다! </Text> 
          } */}
            
            <Animated.FlatList
                data={constants.walkthrough}
                keyExtractor={(item) => item.id}
                horizontal
                snapToInterval={SIZES.width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false
                    }
                )}

                renderItem={({item, index}) => {
                    return (
                        <View
                            style={{
                                width: SIZES.width,
                                justifyContent: 'center'
                            }}
                        >

                            {/* Walkthough Images */}
                            <View
                                style={{
                                    flex:1,
                                    justifyContent: 'center'
                                }}
                            >
                                {index == 0 && <Walkthrough1/>}
                            </View>

                            {/*Title & Descriptions*/}
                            <View
                                style={{
                                    height: SIZES.height * 0.35,
                                    alignItems: 'center',
                                    justifyContent:'flex-start',
                                    paddingHorizontal: SIZES.padding
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h1
                                    }}
                                    >
                                    {item.title}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: SIZES.radius,
                                        textAlign: 'center',
                                        ...FONTS.body3,
                                        color: COLORS.grey
                                    }}
                                >
                                    {item.sub_title}        
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
            {renderFooter()}
        </View>
    )
}
  
export default Walkthrough;