/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import React from 'react';

const Progress = ({text,width}) => {
    return (
        <View style={{flex: 1, flexDirection: 'row', marginTop: 4,marginBottom: 2,alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 0.8}}><Text style={{borderRadius: 20,marginStart: 5,height: 10,width: width, backgroundColor: '#DB3022'}}/></View>
            <Text style={{flex:0.2, fontFamily: 'Urbanist-Medium', color:'grey'}}>{text}</Text>
        </View>
    );
};

export default Progress;
