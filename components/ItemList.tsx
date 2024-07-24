/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Animated, { SharedTransition, withSpring, withTiming } from 'react-native-reanimated';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const ItemList = ({ items, navigation }) => {

  return (
    <FlatList 
      data={items}
      horizontal
      contentContainerStyle={{paddingHorizontal: 10}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={1}
          onPress={() => { navigation.navigate('ItemDetails', { item }); }} 
          style={{ marginBottom: 20, marginHorizontal: 10, marginTop: 10, backgroundColor: 'white', elevation: 10, height: 280, width: 180, borderRadius: 10 }}
        >
                 <Animated.Image sharedTransitionTag={'image' + item.id} style={{ borderRadius: 10, width: 160, height: 160, justifyContent: 'center', alignSelf: 'center' }} source={{ uri: item.thumbnail }}/>

          <Text style={{ position: 'absolute', marginTop: 15, marginStart: 10, borderRadius: 20, backgroundColor: '#DB3022', color: 'white', paddingHorizontal: 5, paddingVertical: 2, fontFamily: 'Urbanist-Medium' }}>
            -{item.discountPercentage}%
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <StarRatingDisplay style={{ width: 10 }} rating={3} starSize={15}/>
            <Text style={{ marginStart: 55, fontFamily: 'Urbanist-Regular', fontSize: 12, color: 'lightgrey' }}>({item.stock})</Text>
          </View>
          <Text style={{ fontFamily: 'Urbanist-Regular', fontSize: 14, color: 'grey', marginStart: 8 }}>{item.brand}</Text>
          <Text style={{ fontFamily: 'Urbanist-Bold', color: 'black', fontSize: 17, marginStart: 8 }}>{item.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Urbanist-Bold', color: '#DB3022', fontSize: 18, marginStart: 10 }}>${item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ItemList;
