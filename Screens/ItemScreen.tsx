/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Image } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { fetchProducts, manageFavourite } from '../src/counterSlice';
import { useAppDispatch, useAppSelector } from '../src/store';
import { AxiosError } from 'axios';
import Toolbar from '../components/Toolbar';
import Animated, { SharedTransition, withSpring, withTiming } from 'react-native-reanimated';


const ItemScreen = ({ navigation }) => {
  type Rating = {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
  }
  type Images = {
    image: string
  }

  type ProductList = {
    products: Product[]
  }
  type Product = {
    id: number,
    title: string,
    description: string,
    category: string,
    price: Double,
    discountPercentage: Double,
    rating: Double,
    stock: number,
    brand: string,
    reviews: Rating[],
    thumbnail: string,
    images: Images[],
    isLiked: boolean
  }

  type CategoryList = {
    name: string,
    isSelected: boolean,
  }
  const [idd, updateId] = useState(0);
  const [filtered, updateFiltered] = useState<Product[] | null>(null);
  const [category, updateCategory] = useState<CategoryList[] | any>(null);
  const [isLoaded, updateLoaded] = useState(false);
  const [categoryName, updateCategoryName] = useState('');
  const dispatch = useAppDispatch();
  let { status, items } = useAppSelector((state) => state.global);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const data = await response.json();
        updateCategory(data.map((it: any) => { return { name: it, isSelected: false }; }));
        updateLoaded(true);
      }
      catch (error) {
        console.error(error);
      }
    };
    getCategories();
    console.log('status=====>', filtered);
    console.log('status=====>', status);
  }, []);

  const setSelected = (position) => {
    console.log(position);
    if (category.length > 0) {
      updateCategoryName(category[position].name);
      const newCategory = category.map((item, index) => ({
        ...item,
        isSelected: index === position,
      }));
      updateCategory(newCategory);
      filterList(category[position].name);
      console.log('categoryName=========================', category[position].name);
    }
  };

  const filterList = (categ) => {
    const newList: any = items.filter(item =>
      item.category === categ
    );
    // console.log('Filtered List =====> ', newList);
    updateFiltered(newList);
  };

  const updateSelected = (id: any) => {
    dispatch(manageFavourite(id));
    updateId(id);
    console.log('categoryName=========================', categoryName);
    console.log('manangeggg', idd);
  };

  useEffect(() => {
    if (categoryName != '') {
      filterList(categoryName);
    } else {
      let newList = items;
      updateFiltered(newList);
    }
  }, [items]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoaded ? (
        <>
          <Toolbar />
          <FlatList collapsable={false} contentContainerStyle={styles.categoryContainer} showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.name} horizontal data={category} renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={{ height: 30 }} onPress={() => { setSelected(index); }}>
                <Text style={[styles.category, { color: item.isSelected ? 'white' : 'black', borderWidth: item.isSelected ? 1.5 : 0, backgroundColor: item.isSelected ? '#DB3022' : 'white' }]}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          />
          <FlatList contentContainerStyle={{ paddingTop: 10 }} style={{ marginTop: 10 }} data={filtered} renderItem={({ item }) => (
            <View style={{ marginHorizontal: 15, marginBottom: 25 }}>
              <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ItemDetails', { item }); }} style={styles.itemCell}>

                <Animated.Image sharedTransitionTag={'image' + item.id} style={styles.image} source={{ uri: item.thumbnail }} />
                <View style={styles.itemBg}>
                  <Text style={styles.itemCateg}>{item.category}</Text>
                  <Text ellipsizeMode="tail" numberOfLines={2} style={{
                    fontFamily: 'Urbanist-SemiBold',
                    color: 'black', fontSize: 15,
                    textAlign: 'auto',
                  }}>{item.title}</Text>
                  <StarRatingDisplay style={{ width: 10, marginStart: 0, marginTop: 5 }} rating={item.rating} starSize={15} />
                  <Text style={{ fontFamily: 'Urbanist-ExtraBold', fontSize: 20, color: '#DB3022', marginTop: 5 }}>${item.price}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { updateSelected(item.id); }} activeOpacity={1} style={{ padding: 5, position: 'absolute', bottom: -15, end: 20, backgroundColor: '#F5F5F5', borderRadius: 50, elevation: 5 }}>
                <Image style={{ width: 25, height: 25 }} source={item.isLiked ? require('../assets/icons/like_filled.png') : require('../assets/icons/like_outline.png')} />
              </TouchableOpacity>
            </View>
          )} />
        </>
      ) : (
        <ActivityIndicator style={{ flex: 1 }} size={'large'} color="#DB3022" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    height: 30, marginEnd: 2, borderRadius: 15, fontSize: 16, paddingHorizontal: 10,
    paddingVertical: 0, elevation: 5, borderColor: '#E5B801',
    alignContent: 'center', justifyContent: 'center', textAlign: 'center', textAlignVertical: 'center',
    fontFamily: 'Urbanist-Bold', alignSelf: 'baseline',
  },
  categoryContainer: {
    paddingVertical: 10, paddingHorizontal: 10
  },
  itemCell: {
    flexDirection: 'row',
    backgroundColor: 'white', elevation: 10, borderRadius: 10, justifyContent: 'center', alignContent: 'center',
    height: 130,
  },
  image: { flex: 0.35, margin: 20, resizeMode: 'contain' },
  itemBg: { flex: 0.65, backgroundColor: '#F5F5F5', borderTopEndRadius: 10, borderBottomEndRadius: 10, paddingHorizontal: 10 },
  itemCateg: {
    marginTop: 10, borderRadius: 20, color: 'white', fontSize: 11, paddingHorizontal: 10, paddingVertical: 4, textAlign: 'center',
    backgroundColor: '#DB3022', fontFamily: 'Urbanist-Bold', alignSelf: 'baseline', borderColor: '#E5B801', borderWidth: 1.5,
  },
});

export default ItemScreen;
