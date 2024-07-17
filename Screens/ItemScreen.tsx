/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Image } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { fetchProducts, manageFavourite } from '../src/counterSlice';
import { useAppDispatch, useAppSelector } from '../src/store';


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
  const [list, updateList] = useState<ProductList | null>(null);
  const [filtered, updateFiltered] = useState<ProductList | null>(null);
  const [category, updateCategory] = useState<CategoryList[] | any>(null);
  const [isLoaded, updateLoaded] = useState(false);
  const dispatch = useAppDispatch();
  let {status, items} = useAppSelector((state) => state.global);
  // const products = useSelector((state) => state.global.items);
  // const status = useSelector(state => state.global.status);

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchProducts());
  //   }
  // }, [status, dispatch]);
  useEffect(() => {
    // const getProducts = async () => {
    //   try {
    //     axios.get('https://dummyjson.com/products?limit=194').then(
    //       res => {
    //         const data = res.data;
    //         updateLoaded(true);
    //         updateList(data);
    //         updateFiltered(data);
    //       });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

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
    //getProducts();
    getCategories();
    if(items.length === 0){
      dispatch(fetchProducts());
    }
    console.log('status=====>', status);
  }, []);
  const setSelected = (position) => {
    console.log(position);
    if (category.length > 0) {
      const newCategory = category.map((item, index) => ({
        ...item,
        isSelected: index === position,
      }));
      updateCategory(newCategory);

      filterList(category[position].name);
    }
  };

  const filterList = (categ) => {
    const newList: any = list?.products.filter(item =>
      item.category === categ
    );
    updateFiltered({ products: newList });
  };

  const updateSelected = (id : any)=>{
    dispatch(manageFavourite(id));
    console.log('manangeggg',manageFavourite(id));
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignContent: 'center' }}>
      {isLoaded ? (
        <>
          <FlatList contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }} showsHorizontalScrollIndicator={false} style={{ alignSelf: 'center'}} keyExtractor={(item) => item.name} horizontal data={category} renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => { setSelected(index) }}>
                <Text style={{
                  height: 30, marginEnd: 2, borderRadius: 15, color: item.isSelected ? 'white' : 'black', fontSize: 16, paddingHorizontal: 10,
                  paddingVertical: 0, elevation: 5, borderColor: '#E5B801', borderWidth: item.isSelected ? 1.5 : 0,
                  alignContent: 'center', justifyContent: 'center', textAlign: 'center', textAlignVertical: 'center',
                  backgroundColor: item.isSelected ? '#DB3022' : 'white', fontFamily: 'Urbanist-Bold', alignSelf: 'baseline',
                }}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          />
          <FlatList contentContainerStyle={{paddingTop : 10}}style={{ marginTop: 10 }} data={items} onScrollToTop={() => {
            return true;
          }} renderItem={({ item, index }) => (
            <View style={{ flex: 1, marginHorizontal: 15, marginBottom: 25, }}>
              <TouchableOpacity onPress={() => { navigation.navigate('ItemDetails',{item}); }} style={{
                flexDirection: 'row',
                backgroundColor: 'white', elevation: 10, borderRadius: 10, justifyContent: 'center', alignContent: 'center',
                height: 130,
              }}>
                <Image style={{ flex: 0.35, resizeMode: 'cover', margin: 20 }} source={{ uri: item.thumbnail }} />
                <View style={{ flex: 0.65, backgroundColor: '#F5F5F5', borderTopEndRadius: 10, borderBottomEndRadius: 10, paddingHorizontal: 10 }}>
                  <Text style={{
                    marginTop: 10, borderRadius: 20, color: 'white', fontSize: 11, paddingHorizontal: 10, paddingVertical: 4, textAlign: 'center',
                    backgroundColor: '#DB3022', fontFamily: 'Urbanist-Bold', alignSelf: 'baseline', borderColor: '#E5B801', borderWidth: 1.5,
                  }}>{item.category}</Text>
                  <Text ellipsizeMode="tail" numberOfLines={2} style={{
                    fontFamily: 'Urbanist-SemiBold',
                    color: 'black', fontSize: 15,
                    textAlign: 'auto'
                  }}>{item.title}</Text>
                  <StarRatingDisplay style={{ width: 10, marginStart: 0, marginTop: 5 }} rating={item.rating} starSize={15} />
                  <Text style={{ fontFamily: 'Urbanist-ExtraBold', fontSize: 20, color: '#DB3022', marginTop: 5 }}>${item.price}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {updateSelected(item.id)}} activeOpacity={1} style={{ padding: 5, position: 'absolute', bottom: -15, end: 20, backgroundColor: '#F5F5F5', borderRadius: 50, elevation: 5 }}>
                <Image style={{ width: 25, height: 25 }} source={items[index].isLiked ? require('../assets/icons/like_filled.png') : require('../assets/icons/like_outline.png')} />
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

export default ItemScreen;
