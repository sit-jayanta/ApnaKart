/* eslint-disable prettier/prettier */
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = {
  id: number,
  name: string
}

const categoryList: Category[] = [
  {
    id: 0,
    name: 'Tops',
  },
  {
    id: 1,
    name: 'Shirts',
  },
  {
    id: 2,
    name: 'T-Shirts',
  },
  {
    id: 3,
    name: 'Pants',
  },
  {
    id: 4,
    name: 'Trousers',
  },
  {
    id: 5,
    name: 'Jeans',
  },
  {
    id: 6,
    name: 'Shorts',
  },
  {
    id: 7,
    name: 'Skirts',
  },
  {
    id: 8,
    name: 'Dresses',
  }, {
    id: 9,
    name: 'Sweaters',
  },
];

const Details = () => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', borderRadius: 25, backgroundColor: '#DB3022', margin: 10, alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
        <Text style={{ fontFamily: 'Urbanist-Regular', alignSelf: 'center', color: 'white' }}>VIEW ALL ITEMS</Text>
      </View>
      <Text style={{ fontFamily: 'Urbanist-Regular', color: '#9B9B9B', marginStart: 15, fontSize: 15}}>Choose Category</Text>
      <FlatList style={{ marginTop: 20 }}
        data={categoryList}
        renderItem={({ item }) =>
        <><Text style={{ paddingVertical: 10, fontFamily: 'Urbanist-Regular', paddingStart: 30, fontSize: 20, color: 'black' }}>{item?.name}</Text><View style={{ borderBottomColor: '#669B9B9B', borderBottomWidth:1, opacity: 0.2 }}></View></>
        } />
    </SafeAreaView>
  );
};

export default Details;
