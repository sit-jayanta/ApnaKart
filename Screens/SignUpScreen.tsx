/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { } from 'react-native-safe-area-context';
import { ImagesAssets } from '../assets/images/ImageAssets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = ({ navigation }) => {
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Text style={styles.title}>SIGN UP</Text>
            <View style={styles.name}>
                <Text style={styles.normalText}>Name</Text>
                <TextInput style={styles.textInput} />
            </View>
            <View style={styles.email}>
                <Text style={styles.normalText}>Email</Text>
                <TextInput style={styles.textInput} inputMode="email" />
            </View>
            <View style={styles.email}>
                <Text style={styles.normalText}>Password</Text>
                <TextInput style={styles.textInput} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text onPress={()=> {navigation.navigate('Login');}} style={{ color: 'black', fontFamily: 'Urbanist-Bold', fontSize: 15, marginTop: 0 }}>Already have an account</Text>
                <Image style={{ marginEnd: 20 }} source={require('../assets/icons/go.png')} />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Login'); Alert.alert('Sign up Successful');}} style={{ backgroundColor: 'red', borderRadius: 5, elevation: 10, margin: 20, padding: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'Urbanist-Bold', fontSize: 20, textAlign: 'center' }}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', flexShrink: 1, marginHorizontal: 100, marginVertical: 10 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', elevation: 10, flex: 0.5, alignItems: 'center', paddingVertical: 10, justifyContent: 'center', marginEnd: 10, borderRadius: 115, height: '100%', width: '15%' }}>
                    <Image style={{ alignSelf: 'center' }} source={ImagesAssets.google} />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'white', elevation: 10, flex: 0.5, justifyContent: 'center', height: '100%', alignItems: 'center', borderRadius: 115 }}>
                    <Image source={ImagesAssets.facebook} />
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    name: {
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 10,
        marginHorizontal: 20,
        marginTop: 50,
    },
    email: {
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 10,
        marginHorizontal: 20,
        marginTop: 10,
    },
    container: {
        backgroundColor: '#F8F6F6',
        flex: 1,
    },
    title: {
        fontFamily: 'Urbanist-Bold',
        color: 'black',
        fontSize: 40,
        marginTop: 80,
        textAlign: 'center',
    },
    normalText: {
        fontFamily: 'Urbanist-Regular',
        color: 'black',
        fontSize: 12,
        marginStart: 20,
        marginTop: 5,
        marginBottom: 0,
    },
    textInput: {
        fontFamily: 'Urbanist-Medium',
        color: 'black',
        fontSize: 18,
        paddingHorizontal: 20,
        paddingBottom: 5,
        paddingTop: 0,
    },
});

export default SignUpScreen;
