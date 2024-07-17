/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import { FlatList, ScrollView, Text, TouchableHighlight, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import React, { } from 'react';
import { } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryComponent from '../components/CategoryComponent';
import { ImagesAssets } from '../assets/images/ImageAssets';

interface Tablist {
  id: number;
  name: string;
}

const list: Tablist[] = [
  {
    id: 0,
    name: 'Mens',
  },
  {
    id: 1,
    name: 'Womens',
  },
  {
    id: 2,
    name: 'Kids',
  },
];

const Category = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaView style={{height: layout.height}}>
      <FlatList
      contentContainerStyle={{justifyContent: 'center'}}
      horizontal
      style={{width: layout.width, backgroundColor: 'white', height: 60}}
        data={list}
        renderItem={({ item }) => (
        <View style={{backgroundColor: 'white',borderBottomColor: index === item.id ? 'red' : 'white',width: layout.width / 3, borderBottomWidth:3, alignContent: 'center', alignItems: 'center'}}>
          <Text style={{color: index === item.id ? 'red' : 'black', fontSize: 20, textAlign: 'center', paddingVertical: 5,fontFamily: 'Urbanist-Bold', alignSelf: 'center',verticalAlign: 'middle'}} onPress={()=> setIndex(item.id)}>{item.name}</Text>
        </View>
  )} />
  <ScrollView style={{marginBottom: 140}}>

  <TouchableOpacity onPress={()=>{navigation.navigate('Details');}} activeOpacity={0.7} style={{borderRadius: 10, backgroundColor: '#DB3022', margin: 10, padding: 40}}>
    <Text style={{color: 'white', fontSize: 25, fontFamily:'Urbanist-Bold', textAlign: 'center'}}>SUMMER SALE</Text>
    <Text style={{color: 'white', fontSize: 15, fontFamily:'Urbanist-Regular', textAlign: 'center'}}>Upto 50% Off</Text>
  </TouchableOpacity>
  <CategoryComponent name={index === 0 ? 'T-Shirts' : index === 1 ? 'Sarees' : 'T-Shirts'} image={index === 0 ? ImagesAssets.menstshirt : index === 1 ? ImagesAssets.saree : ImagesAssets.kidstshirt} margin={10}/>
  <CategoryComponent name={index === 0 ? 'Casual Shirts' : index === 1 ? 'Kurtis' : 'Jeans'} image={index === 0 ? ImagesAssets.casualshirt : index === 1 ? ImagesAssets.kurti : ImagesAssets.kidsjeans} margin={10}/>
  <CategoryComponent name={index === 0 ? 'Formal Shirts' : index === 1 ? 'Dress' : 'Frocks'} image={index === 0 ? ImagesAssets.formalshirt : index === 1 ? ImagesAssets.dress : ImagesAssets.frock} margin={10}/>
  <CategoryComponent name={index === 0 ? 'Trousers' : index === 1 ? 'Gowns' : 'Shirts'} image={index === 0 ? ImagesAssets.trousers : index === 1 ? ImagesAssets.gowns : ImagesAssets.kidsshirt} margin={10}/>
  <CategoryComponent name={index === 0 ? 'Jeans' : index === 1 ? 'Lehenga' : 'Shoes'} image={index === 0 ? ImagesAssets.jeans : index === 1 ? ImagesAssets.lehenga : ImagesAssets.shoess} margin={10}/>
  </ScrollView>
  </SafeAreaView>
  );
};

export default Category;
