/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ImagesAssets } from '../assets/images/ImageAssets';
import { } from 'react-native-safe-area-context';
import ForwardArrow from '../components/forward';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Modal from 'react-native-modal';
import LoadingIndicater from '../components/LoadingIndicater';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const Profile = ({ navigation }) => {
  const resetStack = () => {
    navigation.popToTop();
  };
  const [imageUri, setImageUri] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const refRBSheet: any = useRef();
  

  function selectImageFromCamera() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };
    launchCamera(options, response =>{
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.assets[0].uri };
        setImageUri(source.uri);
        console.log( '===========>',source.uri );
      }
    });
  }

  function selectImageFromGallery() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };
    launchImageLibrary(options, response =>{
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.assets[0].uri };
        setImageUri(source.uri);
        console.log( '===========>',source.uri );
      }
    });
  }



  const logOut = () => {
    updatelogoutClicked(false);
    updateShowLoader(true);
    setTimeout(() => {
      resetStack();
      updateShowLoader(false);
    }, 2000);
  };
  const manageModal = (mode : string) =>{
    if(isOpen){
      setIsOpen(false)
    }else{
      setIsOpen(true)
    }

    if(mode === 'camera'){
      selectImageFromCamera();
    }else if ((mode === 'gallery')){
      selectImageFromGallery();
    }
  }

  const Dialog = () => {
    return (
      <View style={{
        backgroundColor: 'white',
        elevation: 10,
        width: '60%',
        height: '25%',
        paddingVertical: 10,
        flexDirection: 'column',
        borderRadius: 10,
      }}>
        <Text style={{
          paddingTop: 10,
          paddingBottom: 20,
          marginHorizontal: 10,
          fontSize: 18,
          fontFamily: 'Urbanist-Medium',
          textAlign: 'center',
          color: 'black',
        }}>Do you really want to log out from the account ?</Text>
        <View style={{ flexDirection: 'row', flex: 1, position: 'absolute', bottom: 10 }}>
          <TouchableOpacity onPress={() => { updatelogoutClicked(false); }} style={{ backgroundColor: 'red', height: 50, flex: 0.5, paddingHorizontal: 5, marginStart: 10, marginEnd: 5, borderRadius: 5 }}>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontFamily: 'Urbanist-Medium',
                color: 'white',
              }}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { logOut(); }} style={{ backgroundColor: 'green', flex: 0.5, height: 50, paddingHorizontal: 5, marginStart: 5, marginEnd: 10, borderRadius: 5 }}>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontFamily: 'Urbanist-Medium',
                color: 'white',
              }}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const MenuItem = ({ name, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{ flexDirection: 'row', padding: 10, backgroundColor: 'white', marginBottom: 10, marginHorizontal: 15, borderRadius: 15, elevation: 5 }}>
        <Text style={{ flex: 0.95, marginStart: 20, fontFamily: 'Urbanist-Medium', fontSize: 20, color: 'black', paddingVertical: 10 }}>{name}</Text>
        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
          <ForwardArrow />
        </View>
      </TouchableOpacity>
    );
  };

  const [username, updateUsername] = useState('Mackenzie Foy');
  const [email, updateEmail] = useState('mackenzie07@farzi-mail.com');
  const [logoutClicked, updatelogoutClicked] = useState(false);
  const [showLoader, updateShowLoader] = useState(false);
  return (
    <ScrollView style={{ flex: 1, marginBottom: 64 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image resizeMode="cover" style={styles.profile} source={imageUri === null ? ImagesAssets.profile : {uri : imageUri}} />
        <TouchableOpacity onPress={()=>{manageModal('')}}style={[{width: 30, height: 30, borderRadius: 15,alignItems: 'center', justifyContent: 'center'
        ,position: 'absolute', marginTop: 70, start: 75, backgroundColor: 'white'}]}> 
        <Image resizeMode="cover" style={[styles.camera, {alignSelf: 'center'}]} source={ImagesAssets.camera} />
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text1}>{username}</Text>
          <Text style={styles.text2}>{email}</Text>
        </View>
      </View>
      <View>
        <MenuItem name="My Orders" onPress={() => { updatelogoutClicked(true); }} />
        <MenuItem name="Shipping Address" onPress={() => { updatelogoutClicked(true); }} />
        <MenuItem name="Payment Methods" onPress={() => { updatelogoutClicked(true); }} />
        <MenuItem name="My Promocodes" onPress={() => { updatelogoutClicked(true); }} />
        <MenuItem name="My Reviews" onPress={() => { updatelogoutClicked(true); }} />
        <MenuItem name="Settings" onPress={() => { updatelogoutClicked(true); }} />
        <MenuItem name="Log out" onPress={() => { updatelogoutClicked(true); }} />
      </View>
      <Modal onBackButtonPress={()=>setIsOpen(false)} animationIn="zoomIn" animationInTiming={800}  isVisible={isOpen} >
       <View style={{backgroundColor: 'white', width: '50%', alignSelf: 'center',
        paddingVertical: 20,justifyContent: 'center', borderRadius: 20, flexDirection: 'row'}}>
       <TouchableOpacity onPress={()=>{manageModal('camera')}} style={{alignItems: 'center', justifyContent: 'center', flex: 0.5}}>
        <Image style={{width: 40, height: 40, tintColor: '#DB3022'}} source={ImagesAssets.camera}/>
        <Text style={{fontFamily: 'Urbanist-Bold', color: 'grey', marginTop: 10}}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{manageModal('gallery')}} style={{alignItems: 'center', justifyContent: 'center', flex: 0.5}}>
        <Image style={{width: 40, height: 40,tintColor: '#DB3022'}} source={ImagesAssets.gallery}/>
        <Text style={{fontFamily: 'Urbanist-Bold', color: 'grey', marginTop: 10}}>Gallery</Text>
        </TouchableOpacity>
       </View>
      </Modal>
      {logoutClicked && (
        <TouchableOpacity activeOpacity={1} style={styles.overlay}>
          <Dialog />
        </TouchableOpacity>
      )}
      {showLoader && (
        <TouchableOpacity activeOpacity={1} style={styles.overlay}>
          <LoadingIndicater />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profile: {
    borderRadius: 500,
    width: 80,
    height: 80,
    aspectRatio: 1,
    margin: 20,
  },
  camera: {
    width: 25,
    height: 25,
    aspectRatio: 1,
  },
  text1: {
    fontSize: 25, fontFamily: 'Urbanist-Bold', color: 'black',
  },
  text2:{fontSize: 17, fontFamily: 'Urbanist-Regular', color: 'black', textDecorationLine: 'underline'},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
