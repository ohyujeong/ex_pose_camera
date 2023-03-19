import React from 'react';
import {
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

class Login extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
  
  return (
    <View style={{flex:1}}>
        <WebView
          ref = {(ref)=> {this.webview = ref;}}
          style = {{width: '100%', height:'100%'}}
          source={{uri: 
            'https://kauth.kakao.com/oauth/authorize?client_id=560569442d62d727bea35653d92e561f&redirect_uri=http://52.79.250.39:8080/oauth/callback/kakao&response_type=code'}}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          onLoad={console.log('loaded')}/> 
    </View> 
    );
 }

    handleWebViewNavigationStateChange = (newNavState, props) => {
    
    const {url} = newNavState;

    const CLIENT_ID = "560569442d62d727bea35653d92e561f";
    const BaseUrl = "http://52.79.250.39:8080";
    const REDIRECT_URI =  `${BaseUrl}/oauth/callback/kakao`;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    if(url.includes('code=')){
      this.webview.stopLoading();
      this.props.navigation.replace('Banner');
      
      fetch(`${KAKAO_AUTH_URL}`)
      .then((res) => res.json())
      .then(res => {
      const token = res.data.jwtToken
      console.log(token)
      //토큰 전달
      this.props.navigation.replace('Walkthrough', {token: token});
      })
      .catch(console.error)

    }
  }

}

export default Login; 