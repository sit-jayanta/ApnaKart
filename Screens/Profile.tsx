/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImagesAssets } from '../assets/images/ImageAssets';
import { } from 'react-native-safe-area-context';
import ForwardArrow from '../components/forward';

const Profile = () => {
    type MenuProps = {
        name: string;
      };

    const MenuItem = (props : MenuProps) =>{
        return (
            <TouchableOpacity onPress={()=>{}} activeOpacity={0.5}style={{flexDirection: 'row', padding:10, backgroundColor: 'white',marginBottom:10, marginHorizontal: 15 ,borderRadius: 15, elevation: 5}}>
            <Text style={{flex: 0.95, marginStart: 20, fontFamily: 'Urbanist-Medium',fontSize: 20,color: 'black', paddingVertical: 10}}>{props.name}</Text>
            <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <ForwardArrow />
            </View>
        </TouchableOpacity>
          );
    };

    const [username , updateUsername ] = useState('Mackenzie Foy');
    const [email , updateEmail ] = useState('mackenzie07@farzi-mail.com');
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
             <MenuItem name="My Orders"/>
             <MenuItem name="Shipping Address"/>
             <MenuItem name="Payment Methods"/>
             <MenuItem name="My Promocodes"/>
             <MenuItem name="My Reviews"/>
             <MenuItem name="Settings"/>
             <MenuItem name="Log out"/>
        </View>
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
})

export default Profile;
