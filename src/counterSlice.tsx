/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
  '',
  async () => {
    try {
    const response = await axios.get('https://dummyjson.com/products?limit=194');
    return response.data.products.map((product: any) => ({ ...product, isLiked: false, addedToCart : false , qty : 0, size : '', color: ''}));
  } catch(error) {
      console.log(error);
    }
  },
);

const initialState = {
  items: [],
  status: 'idle',
}

const counterSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    manageFavourite (state, action) {
      const product = state?.items?.find(item => item.id === action.payload);
      console.log('payloaaaaaaaaaaad',action?.payload)
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    addCart (state, action) {
      const product = state.items.find(item=> item.id === action.payload.id);
      if(product){
        product.addedToCart = true;
        product.size = action.payload.s;
        product.color = action.payload.c;
        product.qty = 1;
      }
    },
    removeCart (state, action) {
      const product = state.items.find(item=> item.id === action.payload);
      if(product){
        product.addedToCart = false;
        product.size = '';
        product.color = '';
        product.qty = 0;
      }
      console.log('product???????????????????????????????????????', product);
    },
    reduceQuantity(state, action){
     const product = state.items.find(item => item.id === action.payload);
     if(product){
      product.qty -= 1;
     }
    },
    increaseQuantity(state, action){
      const product = state.items.find(item => item.id === action.payload);
      if(product){
       product.qty += 1;
      }
     },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state,) => {
        state.status = 'failed';
        // state.error = action.error.message;
      });
  },
});

export const { manageFavourite, addCart, reduceQuantity, increaseQuantity, removeCart} = counterSlice.actions;

export default counterSlice.reducer;
