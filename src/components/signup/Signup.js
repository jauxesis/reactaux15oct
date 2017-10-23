import React from 'react';
import { BackHandler, AsyncStorage,TextInput, Modal, WebView, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity,TouchableHighlight } from 'react-native';

import { Animated } from 'react-native';

import { Icon } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

import { Alert,BackAndroid,ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';

import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  StackNavigator,
} from 'react-navigation';


var ToastAndroid = require('NativeModules').ToastAndroid;


export default class Signup extends React.Component{
   state = {
      myState: "fgfdgfd deserunt mollit anim id est laborum.",
      modalVisible: false,
      emailtext:'',
      fadeAnim:new Animated.Value(0),
      successResult:"Please click on the link provided in your mail to activate your account.",
      visibleLoader:false
   }
   updateState = () => this.setState({ myState: 'The state is updated' })

   constructor(props)
   {
       super(props);
   }

   componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', function() {
       // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
       // Typically you would use the navigator here to go to the last state.

       console.log("inside BackHandler in signup");
       Alert.alert(
         'Closing app...',
         'Sure want to close?',
         [
           {
             text:'Nope',style:'cancel',onPress:()=>{console.log("cancel click");}
           },
           {
             text:'Yes',onPress:()=>{
               console.log("yes click");
               BackAndroid.exitApp();
              //  this.props.navigation.dispatch(NavigationActions.reset({
              //   index:0,
              //   actions:[
              //     NavigationActions.navigate({routeName:'welcome'})
              //   ]
              //  }));
             }
           }
         ]
       )
     });

     //Animated.spring(1000, [
       Animated.timing(
         this.state.fadeAnim,
         {
           toValue:2,
           duration:2000
         }
       ).start();
     //]);

   }

   componentWillUnmount(){
     BackHandler.removeEventListener('hardwareBackPress', function() {
       // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
       // Typically you would use the navigator here to go to the last state.

       console.log("inside BackHandler removed in signup");
     });
   }

   callMe(){
     let email = this.state.emailtext;
     if(email == "" || email == null){
       ToastAndroid.show("Provide your email",ToastAndroid.SHORT);
     }else{
       this.setState({
         visibleLoader: true
       });
       console.log(this.state.emailtext);
       this.setState({emailtext:''});
       console.log(this.state.successResult);

       setTimeout(() => {
          this.setState({
            visibleLoader: false
          });
       }, 4000);
       setTimeout(()=>{
        this.popupDialog.show();
       },5000);
       setTimeout(()=>{
         this.popupDialog.dismiss();
          this.props.navigation.dispatch(NavigationActions.reset({
           index:0,
           actions:[
             NavigationActions.navigate({routeName:'home'})
           ]
          }));
       },10000);
     }
   }

   recoverfunds(){
     Actions.recoverfund();
   }

   closepopup(){
     this.popupDialog.dismiss();
   }

   render() {
      const resizeMode = 'cover';
      const text = 'Powered by Auxesis';

      const slideAnimation = new SlideAnimation({
        slideFrom: 'bottom',
      });

      let { fadeAnim } = this.state;

      return (
        <View style={styles.container}>

          <Spinner visible={this.state.visibleLoader} textContent={"Wait..."} textStyle={{color: '#FFF'}} />


          <View
            style={{
              backgroundColor: '#fff',
              justifyContent: 'center',
              top:0,
              left:0,
              marginTop:22,
              flex:1,
              position:'absolute',
              height:'10%',
              width:'100%'
            }}
          >
            <Image source={require('../../img/auxy.png')} style={styles.auxylogo}/>
          </View>


          <View style={styles.emaildiv}>
              <Animated.View
                style={{...this.props.style,
                opacity:fadeAnim}}>
              <Text style={styles.emailtext}>Enter Email</Text>
              <TextInput style = {styles.textInput}  placeholder="Enter your email" keyboardType="email-address"
                onChangeText={(emailtext)=>this.setState({emailtext})} value={this.state.emailtext}/>
              <Text style={styles.recoverfunds} onPress={()=>{this.recoverfunds();}}>
                 Recover Funds?
              </Text>
              <View style={styles.auxybutton}>
                <TouchableHighlight
                  style={styles.submit}
                  onPress={() => {this.callMe();}}
                  underlayColor='#337ab7'>
                  <View>
                    <Icon name='touch-app' color="#fff"
                    style={styles.icon}/>
                    <Text style={styles.submitText}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signup Now!
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              </Animated.View>
          </View>


          <View
            style={{
              backgroundColor: 'transparent',
              position:'absolute',
              bottom:0,
              marginBottom:5
            }}
          >

            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color:'white'
              }}
            >
              {text}
            </Text>

          </View>


          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogAnimation={slideAnimation}
          >
            <View style={{alignItems: 'center',padding:15}}>
              <Text style={{textAlign:'center',marginTop:'5%',marginBottom:'5%'}}>Thanks For Registering!</Text>
              <Image source={require('../../img/IconApproved.png')} style={{width:125,height:125}}/>
              <Text style={{textAlign:'center',marginTop:'5%',marginBottom:'5%'}}>Wait... Loading your asset!</Text>
              <TouchableHighlight
                style={styles.submit}
                onPress={() => {this.closepopup();}}
                underlayColor='#337ab7'>
                <View style={{position:'absolute',bottom:0,textAlign:'center',left:0,right:0}}>
                  <Text style={styles.submitText}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Okay!
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </PopupDialog>

        </View>
      );
   }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor:  '#004A7C',
    alignItems: 'center',
    width:'100%',
    height:'100%'
  },
  getstartbutton:{
    margin:2,
    width:'100%',
    color:'#337ab7',
    borderRadius:160,
    borderColor:'rgba(0,0,0,0.2)',
  },
  submit:{
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#337ab7',
    borderRadius:100,
    borderWidth: 1,
    width:250,
    borderColor:'rgba(0,0,0,0.2)',
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
      fontSize:16
  },
  emaildiv:{
    backgroundColor:'#fff',
    width:'95%',
    padding:15,
    borderRadius:10,
    height:'50%',
    marginTop:'40%',
    marginRight:'10%',
    marginLeft:'10%'
  },
  emailtext:{
    fontSize:25,
    fontWeight:'bold',
    marginTop:'5%'
  },
  textInput:{
    height:50,
    textAlign:'center',
    marginTop:'5%'
  },
  recoverfunds:{
    fontWeight:'bold',
    textAlign:'right',
    color:'#5e6e88',
    marginTop:'5%'
  },
  auxybutton:{
    alignItems:'center',
    bottom:0,
    left:0,
    right:0,
    justifyContent:'center',
    marginBottom:'8%',
    marginTop:'10%',
    width:'100%'
  },
  icon:{
    position:'absolute',
    left:0,
    marginLeft:'16%'
  }
});
