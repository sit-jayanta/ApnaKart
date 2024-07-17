/* eslint-disable prettier/prettier */
import { Animated, Easing, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';

const LoginSuccessful = () => {
  const animationProgress = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/loading.json')}
        autoPlay={true}
        loop
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginSuccessful;
