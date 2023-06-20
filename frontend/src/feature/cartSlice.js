import { createSlice } from '@reduxjs/toolkit'
import { Store } from 'react-notifications-component';
const initialState = {
    items: [],
    total: 0,
    wishlist: []

}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            let find = state.wishlist.findIndex(item => action.payload.id === item.id);
            if (find >= 0) {
                state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
                Store.addNotification({
                    message: "Item removed from your wishlist",
                    type: "danger",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1000,
                        onScreen: true
                    }
                })
                return
            }
            state.wishlist.push(action.payload);
            Store.addNotification({
                message: "Item added to wishlist!",
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true
                }
            })

        },
        addToCart: (state, action) => {
            let find = state.items.findIndex(item => action.payload.id === item.id);
            let findWishlist = state.wishlist.findIndex(item => action.payload.id === item.id);
            if (findWishlist >= 0) {
                state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
            }
            if (find >= 0) {
                if (state.items[find].quantity === state.items[find].available) {
                    state.items[find].disable = true
                    return
                }
                state.items[find].quantity = parseInt(state.items[find].quantity) + 1;
                state.total += action.payload.price
                return
            }
            state.items.push(action.payload);
            state.total += action.payload.price
        },
        addToCartWithMoreQuantity: (state, action) => {
            let find = state.items.findIndex(item => action.payload.id === item.id);
            if (find >= 0) {
                if ((state.items[find].quantity > state.items[find].available) || (parseInt(state.items[find].quantity) + parseInt(action.payload.quantity) > state.items[find].available)) {
                    alert('You have already added the item quantity available in our stock to the cart')
                    return
                }
                state.items[find].quantity = parseInt(state.items[find].quantity) + parseInt(action.payload.quantity);
                state.total += (action.payload.price * action.payload.quantity)
                return
            }
            state.items.push(action.payload);
            state.total += action.payload.price * action.payload.quantity
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
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
        clearCart: (state) => {
            state.items = []
            state.total = 0;
        }
    },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, makeTotal, clearCart, addToCartWithMoreQuantity, addToWishlist } = cartSlice.actions
export const selectCart = (state) => state.cart.items;
export default cartSlice.reducer