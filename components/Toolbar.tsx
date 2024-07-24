/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Toolbar = ({navigation, text}) => {
    return (
        <View style={{maxHeight: 50,backgroundColor: 'white',flex: 1, flexDirection: 'row',paddingVertical: 10, elevation: 10}}>
           <TouchableOpacity onPress={() => navigation.goBack(null)} style={{alignSelf: 'center',justifyContent: 'flex-start',flex: 0.33,alignItems: 'flex-start'}}>
                <Image
                  source={require('../assets/icons/icon.png')}
                  style={{ width: 20, height: 20, marginLeft: 10, tintColor: 'black'}}
                />
              </TouchableOpacity>
            <Text style={{color: 'black', fontFamily: 'Urbanist-Medium', flex: 0.33, textAlign: 'center', fontSize: 22}}>{text}</Text>
            <TouchableOpacity onPress={() => navigation.goBack(null)} style={{justifyContent: 'flex-end', alignItems: 'flex-end',flex: 0.33, alignSelf: 'center'}}>
                
              </TouchableOpacity>
        </View>
    );
};

export default Toolbar;