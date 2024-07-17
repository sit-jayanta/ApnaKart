/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import { useAppDispatch, useAppSelector } from '../src/store';
import { manageFavourite } from '../src/counterSlice';

const Favourites = (navigation) => {
    const [liked, updateLiked] = useState<any>()
    const dispatch = useAppDispatch();
    let { items} = useAppSelector((state) => state.global);
    const updateSelected = (id : any)=>{
        dispatch(manageFavourite(id));
        console.log('manangeggg',manageFavourite(id));
      };
      useEffect(()=>{
        const newList = items.filter(item => item.isLiked === true);
        updateLiked(newList);
      },[items]);
  return (
    <FlatList
      contentContainerStyle={{paddingTop: 10, paddingBottom: 60}}
      data={liked}
      onScrollToTop={() => {
        return true;
      }}
      renderItem={({item, index}) => (
        <View style={{flex: 1, marginHorizontal: 15, marginBottom: 25}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ItemDetails', {item});
            }}
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              elevation: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignContent: 'center',
              height: 130,
            }}>
            <Image
              style={{flex: 0.35, resizeMode: 'cover', margin: 20}}
              source={{uri: item.thumbnail}}
            />
            <View
              style={{
                flex: 0.65,
                backgroundColor: '#F5F5F5',
                borderTopEndRadius: 10,
                borderBottomEndRadius: 10,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  marginTop: 10,
                  borderRadius: 20,
                  color: 'white',
                  fontSize: 11,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  textAlign: 'center',
                  backgroundColor: '#DB3022',
                  fontFamily: 'Urbanist-Bold',
                  alignSelf: 'baseline',
                  borderColor: '#E5B801',
                  borderWidth: 1.5,
                }}>
                {item.category}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={{
                  fontFamily: 'Urbanist-SemiBold',
                  color: 'black',
                  fontSize: 15,
                  textAlign: 'auto',
                }}>
                {item.title}
              </Text>
              <StarRatingDisplay
                style={{width: 10, marginStart: 0, marginTop: 5}}
                rating={item.rating}
                starSize={15}
              />
              <Text
                style={{
                  fontFamily: 'Urbanist-ExtraBold',
                  fontSize: 20,
                  color: '#DB3022',
                  marginTop: 5,
                }}>
                ${item.price}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateSelected(item.id);
            }}
            activeOpacity={1}
            style={{
              padding: 5,
              position: 'absolute',
              bottom: -15,
              end: 20,
              backgroundColor: '#F5F5F5',
              borderRadius: 50,
              elevation: 5,
            }}>
            <Image
              style={{width: 25, height: 25}}
              source={
                item.isLiked
                  ? require('../assets/icons/like_filled.png')
                  : require('../assets/icons/like_outline.png')
              }
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default Favourites;
