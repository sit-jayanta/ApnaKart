/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';

const LoadingIndicater = () => {
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/home_loading.json')}
        autoPlay={true}
        loop={true}
        style={{
          width: 150,
          height: 150,
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

export default LoadingIndicater;
