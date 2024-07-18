/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays*/
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { } from 'react-native-keyboard-aware-scroll-view';
import { ImagesAssets } from '../assets/images/ImageAssets';
import PagerView from 'react-native-pager-view';
import ItemList from '../components/ItemList';
import { useAppDispatch, useAppSelector } from '../src/store';
import { fetchProducts } from '../src/counterSlice';
import LoadingIndicater from '../components/LoadingIndicater';

const list = [
    {
        id: 0,
        name: '',
    },
    {
        id: 1,
        name: '',
    },
    {
        id: 2,
        name: '',
    },
    {
        id: 3,
        name: '',
    },
];
const HomeScreen = ({ navigation }) => {
    const [position, setPosition] = useState(0);
    const [isLoading, setisLoading] = useState(true);
    const [listone, setlistone] = useState();
    const [listtwo, setlisttwo] = useState();


    let { items, status } = useAppSelector((state) => state.global);
    let dispatch = useAppDispatch();
    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
        if (status === 'succeeded') {
            setisLoading(false);
        }
        const lone =  items.filter(item => item.category === 'mens-shirts');
        setlisttwo(lone);
        const ltwo =  items.filter(item => item.category === 'mens-watches');
        setlistone(ltwo);
 
    }, [items]);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.pagerView}>
            <PagerView style={{ height: useWindowDimensions().height * 0.6, zIndex: -1 }} initialPage={0} useNext={false} onPageScroll={(e) => { setPosition(e.nativeEvent.position); }}>
                <View key="1" style={styles.page}>
                    <Image style={styles.banner} source={ImagesAssets.homepage1} />
                    <Text style={[styles.pagerText]}>Fashion{'\n'}Sale</Text>
                    <TouchableOpacity style={[styles.touchable, { elevation: 10 }]}>
                        <Text style={[styles.pagerBtn, { width: 150, }]}>Check</Text>
                    </TouchableOpacity>
                </View>
                <View key="2" style={styles.page}>
                    <Image style={styles.banner} source={ImagesAssets.homepage2} />
                    <Text style={[styles.pagerText, { color: '#DB3022' }]}>New{'\n'}Collection</Text>
                    <TouchableOpacity style={[styles.touchable, { backgroundColor: 'white', elevation: 10 }]}>
                        <Text style={[styles.pagerBtn, { width: 200, color: 'black' }]}>Check</Text>
                    </TouchableOpacity>
                </View>
                <View key="3" style={[styles.page]}>
                    <Image style={styles.banner} source={ImagesAssets.homepage3} />
                    <Text style={[styles.pagerText]}>Men's{'\n'}Hoodies</Text>
                    <TouchableOpacity style={[styles.touchable, { width: 200, elevation: 10 }]}>
                        <Text style={styles.pagerBtn}>Check</Text>
                    </TouchableOpacity>
                </View>
                <View key="4" style={styles.page}>
                    <Image style={styles.banner} source={ImagesAssets.homepage4} />
                    <Text style={[styles.pagerText]}>EyeWear</Text>
                    <TouchableOpacity style={[styles.touchable, { elevation: 10 }]}>
                        <Text style={[styles.pagerBtn, { width: 150 }]}>Check</Text>
                    </TouchableOpacity>
                </View>
            </PagerView>
            <FlatList style={{ position: 'relative', marginTop: -10, bottom: 10, alignSelf: 'center' }}
                horizontal
                data={list}
                renderItem={({ item }) => (
                    <View style={{ width: item?.id === position ? 10 : 8, height: item?.id === position ? 10 : 8, backgroundColor: item?.id === position ? 'white' : '#9B9B9B', margin: 2, borderRadius: 200, marginTop: item?.id === position ? 0 : 1 }} />
                )} />
            {
                isLoading ? (
                    <View>
                        <LoadingIndicater />
                    </View>
                ) : (
                    <View>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Urbanist-ExtraBold', fontSize: 30, color: 'black', start: 20, flex: 0.8 }}>New</Text>
                            <Text onPress={() => navigation.navigate('ItemScreen')} style={{ fontFamily: 'Urbanist-Regular', fontSize: 15, flex: 0.2, color: 'black', textAlign: 'right', marginEnd: 20 }}>View All</Text>
                        </View>
                        <ItemList items={listone} navigation={navigation} />
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Urbanist-ExtraBold', fontSize: 30, color: 'black', start: 20, flex: 0.8 }}>Summer Sale</Text>
                            <Text style={{ fontFamily: 'Urbanist-Regular', fontSize: 15, flex: 0.2, color: 'black', textAlign: 'right', marginEnd: 20 }} onPress={() => navigation.navigate('ItemScreen')}>View All</Text>
                        </View>
                        <ItemList items={listtwo} navigation={navigation}/>
                    </View>
                )
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
        marginBottom: 60,
    },
    page: {
        flex: 1,
    },
    pagerText: {
        position: 'absolute', bottom: 80, color: 'white', fontFamily: 'Urbanist-ExtraBold', fontSize: 60, lineHeight: 55, start: 20,
    },
    pagerBtn: {
        fontFamily: 'Urbanist-Regular', textAlign: 'center', fontSize: 18, color: 'white',
    },
    touchable: {
        position: 'absolute', backgroundColor: '#DB3022', bottom: 30, borderRadius: 40, height: 40, alignItems: 'center', justifyContent: 'center', start: 20
    },
    banner: {
        width: '100%', height: '100%',
    },
});
export default HomeScreen;