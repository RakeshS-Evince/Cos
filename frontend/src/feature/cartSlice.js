import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    items: [],
    total: 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let find = state.items.findIndex(item => action.payload.id === item.id);
            if (find >= 0) {
                if (state.items[find].quantity === state.items[find].available) {
                    state.items[find].disable = true
                    return
                }
                state.items[find].quantity += 1;
                state.total += action.payload.price
                return
            }
            state.items.push(action.payload);
            state.total += action.payload.price
        },
        removeFromCart: (state, action) => {
            console.log(action.payload)
            state.items.pop(action.payload)
            state.total -= (action.payload.price * action.payload.quantity)
        },
        increaseQuantity: (state, action) => {
            let find = state.items.findIndex(item => action.payload.id === item.id);
            if (state.items[find].quantity === state.items[find].available) {
                state.items[find].disable = true
                return
            }
            state.items[find].quantity += 1;
            state.total += action.payload.price
        },
        decreaseQuantity: (state, action) => {
            state.items = state.items.map((ele) => {
                if (ele.id === action.payload.id) {
                    return { ...ele, quantity: ele.quantity - 1, disable: false };
                }
                return ele
            }).filter((ele) => ele.quantity > 0)
            state.total -= action.payload.price
        },
    },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, makeTotal } = cartSlice.actions
export const selectCart = (state) => state.cart.items
export default cartSlice.reducer