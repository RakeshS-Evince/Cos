import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    items: [],
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let find = state.items.findIndex(item => action.payload.id === item.id);
            if (find >= 0) {
                state.items[find].quantity += 1;
                return
            }
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items.pop(action.payload);
        },
        increaseQuantity: (state, action) => {
            let find = state.items.findIndex(item => action.payload.id === item.id);
            state.items[find].quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            state.items = state.items.map((ele) => {
                if (ele.id === action.payload.id) {
                    return { ...ele, quantity: ele.quantity - 1 };
                }
                return ele
            }).filter((ele) => ele.quantity > 0)
        },
    },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export const selectCart = (state) => state.cart.items
export default cartSlice.reducer