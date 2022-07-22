import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {client, Query} from "@tilework/opus";


type initialStateType = {
    category: string,
}

const initialState: initialStateType = {
    category: 'all',
};



client.setEndpoint('http://localhost:4000/carts')

export const fetchCategories = createAsyncThunk(

    'categories',
    async () => {


        const query = new Query('categories')
            .addFieldList(['name'])
        const data = await client.post(query)
        return data.categories.name
})


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchPizzas.pending, (state, action) => {
    //         state.status = Status.LOADING;
    //         state.items = [];
    //     });
    //
    //     builder.addCase(fetchPizzas.fulfilled, (state, action) => {
    //         state.items = action.payload;
    //         state.status = Status.SUCCESS;
    //     });
    //
    //     builder.addCase(fetchPizzas.rejected, (state, action) => {
    //         state.status = Status.ERROR;
    //         state.items = [];
    //     });
    // }
})
//
//
// export const cartFilter = (state: RootState) => state.filter

export const {setCategory} = categoriesSlice.actions