/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { } from 'react-native-safe-area-context';
import { ImagesAssets } from '../assets/images/ImageAssets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorText from '../components/ErrorText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSuccessful from '../components/LoginSuccessful';

const LoginScreen = ({ navigation, route }) => {

    const [email, updateEmail] = useState('');
    const [pwd, updatePwd] = useState('');
    const [pwdstate, updatePwdState] = useState(false);
    const [emailstate, updateEmailstate] = useState(false);
    const [emailmsg, updateEmailMsg] = useState('');
    const [passwordmsg, updateMsg] = useState('');
    const [isLoginSuccessful, setLoginSuccessful] = useState(false);

    const storedata = async () => {
        if (email.length > 0 && emailstate === false && pwd.length > 0 && pwdstate === false) {
          setLoginSuccessful(true);
          setTimeout(async () => {
            try {
              await AsyncStorage.setItem('Email', email);
              await AsyncStorage.setItem('Pwd', pwd);
              setLoginSuccessful(false);
              navigation.navigate('BottomTab');
            } catch (error) {
              console.error('Error fetching tasks', error);
            }
          }, 4000);
        }
      }
    function setError(emaill: string) {
        if ((emaill.length === 0)) {
            updateEmailstate(true);
            updateEmailMsg('Error :Email cannot be empty');
        } else if (emaill.includes('@') && emaill.includes('.') && emaill.length > 6) {
            updateEmailstate(false);
            updateEmailMsg('');
        }
        else {
            updateEmailstate(true);
            updateEmailMsg(' Error : This is an invalid email');
        }
    }
    function setErrorPwd(pwdd: string) {
        if (pwdd.length === 0) {
            updatePwdState(true);
            updateMsg('Error : Password cannot be empty');
        } else if (pwdd.length < 6) {
            updatePwdState(true);
            updateMsg('Error :The Password cannot be less than 6');
        } else {
            updatePwdState(false);
            updateMsg('');
        }
    }
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView >
            <Text style={styles.title}>LOG IN {'\n'}TO YOUR ACCOUNT</Text>
            <View style={[styles.email, { marginTop: 50 }]}>
                <Text style={styles.normalText}>Email</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => { setError(text); updateEmail(text); }} inputMode="email" />
            </View>
            <View>
                {emailstate === true ? <ErrorText text={emailmsg} /> : null}
            </View>
            <View style={styles.email}>
                <Text style={styles.normalText}>Password</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => { setErrorPwd(text); updatePwd(text) }} />
            </View>
            <View>
                {pwdstate === true ? <ErrorText text={passwordmsg} /> : null}
            </View>
            <TouchableOpacity onPress={() => { storedata();(
                <LoginSuccessful />
            )}} style={{ backgroundColor: 'red', borderRadius: 5, elevation: 10, margin: 20, padding: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'Urbanist-Bold', fontSize: 20, textAlign: 'center' }}>LOG IN</Text>
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
        {isLoginSuccessful && (
        <View style={styles.overlay}>
          <LoginSuccessful />
        </View>
      )}
        </View>
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
    errorText: {
        marginHorizontal: 20,
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
        fontSize: 25,
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default LoginScreen;
