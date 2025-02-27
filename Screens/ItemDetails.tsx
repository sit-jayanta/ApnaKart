/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  Text,
  ScrollView,
  useWindowDimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Double} from 'react-native/Libraries/Types/CodegenTypes';
import {Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {AirbnbRating} from 'react-native-ratings';
import Progress from '../components/Progress';
import {ImagesAssets} from '../assets/images/ImageAssets';
import {useAppDispatch, useAppSelector} from '../src/store';
import {manageFavourite, addCart} from '../src/counterSlice';
import Animated, {
  Easing,
  SharedTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Toolbar from '../components/Toolbar';
import {duration} from '@mui/material';

const ItemDetails = ({route, navigation}) => {
  const [product, updateProduct] = useState<Product>();
  const dispatch = useAppDispatch();
  type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: Double;
    discountPercentage: Double;
    rating: Double;
    stock: number;
    brand: string;
    reviews: Rating[];
    thumbnail: string;
    images: Images[];
    isLiked: boolean;
  };
  type Size = {
    id: number;
    size: string;
    isSelected: boolean;
  };
  const size: Size[] = [
    {
      id: 1,
      size: 'XS',
      isSelected: false,
    },
    {
      id: 2,
      size: 'S',
      isSelected: false,
    },
    {
      id: 3,
      size: 'M',
      isSelected: false,
    },
    {
      id: 4,
      size: 'L',
      isSelected: false,
    },
    {
      id: 5,
      size: 'XL',
      isSelected: false,
    },
  ];
  const color = [
    {
      id: 1,
      color: 'black',
      name: 'Black',
    },
    {
      id: 2,
      color: 'red',
      name: 'Red',
    },
    {
      id: 3,
      color: 'yellow',
      name: 'Yellow',
    },
    {
      id: 4,
      color: 'blue',
      name: 'Blue',
    },
    {
      id: 5,
      color: 'green',
      name: 'Green',
    },
  ];
  type Rating = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  };
  type Images = {
    image: string;
  };
  const refRBSheet: any = useRef();
  const colorRBSheet: any = useRef();
  const {item}: any = route.params;
  const [sizeSelected, sizeClicked] = useState(false);
  const [sizeList, updateSize] = useState<Size[]>(size);
  const [displaySize, updateDisplaySize] = useState('Size');
  const [colorSelected, colorClicked] = useState(false);
  const [addedToCart, updateAdd] = useState(item.addedToCart);
  const [displaycolor, updateDisplaycolor] = useState('Color');
  let {items} = useAppSelector(state => state.global);
  const screenWidth = Dimensions.get('window').width;
  const start = screenWidth / 5.5 - 20;
  const end = -screenWidth / 3.5;
  const mid = (start + end) / 2;
  const height = 100;

  const animatedX = useSharedValue(start);
  const scale = useSharedValue(0);
  const bagScale = useSharedValue(1);

  const a = -height / (start - mid) ** 2;
  const h = mid;
  const k = height;

  const startAnimation = () => {
    //  if(sizeSelected && colorSelected && addedToCart){
    //  }
  };

  const resetAnimation = () => {
    //scale.value = 0;
  };
  const bagAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: bagScale.value}],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    const x = animatedX.value;
    const y = a * (x - h) ** 2 + k;
    return {
      transform: [{translateX: x}, {translateY: -y}, {scale: scale.value}],
    };
  });

  const sizeClickUpdate = index => {
    const newList = sizeList.map(item => ({
      ...item,
      isSelected: item.id === index + 1,
    }));
    updateSize(newList);
    updateDisplaySize(sizeList[index].size);
    sizeClicked(true);
    refRBSheet.current.close();
  };

  const colorUpdate = color => {
    colorClicked(true);
    updateDisplaycolor(color);
    colorRBSheet.current.close();
  };

  const addToCart = (id, c, s) => {
    // if (c !== 'Color' && s !== 'Size') {
    dispatch(addCart({id, c, s}));
    updateAdd(true);
    // }
  };

  useEffect(() => {
    updateProduct(items.find(it => it.id === item.id));
  }, [items]);
  const updateLiked = (item: any) => {
    dispatch(manageFavourite(item.id));
    console.log(
      'Item======>>>',
      items.find(it => it.id === item.id),
    );
  };
  const dimen = useWindowDimensions();
  return (
    <>
      <Toolbar text="Item Details" navigation={navigation} />
      <ScrollView
        style={{flex: 1, paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <Animated.Image
          sharedTransitionTag={'image' + item.id}
          source={{uri: item.thumbnail}}
          style={{
            height: dimen.height * 0.5,
            width: dimen.width,
            resizeMode: 'stretch',
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              refRBSheet.current.open();
            }}
            style={styles.size}>
            <Text style={styles.text}>{displaySize}</Text>
            <Image
              style={styles.icon}
              source={require('../assets/icons/arrow_down.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              colorRBSheet.current.open();
            }}
            style={styles.size}>
            <Text style={styles.text}>{displaycolor}</Text>
            <Image
              style={styles.icon}
              source={require('../assets/icons/arrow_down.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.2,
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                updateLiked(product);
              }}
              style={{
                marginTop: 10,
                alignSelf: 'center',
                flexWrap: 'wrap',
                padding: 5,
                backgroundColor: 'white',
                borderRadius: 50,
                elevation: 5,
              }}>
              <Image
                style={{width: 25, height: 25}}
                source={
                  product?.isLiked
                    ? require('../assets/icons/like_filled.png')
                    : require('../assets/icons/like_outline.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text
            style={{
              start: 15,
              color: 'black',
              fontFamily: 'Urbanist-Bold',
              fontSize: 27,
              marginTop: 10,
            }}>
            {product?.brand}
          </Text>
          <Text
            style={styles.price}>
            ${product?.price}
          </Text>
        </View>
        <Text
          style={{
            color: '#9B9B9B',
            start: 15,
            fontFamily: 'Urbanist-SemiBold',
            marginTop: 5,
            fontSize: 15,
          }}>
          {product?.title}
        </Text>
        <AirbnbRating
          showRating={false}
          count={5}
          starContainerStyle={{margin: 0}}
          ratingContainerStyle={{marginStart: 12, alignSelf: 'flex-start'}}
          selectedColor="#FFBA49"
          defaultRating={product?.rating}
          isDisabled={true}
          size={12}
        />
        <Text
          style={{
            color: 'black',
            fontFamily: 'Urbanist-SemiBold',
            marginTop: 5,
            marginHorizontal: 15,
          }}>
          {product?.description}
        </Text>
        <RBSheet ref={refRBSheet} draggable dragOnContent height={240}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {sizeList?.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.sizeBS,
                    {
                      width: dimen.width / 3.35,
                      borderColor: item.isSelected ? '#E5B801' : 'grey',
                      backgroundColor: item.isSelected ? '#DB3022' : 'white',
                    },
                  ]}
                  onPress={() => {
                    sizeClickUpdate(index);
                  }}>
                  <Text
                    style={[
                      styles.textBS,
                      {color: item.isSelected ? 'white' : 'black'},
                    ]}>
                    {item.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={styles.sizeInfo}>
              <Text style={[styles.text, {}]}>Size info</Text>
              <Image
                style={{
                  transform: [{rotate: '270deg'}],
                  justifyContent: 'center',
                  alignSelf: 'center',
                  end: 20,
                  position: 'absolute',
                }}
                source={require('../assets/icons/arrow_down.png')}
              />
            </View>
          </View>
        </RBSheet>
        <RBSheet ref={colorRBSheet} draggable dragOnContent height={350}>
          <View style={{flexDirection: 'column'}}>
            {color?.map( item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.sizeBS,
                  {
                    flexDirection: 'row',
                    borderColor: 'grey',
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() => {
                  colorUpdate(item.name);
                }}>
                <Text style={[styles.color, {color: 'black'}]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.line,{ backgroundColor: item.color}]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </RBSheet>
        <Text
          style={
            styles.text1
          }>
          Ratings & Reviews
        </Text>
        <View style={{flexDirection: 'row', flex: 1, paddingBottom: 20}}>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                fontFamily: 'Urbanist-ExtraBold',
                color: 'black',
                fontSize: 40,
                marginTop: 20,
                marginStart: 15,
              }}>
              {product?.rating}
            </Text>
            <Text
              style={{
                fontFamily: 'Urbanist-Bold',
                color: '#9B9B9B',
                fontSize: 18,
                marginTop: 0,
                marginStart: 15,
              }}>
              117 Ratings
            </Text>
            <View
              style={{
                position: 'absolute',
                end: 0,
                paddingVertical: 10,
                marginTop: 20,
                alignItems: 'flex-end',
              }}>
              <AirbnbRating
                showRating={false}
                count={5}
                selectedColor="#FFBA49"
                defaultRating={5}
                isDisabled={true}
                size={18}
              />
              <AirbnbRating
                showRating={false}
                count={4}
                selectedColor="#FFBA49"
                defaultRating={4}
                isDisabled={true}
                size={18}
              />
              <AirbnbRating
                showRating={false}
                count={3}
                selectedColor="#FFBA49"
                defaultRating={3}
                isDisabled={true}
                size={18}
              />
              <AirbnbRating
                showRating={false}
                count={2}
                selectedColor="#FFBA49"
                defaultRating={2}
                isDisabled={true}
                size={18}
              />
              <AirbnbRating
                showRating={false}
                count={1}
                selectedColor="#FFBA49"
                defaultRating={1}
                isDisabled={true}
                size={18}
              />
            </View>
          </View>
          <View style={{flex: 0.4, marginTop: 30, alignItems: 'flex-end'}}>
            <Progress text={55} width={'70%'} />
            <Progress text={17} width={'21%'} />
            <Progress text={8} width={'10%'} />
            <Progress text={12} width={'15%'} />
            <Progress text={25} width={'45%'} />
          </View>
        </View>
        <View>
          {product?.reviews.map(item => (
            <View style={{marginHorizontal: 15}} key={item.reviewerEmail}>
              <View
                style={{
                  backgroundColor: 'white',
                  margin: 20,
                  elevation: 10,
                  borderRadius: 10,
                  borderColor: '#DB3022',
                }}>
                <Text
                  style={styles.reviewerName}>
                  {item.reviewerName}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <AirbnbRating
                    showRating={false}
                    count={5}
                    ratingContainerStyle={{
                      alignSelf: 'flex-start',
                      marginStart: 17,
                    }}
                    selectedColor="#FFBA49"
                    defaultRating={item.rating}
                    isDisabled={true}
                    size={12}
                  />
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      end: 20,
                      fontFamily: 'Urbanist-Regular',
                      color: '#9B9B9B',
                    }}>
                    {item.date.substring(0, 10)}
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 10,
                    lineHeight: 22,
                    fontFamily: 'Urbanist-Regular',
                    color: 'black',
                    fontSize: 15,
                  }}>
                  {'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum accusantium ipsa laboriosam in fugit blanditiis saepe aliquid non exercitationem tempora quos soluta, facere est nam quidem at asperiores ducimus suscipit.' +
                    item.comment}
                </Text>
              </View>
              <View
                style={styles.view2}>
                <Image
                  style={{
                    height: 45,
                    width: 45,
                    padding: 5,
                    borderRadius: 100,
                    resizeMode: 'cover',
                  }}
                  source={ImagesAssets.profile}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          marginHorizontal: 30,
          position: 'absolute',
          bottom: 10,
        }}>
        <Animated.View
          style={[
            styles.animated,
            bagAnimatedStyle,
          ]}>
            <TouchableOpacity onPress={()=>{navigation.navigate('CartStackNavigator')}}>
          <Image
            source={require('../assets/icons/bag.png')}
            style={
              styles.bag_icon
            }
          />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          activeOpacity={sizeSelected && colorSelected ? 0.3 : 1}
          onPress={() => {
            if (!addedToCart && colorSelected && sizeSelected) {
              scale.value = 1;
              animatedX.value = withTiming(end, {
                duration: 600,
                easing: Easing.linear,
              });
              setTimeout(() => {
                scale.value = 0;
                bagScale.value = withSpring(1.5);
                setTimeout(() => {
                  bagScale.value = withSpring(1);
                  setTimeout(() => {
                    dispatch(
                      addCart({id: item?.id, c: displaycolor, s: displaySize}),
                    );
                    updateAdd(true);
                  }, 100);
                }, 100);
              }, 600);
            } else {
              Alert.alert('The Item is already in cart');
            }
          }}
          style={[
            styles.addToCart,
            {
              backgroundColor:
                sizeSelected && colorSelected ? '#DB3022' : '#EEB2B2',
            },
          ]}>
          <Text style={styles.addText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          {
            backgroundColor: '#DB3022',
            width: 25,
            height: 25,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
          },
          animatedStyle,
        ]}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Urbanist-Bold',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          +1
        </Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  size: {
    flex: 0.4,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginStart: 15,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    textAlign: 'left',
    paddingStart: 20,
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 17,
    textAlignVertical: 'center',
  },
  sizeBS: {
    marginHorizontal: 6,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    borderWidth: 1,
    textAlign: 'left',
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 17,
    textAlignVertical: 'center',
  },
  text: {
    flex: 0.8,
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Urbanist-Medium',
    fontSize: 17,
    textAlignVertical: 'center',
  },
  textBS: {
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 20,
    fontFamily: 'Urbanist-Medium',
    fontSize: 17,
    textAlignVertical: 'center',
  },
  color: {
    textAlign: 'left',
    color: 'black',
    marginHorizontal: 20,
    fontFamily: 'Urbanist-Medium',
    fontSize: 17,
    textAlignVertical: 'center',
  },
  icon: {
    flex: 0.08,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCart: {
    flex: 0.7,
    marginBottom: 10,
    elevation: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignContent: 'center',
  },
  addText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: 'Urbanist-Regular',
    paddingVertical: 10,
  },
  bag_icon :{
    width: 27,
    height: 27,
    tintColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  animated : {
    flex: 0.3,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  view2: {
    position: 'absolute',
    borderRadius: 100,
    elevation: 10,
  },
  reviewerName : {
    marginTop: 15,
    marginHorizontal: 20,
    fontFamily: 'Urbanist-ExtraBold',
    fontSize: 17,
    color: 'black',
  },
  text1: {
    fontFamily: 'Urbanist-ExtraBold',
            color: 'black',
            fontSize: 30,
            marginStart: 15,
  },
  line : {
    position: 'absolute',
    end: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    borderRadius: 4,
  },
  sizeInfo : {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    marginTop: 20,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderWidth: 0.5,
  },
  price: {
    position: 'absolute',
    end: 15,
    color: 'black',
    fontFamily: 'Urbanist-Bold',
    fontSize: 27,
    marginTop: 10,
  },
});

export default ItemDetails;
