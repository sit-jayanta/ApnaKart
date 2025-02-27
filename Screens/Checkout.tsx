/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {ImagesAssets} from '../assets/images/ImageAssets';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

type DeliveryMethods = {
  id: number;
  image: any;
  time: string;
  isSelected: boolean;
};
const list: DeliveryMethods[] = [
  {
    id: 0,
    image: ImagesAssets.fedex,
    time: '2-3 days',
    isSelected: false,
  },
  {
    id: 1,
    image: ImagesAssets.usps,
    time: '2-3 days',
    isSelected: false,
  },
  {
    id: 2,
    image: ImagesAssets.dhl,
    time: '2-3 days',
    isSelected: false,
  },
];

const Checkout = () => {
  const width = useWindowDimensions().width;
  const [deliveryList, updateList] = useState<DeliveryMethods[]>(list);

  const updateSelected = index => {
    const newList = deliveryList.map(item => ({
      ...item,
      isSelected: item.id === index,
    }));
    updateList(newList);
  };

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
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-between',
        }}>
        {deliveryList.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.delMethods,
              {
                width: width / 3.5,
                borderColor: item.isSelected ? '#DB3022' : 'white',
              },
            ]}
            onPress={() => {
              updateSelected(index);
            }}>
            <Image source={item.image} />
            <Text style={styles.textDel}>{item.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.textSummary}>Order Summary</Text>
      <View style={styles.backSummary}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: 'Urbanist-Medium',
              color: 'grey',
              fontSize: 15,
            }}>
            Order Total
          </Text>
          <Text style={[{justifyContent: 'flex-end'}, styles.name]}>$873</Text>
        </View>
        <View style={{marginTop: 7,flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: 'Urbanist-Medium',
              color: 'grey',
              fontSize: 15,
            }}>
            Order Total
          </Text>
          <Text style={[{justifyContent: 'flex-end'}, styles.name]}>$873</Text>
        </View>
        <View style={{marginTop: 7,flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: 'Urbanist-Medium',
              color: 'grey',
              fontSize: 15,
            }}>
            Order Total
          </Text>
          <Text style={[{justifyContent: 'flex-end'}, styles.name]}>$873</Text>
        </View>
      </View>
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
  delMethods: {
    height: 80,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDel: {
    fontFamily: 'Urbanist-Medium',
    color: 'grey',
    marginTop: 5,
    fontSize: 12,
  },
  textSummary: {
    fontFamily: 'Urbanist-Bold',
    color: 'black',
    marginHorizontal: 10,
    marginTop: 20,
    fontSize: 17,
  },
  backSummary: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
});
export default Checkout;
