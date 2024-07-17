/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from './Screens/SignUpScreen';
import BottomNavigation from './Screens/BottomNavigation';
import LoginScreen from './Screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import  store  from './src/store';



const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggediN, updateLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('Email');

        if(storedEmail?.length !== undefined){
          updateLoggedIn(true);
          console.log('isLN', isLoggediN);
          console.log('storedEmail?.length', storedEmail?.length);
        }
        else{
          updateLoggedIn(false);
          console.log('storedEmail?.length !== undefined', storedEmail === null);
        }
        console.log('Stored email:', storedEmail);
        console.log('isLoggediN', isLoggediN);
        console.log('abc', isLoggediN !== true);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchCredentials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggediN === null) {
    return null;
  }

  // if (initialRoute === undefined) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggediN  ? 'BottomTab' : 'Login'}>
      <Stack.Screen name="BottomTab" component={BottomNavigation} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
