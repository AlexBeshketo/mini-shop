import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {client, DataType, Field, Query} from "@tilework/opus";
import {categoriesSlice} from "./categoriesSlice";


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}


export type CurrenciesType = {
    symbol:string,
    label:string,

}
type initialStateType = {

    currencies: CurrenciesType[],
    currentValiute: CurrenciesType
    status:Status
}



const initialState: initialStateType = {

    currencies:[],
    currentValiute: {label: 'USD', symbol: '$'},
    status:Status.LOADING,
};

client.setEndpoint('http://localhost:4000/carts')

export const fetchCurrency = createAsyncThunk(
    'currency',
    async () => {

        let result:DataType<typeof query>

        const query = new Query('currencies')
            .addFieldList([' label','symbol'])

        result= await client.post(query)
        return result.currencies;

    })


export const currencySlice = createSlice({
    name: 'currency',
    initialState: initialState,
    reducers: {
        setСurrentValiute(state, action: PayloadAction<CurrenciesType>) {
            debugger;
            state.currentValiute = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrency.pending, (state, action) => {
            state.status = Status.LOADING;
            state.currencies = [];
        });

        builder.addCase(fetchCurrency.fulfilled, (state, action) => {

            // @ts-ignore
            state.currencies = action.payload  ;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchCurrency.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.currencies = [];
        });

    }})


export const {setСurrentValiute} = currencySlice.actions

