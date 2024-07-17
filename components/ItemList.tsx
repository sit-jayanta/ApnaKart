/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import { ImagesAssets } from '../assets/images/ImageAssets';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const list = [
    {
        id: 0,
        name: 'NEW',
    },
    {
        id: 1,
        name: 'NEW',
    },
    {
        id: 2,
        name: 'NEW',
    },
    {
        id: 3,
        name: 'NEW',
    },
    {
        id: 4,
        name: 'NEW',
    },
    {
        id: 15,
        name: 'NEW',
    },
    {
        id: 26,
        name: 'NEW',
    },
    {
        id: 36,
        name: 'NEW',
    },
    ];

const ItemList = ({item, name}) => {
  return (
    <View>
      <FlatList data={list}
      horizontal
     showsHorizontalScrollIndicator={false}
      renderItem={()=>(
        <View style={{marginBottom: 20, marginHorizontal: 20, marginEnd: 2, marginTop:10}}>
            <Image style={{borderRadius: 10}} source={ImagesAssets.banner}/>
            <Text style={{position: 'absolute',
                 marginTop: 15,
                  marginStart: 3,
                   borderRadius: 20,
                   backgroundColor: name === 'new' ? 'black' : '#DB3022',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    fontFamily: 'Urbanist-Medium',
                    }}>{item}</Text>
                    <View style={{flexDirection:'row'}}>
                    <StarRatingDisplay style={{width: 10}} rating={3} starSize={15}/>
                    <Text style={{marginStart: 55, fontFamily: 'Urbanist-Black', fontSize: 12,color: 'lightgrey'}}>(100)</Text>
                    </View>
                    <Text style={{fontFamily: 'Urbanist-Black', fontSize: 14,color: 'grey', marginStart: 8}}>PUNA</Text>
                    <Text style={{fontFamily: 'Urbanist-Bold',color: 'black', fontSize: 17, marginStart: 8}}>Pink Zebra Dress</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Urbanist-Bold',color: 'grey', fontSize: 15, marginStart: 8,textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>$15</Text>
                        <Text style={{fontFamily: 'Urbanist-Bold',color: '#DB3022', fontSize: 15, marginStart: 5,}}>$13</Text>
                    </View>
        </View>
      )} />
    </View>
  );
};

export default ItemList;
