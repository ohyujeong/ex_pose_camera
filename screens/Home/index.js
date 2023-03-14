import React from 'react';

{/*part3영상내용 중 home+scanproduct*/}
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  StyleSheet
} from 'react-native';

import {Camera, useCameraDevices} from "react-native-vision-camera";

import { IconButton} from "../../components";

import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  constants,
  images,
  dummyData
} from "../../constants";

import { FilterModal } from "..";

import { GalleryModal } from "..";

import { FrameModal } from "..";

// import RNFS from 'react-native-fs';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import { PressableOpacity } from 'react-native-pressable-opacity';
// import { SAFE_AREA_PADDING } from './Constants';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const Home = ({ route, navigation }) => {

  const BaseUrl = "http://52.79.250.39:8080";

  const camera = React.useRef(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [imageSource, setImageSource] = React.useState('file://','');

  const [camView, setCamView] = React.useState('back');

  //플래시, 전환 hook
  // const [flash, setFlash] = React.useState<'off' | 'on'>('off');
  // const supportsFlash = device?.hasFlash ?? false;
  // const {savingState, setSavingState} = React.useState<'none' | 'saving' | 'saved'>('none');

  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back :devices.front;
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const {token} = route.params;
  //토큰 전달 확인
  // console.log(`camera ${token}`)

  const [showGalleryModal, setShowGalleryModal] = React.useState(false)
  const [showFrameModal, setShowFrameModal] = React.useState(false)
  const [selectedFrameId, setSelectedFrameId] = React.useState('')

  const loadFrameModal = (selectedFrameId) => {
      setSelectedFrameId(selectedFrameId)
      console.log(selectedFrameId)
       setShowFrameModal(true)
  }

  //Permissions
  React.useEffect(() => {
    if (Platform.OS === 'android') {
    const getAllPermission = async () => {
        try {
          PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]).then(result => { 
            if(
              result['android.permission.CAMERA'] &&
              result['android.permission.WRITE_EXTERNAL_STORAGE'] &&
              result['android.permission.READ_EXTERNAL_STORAGE']
              === 'granted'
            ) {
              setShowCamera(true);
            } else {
              alert('Permissions denied', 'You need to give permissions');
            }
          });
        }
        catch (err) {
        alert('Camera permission err');
          console.warn(err);
        }
      };
      getAllPermission();
  }
  },[]); 

  //카메라 플래시, 전환 기능
  // const onFlashPressed = React.useCallback(() => {
  //   setFlash((f) => (f === 'off' ? 'on' : 'off'));
  // }, []);

  const capturePhoto = async () => {
    if (camera.current != null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

const onSavePressed = React.useCallback(async () => {
  if (selectedFrameId == '') {
  try {
    await CameraRoll.save(`file://${imageSource}`);
    setShowCamera(true);
    console.log(selectedFrameId);

  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    // setSavingState('none');
    alert('Failed to save!', `An unexpected error occured while trying to save your photo. ${message}`);
  }
}
else {
  try {
    fetch(`${BaseUrl}/frame/use?frameId=${selectedFrameId}`,{
      method : "PATCH",
      headers : {
          Authorization : `Bearer ${token}`
      }
      })
  //취향 업데이트 확인 완료
  //  .then((res)=>res.json())
  //  .then(res => console.log(res))
   .catch(console.error)

    await CameraRoll.save(`file://${imageSource}`);
    setShowCamera(true);
    
  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    // setSavingState('none');
    alert('Failed to save!', `An unexpected error occured while trying to save your photo. ${message}`);
  }
}

}, [imageSource]);

const frameCloseNnull = () => {
  setShowFrameModal(false);
  return (
  setSelectedFrameId('')
  )
}

  function renderHeader() {
    return(
      <View
       style={{
        flexDirection:'row',
        paddingTop: SIZES.padding * 2,
        paddingBottom: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        alignItems: 'center',
        backgroundColor: '#251B37',
        zIndex: 1
      }}
      >

    {/*close*/}
    <IconButton
      icon={icons.close}
      onPress={() => navigation.goBack()}
      />

    <IconButton
      icon={icons.cameraFlipIcon}
      onPress={()=> {
        camView === 'back' ? setCamView('front') : setCamView('back')
      }}
      />

    {/* {supportsFlash && (
          <PressableOpacity style={styles.button} onPress={onFlashPressed} disabledOpacity={0.4}>
            <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="black" size={24} />
          </PressableOpacity>
        )}
    {supportsCameraFlipping && (
          <PressableOpacity style={styles.button} onPress={onFlipCameraPressed} disabledOpacity={0.4}>
            <IonIcon name="camera-reverse" color="black" size={24} />
          </PressableOpacity>
        )} */}
      </View>
    )
  }

  function renderCamera() {
    if (device == null) {
      return (
        <View
          style={{
            flex: 1
          }}
          />
      )
    } else {
        return (
        <View
         style={{
            flex: 1
        }}
        >
            <Camera
              ref={camera}
              style={{flex: 1}}
              device={device}
              isActive={showCamera}
              enableZoomGesture
              photo={true}
              />
      
      {showFrameModal &&
      <View
      style= {{
        position:'absolute',
        top: 0 ,
        left: 0,
        right: 0,
        bottom: 0
       }}>
      <FrameModal
        isVisible={showFrameModal}
        onClose={() => frameCloseNnull()}
        selectedFrameId={selectedFrameId}
        BaseUrl={BaseUrl}
        />
        </View>
      } 
        </View>
      )
    }
  }

  function renderFooter() {
    return (
      <View style={{
          flexDirection: 'row',
          justifyContent:'center',
          height: 90,
          paddingTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: '#251B37',
          zIndex: 1}}
          >
      <IconButton
      icon={icons.scan}
      iconStyle={{
        paddingHorizontal:50,
        width: 60,
        height: 60,
      }}
      onPress={()=>setShowGalleryModal(true)}
      />

     <IconButton
      icon={icons.cam}
      iconStyle={{ 
        paddingHorizontal:50,
        width: 60,
        height: 60,
      }}
      onPress={()=>capturePhoto()}
      />

    <IconButton
      icon={icons.person2}
      iconStyle={{
        paddingHorizontal:50,
        width: 60,
        height: 60,
      }}
      onPress={()=> setShowFilterModal(true)}
      />
      </View>
        
    )
  }

  

  return (
    <View
        style={{
          flex:1
        }}
    >
      {showCamera ? (
        <>
      {/* Filter */}
      {showFilterModal &&
        <FilterModal
        isVisible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        //자식 FilterModal로 token전달
        token={token}
        loadFrameModal={loadFrameModal}
        BaseUrl={BaseUrl}
        />}
  
      {showGalleryModal &&
        <GalleryModal
        isVisible={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        />}

        {/*Header*/}
        {renderHeader()}
  
        {renderCamera()}
  
        {renderFooter()}
        </>
      ) : (
        <>
        {imageSource !== '' ? (
          <Image
            style={styles.image}
            source={{
              uri: `file://${imageSource}`,
            }}
            />
            
        ) : null}
        
        {/* <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View> */}

          <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  재촬영
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={onSavePressed}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  저장
                </Text>
              </TouchableOpacity>

              </View>
        </View>
        </>
      )}
    </View>
  );

  
}

//사진 저장 페이지 style, 추후 정리 필요
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
  saveButton: {
    position: 'absolute',
    bottom:35,
    left: 35,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
});

export default Home;