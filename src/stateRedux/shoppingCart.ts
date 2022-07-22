import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypesForOptions} from "./pageOfProduct";
import _ from "lodash";


export type CurrencyOfProductType = {
    amount: number,
    currency: { label: string, symbol: string }
}

export type ItemsType = {
    gallery: string[];
    name: string,
    id: string,
    description: string,
    category: string,
    prices: [{ amount: number, currency: { label: string, symbol: string } }],
    brand: string,
    attributes: { id: string, name: string, type: string, items: { displayValue: string, id: string, value: string }[] }[]

    color?: TypesForOptions,
    capacity?: TypesForOptions,
    size?: TypesForOptions,
    productPriceByCurrency: CurrencyOfProductType,

    count?: number


};

const initialState = {
    items: [],
    count: 0,
    totalPrice: 0,

};

type initialStateType = {
    items: Array<ItemsType>,
    totalPrice: number,
    count: number,

}
// export const calcTotalPrice = (items: ItemsType[]) => {
//     return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
// };


function deepEqual(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const shoppingCartSlice = createSlice({
    name: 'shopping cart',
    initialState: initialState as initialStateType,
    reducers:

        {
            addItem(state, action: PayloadAction<ItemsType>) {

                const findItem = state.items.find(
                  obj => {
                        debugger;

                        return _.isEqual(obj, action.payload)
                        // deepEqual(obj, action.payload)
                    })

                if (findItem) {

                    // @ts-ignore
                    findItem.count++
                } else {
                    state.items.push({
                        ...action.payload,
                        count: 1
                    })
                }

                // state.items.push(action.payload)
                // state.items.count++

                state.totalPrice = state.items.reduce((sum: number, obj: ItemsType) => {
                    return (obj.productPriceByCurrency.amount * state.count) + sum;
                }, 0)

                console.log(state.items)
                console.log(state.totalPrice)

            },

            minusItem(state, action: PayloadAction<ItemsType>) {

                const findItem = state.items.find(obj => _.isEqual(obj, action.payload))
                if (findItem) {
                    // @ts-ignore
                    if (findItem.count > 0) {
                        // @ts-ignore
                        findItem.count--
                    }
                }
            },
            //
            // removeItem(state, action: PayloadAction<number>) {
            //     state.items = state.items.filter(obj => obj.id !== action.payload)
            //     state.totalPrice = calcTotalPrice(state.items);
            //
            // },
            // clearItems(state) {
            //     state.items = []
            //     state.totalPrice = 0
            // }

        },


    //
    // removeItem(state, action: PayloadAction<number>) {
    //     state.items = state.items.filter(obj => obj.id !== action.payload)
    //     state.totalPrice = calcTotalPrice(state.items);
    //
    // },
    // clearItems(state) {
    //     state.items = []
    //     state.totalPrice = 0
    // }


})


export const {addItem, minusItem} = shoppingCartSlice.actions