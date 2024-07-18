/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImagesAssets } from '../assets/images/ImageAssets';
import { } from 'react-native-safe-area-context';
import ForwardArrow from '../components/forward';
import LoadingIndicater from '../components/LoadingIndicater';

const Profile = ({navigation}) => {

const logOut = ()=>{
  updatelogoutClicked(false);
  updateShowLoader(true);
  setTimeout(()=>{
    navigation.navigate('LoginScreen');
    updateShowLoader(false);
  },2000);
};

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
                <View style={{ flexDirection: 'row', flex: 1, position: 'absolute', bottom: 10}}>
                    <TouchableOpacity onPress={() => {updatelogoutClicked(false);}} style={{backgroundColor: 'red',height: 50, flex: 0.5, paddingHorizontal: 5, marginStart: 10,marginEnd: 5, borderRadius: 5}}>
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
                    <TouchableOpacity onPress={() => { logOut();}} style={{backgroundColor: 'green', flex: 0.5,height: 50,paddingHorizontal: 5,marginStart: 5, marginEnd: 10, borderRadius: 5}}>
                        <Text
                            style={{
                                flex: 1,
                                fontSize: 15,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontFamily: 'Urbanist-Medium',
                                color:'white',
                            }}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
      };

    const MenuItem = ({name , onPress}) =>{
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.5}style={{flexDirection: 'row', padding:10, backgroundColor: 'white',marginBottom:10, marginHorizontal: 15 ,borderRadius: 15, elevation: 5}}>
            <Text style={{flex: 0.95, marginStart: 20, fontFamily: 'Urbanist-Medium',fontSize: 20,color: 'black', paddingVertical: 10}}>{name}</Text>
            <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <ForwardArrow />
            </View>
        </TouchableOpacity>
          );
    };

    const [username , updateUsername ] = useState('Mackenzie Foy');
    const [email , updateEmail ] = useState('mackenzie07@farzi-mail.com');
    const [logoutClicked , updatelogoutClicked ] = useState(false);
    const [showLoader , updateShowLoader ] = useState(false);
    return (
       <ScrollView style={{flex : 1, marginBottom: 64}}>
         <View style={{flexDirection: 'row'}}>
           <Image resizeMode="cover" style= {styles.profile} source={ ImagesAssets.profile}/>
          <View style={{marginTop: 20}}>
          <Text style={{fontSize: 25, fontFamily: 'Urbanist-Bold', color: 'black'}}>{username}</Text>
          <Text style={{fontSize: 17, fontFamily: 'Urbanist-Regular', color: 'black',textDecorationLine: 'underline'}}>{email}</Text>
          </View>
        </View>
        <View>
             <MenuItem name="My Orders"   onPress={()=>{updatelogoutClicked(true);}}/>
             <MenuItem name="Shipping Address"  onPress={()=>{updatelogoutClicked(true);}}/>
             <MenuItem name="Payment Methods"  onPress={()=>{updatelogoutClicked(true);}}/>
             <MenuItem name="My Promocodes"  onPress={()=>{updatelogoutClicked(true);}}/>
             <MenuItem name="My Reviews"  onPress={()=>{updatelogoutClicked(true);}}/>
             <MenuItem name="Settings"  onPress={()=>{updatelogoutClicked(true);}}/>
             <MenuItem name="Log out" onPress={()=>{updatelogoutClicked(true);}}/>
        </View>
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
    profile:{
        borderRadius : 500,
        width: 80,
        height: 80,
        aspectRatio: 1,
        margin : 20,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default Profile;
