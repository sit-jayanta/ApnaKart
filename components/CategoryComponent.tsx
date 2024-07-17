/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import { Image, Text, View } from 'react-native';
import {  } from '../assets/images/ImageAssets';


function CategoryComponent ({name, image,margin}) {
  return (
    <View style={{margin:10, backgroundColor:'white', flexDirection:'row',height: 140, borderRadius: 10, elevation: 5, marginBottom: margin}}>
      <Text style={{flex: 0.5, verticalAlign: 'middle',textAlign: 'center', fontFamily: 'Urbanist-Bold',color: 'black', fontSize: 20}}>{name}</Text>
      <Image style={{flex: 0.5 , flexShrink: 1, height: 140, borderBottomRightRadius: 10,borderTopRightRadius: 10}} resizeMode="cover" source={image}/>
    </View>
  );
}

export default CategoryComponent;
