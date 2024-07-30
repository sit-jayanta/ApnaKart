/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import Category from './Category';
import Profile from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { } from 'react-native-paper';
import SearchIcon from '../components/search';
import Cart from './Cart';
import Favourites from './Favourites';
import Details from './Details';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ItemScreen from './ItemScreen';
import ItemDetails from './ItemDetails';
import LoginScreen from './LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  CategoryIcon from 'react-native-vector-icons/MaterialIcons';
import  HomeIcon from 'react-native-vector-icons/Entypo';
import  LikeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import  UserIcon from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();

function CategoryStackNavigator({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Details') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({  tabBarStyle: { display: 'flex', position: 'absolute',
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20} });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
function HomeStackNavigator({navigation, route}) {
  const [routeName, updateRoute] = useState<any>('');
  React.useLayoutEffect(() => {
    updateRoute(getFocusedRouteNameFromRoute(route));
    if (routeName === 'ItemScreen' || routeName === 'ItemDetails') {
      navigation.setOptions({ tabBarStyle: { display: 'none'},headerStyle : { fontFamily: 'Urbanist-Bold',
        fontSize: 25,
        color: '#DB3022',
        backgroundColor: '#DB3022',
      } });
    } else{
      navigation.setOptions({  tabBarStyle: { display: 'flex', position: 'absolute',
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20}});
    }
  }, [navigation, routeName, route]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="ItemDetails" component={ItemDetails}  />
    </Stack.Navigator>
  );
}

function ProfileStackNavigator({navigation, route}) {
  const [routeName, updateRoute] = useState<any>('');
  React.useLayoutEffect(() => {
    updateRoute(getFocusedRouteNameFromRoute(route));
    if (routeName === 'LoginScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'none'}, headerStyle : { fontFamily: 'Urbanist-Bold',
        fontSize: 25,
        color: '#DB3022',
        backgroundColor: '#DB3022',
      } });
    } else{
      navigation.setOptions({  tabBarStyle: { display: 'flex', position: 'absolute',
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20}});
    }
  }, [navigation, routeName, route]);

  return (
    <Stack.Navigator screenOptions={ routeName === 'LoginScreen' ?  {headerShown: false} : routeName === undefined ?  {headerShown: false} : {headerShown: true , headerTitleAlign: 'center',}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
    </Stack.Navigator>
  );
}


const BottomNavigation = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="HomeStackNavigator" screenOptions={{
        tabBarActiveTintColor: '#efb810',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
    }}>
      <Tab.Screen name="CategoryStackNavigator" component={CategoryStackNavigator} options={{
          tabBarLabel: 'Category',
          title: 'Category',
          headerStyle : {
            backgroundColor: '#DB3022'
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
              fontFamily: 'Urbanist-Bold',
              fontSize: 25,
              color: 'white',
          },
          headerBackgroundContainerStyle : {
            backgroundColor: '#DB3022'
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack(null)}>
                <Image
                  source={require('../assets/icons/icon.png')}
                  style={{ width: 25, height: 25, marginLeft: 15, tintColor: 'white'}}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => Alert.alert('Header Right Icon Pressed!')} style={{marginEnd: 15,}}>
               <SearchIcon />
              </TouchableOpacity>
            ),
          tabBarIcon: ({ focused }) => (
              <View style={{flex: 1,width: 40,justifyContent: 'center', alignItems: 'center'}}>
                  <CategoryIcon name="category" size={focused ? 30 : 24} color={ focused ? '#DB3022' : '#9B9B9B'}/>
              </View>
          ),
      }} />
      <Tab.Screen name="Favourites" component={Favourites} options={{
          tabBarLabel: 'Favourites',
          title: 'Favourites',
          headerTitleAlign: 'center',
          headerTitleStyle: {
              fontFamily: 'Urbanist-Bold',
              fontSize: 25,
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => Alert.alert('Header Left Icon Pressed!')}>
                <Image
                  source={require('../assets/icons/icon.png')}
                  style={{ width: 25, height: 25, marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
          tabBarIcon: ({ focused }) => (
            <View style={{flex: 1,width: 40,justifyContent: 'center', alignItems: 'center'}}>
                  <LikeIcon name="cards-heart" size={focused ? 30 : 24} color={focused ? '#DB3022' : '#9B9B9B'} />
              </View>
          ),
      }} />
      <Tab.Screen name="HomeStackNavigator" component={HomeStackNavigator} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{flex: 1,width: 40,justifyContent: 'center', alignItems: 'center'}}>
                  <HomeIcon name="home" size={focused ? 30 : 24} color={focused ? '#DB3022' : '#9B9B9B'} />
              </View>
          ),
      }} />
      <Tab.Screen name="Cart" component={Cart} options={{
          tabBarLabel: 'Cart',
          title: 'Cart',
          headerTitleAlign: 'center',
          headerTitleStyle: {
              fontFamily: 'Urbanist-Bold',
              fontSize: 25,
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => Alert.alert('Header Left Icon Pressed!')}>
                <Image
                  source={require('../assets/icons/icon.png')}
                  style={{ width: 25, height: 25, marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
          tabBarIcon: ({ focused }) => (
            <View style={{flex: 1,width: 40,justifyContent: 'center', alignItems: 'center'}}>
                   <HomeIcon name="shopping-cart" size={focused ? 30 : 24} color={focused ? '#DB3022' : '#9B9B9B'} />
              </View>
          ),
      }} />
      <Tab.Screen name="ProfileStackNavigator" component={ProfileStackNavigator} options={{
         headerShown: false,
         headerTitleAlign: 'center',
          headerTitleStyle: {
              fontFamily: 'Urbanist-Bold',
              fontSize: 25,
              color: 'white',
          },
          headerBackgroundContainerStyle : {
            backgroundColor: '#DB3022'
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => Alert.alert('Header Left Icon Pressed!')}>
                <Image
                  source={require('../assets/icons/icon.png')}
                  style={{ width: 25, height: 25, marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
          tabBarIcon: ({ focused }) => (
            <View style={{flex: 1,width: 40,justifyContent: 'center', alignItems: 'center'}}>
                  <UserIcon name="user-alt" size={focused ? 30 : 24} color={focused ? '#DB3022' : '#9B9B9B'} />
              </View>
          ),
      }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {
      fontSize: 14,
      fontFamily: 'Urbanist-Bold',
  },
  icon: {
      paddingLeft: 10,
  },
});

export default BottomNavigation;

