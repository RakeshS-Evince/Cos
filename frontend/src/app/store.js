import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../feature/cartSlice'
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    cart: cartReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})