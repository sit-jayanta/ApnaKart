/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../src/store';
import { reduceQuantity, increaseQuantity, removeCart } from '../src/counterSlice';
import { ImagesAssets } from '../assets/images/ImageAssets';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const Cart = () => {
  const [products, updateProducts] = useState<any>();
  const [itemID, updateitemID] = useState<any>();
  const [deleteItem, updateDelete] = useState(false);
  let { items } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();



  useEffect(() => {
    const cartList = items.filter(item =>
      item.addedToCart === true,
    );
    updateProducts(cartList);
  }, [items]);

  const reduceQty = (item) => {
    if (item.qty > 1) {
      dispatch(reduceQuantity(item.id));
      console.log('ADDJJJJ+++++++++++++++++++++', products.find(it => it.id === item.id));
    }
  };
  const increaseQty = (item) => {
    if (item.qty < 10) {
      dispatch(increaseQuantity(item.id));
      console.log('ADDJJJJ+++++++++++++++++++++', item.qty);
    }
  };

  const deleteItemFromCart = (id) => {
    console.log('is++++++++++++++++> ',id);
    dispatch(removeCart(id));
    updateDelete(false);
    console.log('item______________________>>>>',items[id - 1]);
  };

  const rightSwipe = (id) => {
    return (
      <View style={{ height: 130, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DB3022', width: '30%', marginStart: -20, marginTop: 5, flex: 0.3 }}>
      <TouchableOpacity onPress={()=>  {updateDelete(true),updateitemID(id)}} activeOpacity={0.6} >
        <Image style={{ tintColor: 'white', width: 50, height: 50 }} source={require('../assets/icons/clear.png')} />
      </TouchableOpacity>
      </View>
    );
  };

  const Dialog = () => {
    return (
        <View style={{
            backgroundColor: 'white',
            elevation: 10,
            width: '60%',
            height: '15%',
            padding: 10,
            flexDirection: 'column',
            borderRadius: 10,
        }}>
            <Text style={{
                paddingVertical: 20,
                marginHorizontal: 10,
                fontSize: 20,
                fontFamily: 'Urbanist-Medium',
                textAlign: 'center',
                color: 'black',
            }}>Do you really want to delete this item from cart?</Text>
            <View style={{ flexDirection: 'row', flex: 1}}>
                <TouchableOpacity onPressIn={() => {updateDelete(false)}} style={{backgroundColor: 'red', flex: 0.5, paddingHorizontal: 5, margin: 10, borderRadius: 10}}>
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
                <TouchableOpacity onPressIn={() =>  deleteItemFromCart(itemID)} style={{backgroundColor: 'green', flex: 0.5,paddingHorizontal: 5, margin: 10, borderRadius: 10}}>
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

  return (
    <GestureHandlerRootView  style={{flex: 1}}>
    <FlatList contentContainerStyle={{ paddingTop: 10, paddingBottom: 60, }} style={{ marginTop: 10 }} data={products} onScrollToTop={() => {
      return true;
    }} renderItem={({ item }) => (
        <Swipeable renderRightActions={ () => rightSwipe(item.id) } dragOffsetFromRightEdge={10}>
          <View style={{
            flex: 1, flexDirection: 'row', elevation: 10, borderRadius: 10,
            height: 130, backgroundColor: 'white', marginBottom: 15, marginTop: 5, marginHorizontal: 15, justifyContent: 'center', alignContent: 'center'
          }}>
            <Image style={{ flex: 0.35, resizeMode: 'contain' }} source={{ uri: item.thumbnail }} />
            <View style={{ flex: 0.65, backgroundColor: '#F5F5F5', borderTopEndRadius: 10, borderBottomEndRadius: 10, paddingHorizontal: 10 }}>
              <Text style={styles.text}>{item.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.prop, { color: 'grey' }]}>Size : </Text>
                <Text style={[styles.prop, { color: 'black', fontFamily: 'Urbanist-Medium' }]}>{item.size}</Text>
                <Text style={[styles.prop, { color: 'grey', marginStart: 15 }]}>Color : </Text>
                <Text style={[styles.prop, { color: 'black', fontFamily: 'Urbanist-Medium' }]}>{item.color}</Text>
              </View>
              <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, marginStart: 20 }}>
                <TouchableOpacity onPress={() => { reduceQty(item); }} style={{ backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', borderRadius: 100, elevation: 10, marginTop: 10, height: 30, width: 30 }}>
                  <Image style={{ alignSelf: 'center' }} source={ImagesAssets.minus} />
                </TouchableOpacity>
                <Text style={{
                  fontFamily: 'Urbanist-Bold',
                  color: 'black',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  paddingHorizontal: 15,
                }}>{item.qty}</Text>
                <TouchableOpacity onPress={() => { increaseQty(item); }} style={{ backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', borderRadius: 100, elevation: 10, marginTop: 10, height: 30, width: 30 }}>
                  <Image style={{ alignSelf: 'center' }} source={ImagesAssets.plus} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Swipeable>
    )} />
     {deleteItem && (
          <TouchableOpacity activeOpacity={1} style={styles.overlay}>
          <Dialog />
          </TouchableOpacity>
        )}
    </GestureHandlerRootView>

  );
};



const styles = StyleSheet.create({
  text: {
    fontFamily: 'Urbanist-ExtraBold',
    color: 'black',
    fontSize: 18,
    marginTop: 5,
  },
  prop: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    marginTop: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
