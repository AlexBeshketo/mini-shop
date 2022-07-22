import { configureStore } from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {categoriesSlice} from "./categoriesSlice";
import {productsSlice} from "./products";
import {pageOfProductSlice} from "./pageOfProduct";
import {currencySlice} from "./currency";
import {shoppingCartSlice} from "./shoppingCart";




const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        products: productsSlice.reducer,
        productById:pageOfProductSlice.reducer,
        currency:currencySlice.reducer,
        shoppingCart:shoppingCartSlice.reducer

    },
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>

export default store