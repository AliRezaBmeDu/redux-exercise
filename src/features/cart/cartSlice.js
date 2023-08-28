import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url).then(resp => resp.json()).catch((error) => console.log(error))
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            // return {cartItems: []}
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=>
            item.id !== itemId)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => 
                item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
            // console.log('The cartItem', cartItem);
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => 
                item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
            // console.log('The cartItem', cartItem);
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state)=> {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state,action) => {
            state.isLoading = false;
            console.log(action);
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state)=> {
            state.isLoading = false;
        },
    }
});

// console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer