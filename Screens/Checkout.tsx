import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {ImagesAssets} from '../assets/images/ImageAssets';

const Checkout = () => {
  return (
    <View>
      <Text style={styles.heading}>Shipping Address</Text>
      <View style={styles.addressCard}>
        <View style={styles.cardAdd}>
          <Text style={styles.name}>Mackenzie Foy</Text>
          <Text style={styles.change}>Change</Text>
        </View>
        <Text style={styles.address}>
          A-12, Tere ghar ke bagal me pani ki tanki ke paas{'\n'}999222 , pta ni
          kidhar, India
        </Text>
      </View>
      <View style={styles.cardAdd}>
        <Text style={styles.heading}>Payment</Text>
        <Text style={styles.change}>Change</Text>
      </View>
      <View style={styles.payment}>
        <View style={styles.cardBack}>
          <Image source={ImagesAssets.card} />
        </View>
        <Text style={styles.cardNum}>**** **** **** 1234</Text>
      </View>
      <Text style={styles.heading}>Delivery Methods</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Urbanist-Bold',
    color: 'black',
    fontSize: 17,
    marginStart: 10,
    marginTop: 10,
  },
  addressCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'red',
    padding: 10,
    margin: 10,
    elevation: 3,
    paddingHorizontal: 20,
  },
  name: {
    fontFamily: 'Urbanist-Medium',
    color: 'black',
    fontSize: 17,
  },
  change: {
    fontFamily: 'Urbanist-Medium',
    color: 'red',
    fontSize: 15,
    marginEnd: 10,
    alignSelf: 'flex-end',
  },
  cardAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14.5,
    color: 'black',
    marginTop: 10,
    lineHeight: 20,
  },
  cardBack: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'baseline',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 3,
  },
  payment: {
    flexDirection: 'row',
  },
  cardNum: {
    fontFamily: 'Urbanist-Medium',
    color: 'black',
    marginTop: 15,
    fontSize: 20,
    marginStart: 10,
  },
});
export default Checkout;
