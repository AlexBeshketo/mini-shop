import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {client, DataType, Field, Query} from "@tilework/opus";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

export type ProductType = {
    gallery: string[];
    name:string,
    id:string,
    description:string,
    category:string,
    prices: [{amount: number, currency: {label: string, symbol: string}}],
    brand:string
    attributes:{id: string, name: string, type: string, items: {displayValue: string, id: string, value: string}[]}[]
}

export type TypesForOptions= {
displayValue: string,
    id: string,
    value: string
}

type initialStateType = {
    product: ProductType,
    color: TypesForOptions,
    capacity:TypesForOptions,
    size:TypesForOptions,
    status:Status
}

const initialState: initialStateType = {
    product:{} as ProductType,
    color: {} as TypesForOptions,
    capacity: {} as TypesForOptions,
    size:{} as TypesForOptions,
    status:Status.LOADING
};



client.setEndpoint('http://localhost:4000/carts')

export const fetchProductByID = createAsyncThunk(

    'productById',
    async (productID:string) => {

        let result:DataType<typeof query>

        const query = new Query('product')
            .addArgument("id", "String!", productID)

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


            );

        result = await client.post(query)

        return result.product;


})


export const pageOfProductSlice = createSlice({
    name: 'productById',
    initialState: initialState,
    reducers: {
        setProductById(state, action: PayloadAction<ProductType>) {
            state.product = action.payload
        },
        setProductsColor(state, action: PayloadAction<TypesForOptions>) {
            state.color = action.payload
        },
        setCapacity(state, action: PayloadAction<TypesForOptions>) {
            state.capacity = action.payload
        },
        setSize(state, action: PayloadAction<TypesForOptions>) {
            state.size = action.payload
            debugger;
        },
        removeSizeCapacityColors(state) {
            state.capacity = {} as TypesForOptions
            state.size={} as TypesForOptions
            state.color={}  as TypesForOptions

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductByID.pending, (state, action) => {
            state.status = Status.LOADING;
            state.product = {} as ProductType;
        });

        builder.addCase(fetchProductByID.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;

            // @ts-ignore
            state.product = action.payload;
        });

        builder.addCase(fetchProductByID.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.product = {} as ProductType;
        });
    }
})

export const {setProductById,setProductsColor,setCapacity,setSize , removeSizeCapacityColors} = pageOfProductSlice.actions