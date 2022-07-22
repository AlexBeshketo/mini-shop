import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {client, DataType, Field, Query} from "@tilework/opus";


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

type initialStateType = {

    products:[] | any,
    status:Status
}

const initialState: initialStateType = {

    products:[],
    status:Status.LOADING,
};

client.setEndpoint('http://localhost:4000/carts')

export const fetchProducts = createAsyncThunk(
    'products',
    async (category:string) => {

        let result:DataType<typeof query>

        const query = new Query('category')

            .addArgument("input", "CategoryInput", {title: category})

            .addField(
                new Field('products', true)
                    .addFieldList(['name', 'id', 'gallery','description', 'category','brand'])
                    .addField(
                        new Field('attributes', true)
                            .addFieldList(['id', 'name','type'])
                            .addField(
                                new Field('items', true)
                                    .addFieldList(['displayValue','id','value'])
                            )
                    )
                    .addField(
                        new Field('prices', true)
                            .addFieldList(['amount'])

                            .addField(
                                new Field('currency', true)
                                    .addFieldList(['label', 'symbol'])
                            )
                    )

            );

        result= await client.post(query)

        return result.category.products;

    })


export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setProducts(state, action: PayloadAction<[]>) {
            state.products = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = Status.LOADING;
            state.products = [];
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.products = [];
        });


    }})


