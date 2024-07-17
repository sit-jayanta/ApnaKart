/* eslint-disable prettier/prettier */
import { Text, StyleSheet} from 'react-native';
import React from 'react';

const ErrorText = ({text}) => {
  return <Text style={styles.errorText}>{text}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    marginHorizontal: 25,
    color: 'red',
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
  },
});
export default ErrorText;
