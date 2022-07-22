import React, {useEffect, useState} from "react";
import h from "./CartOfProduct.module.css";
import {useAppDispatch, useAppSelector} from "../../../stateRedux/store";
import {
    ProductType,
    removeSizeCapacityColors,
    setCapacity,
    setProductsColor,
    setSize,
    TypesForOptions
} from "../../../stateRedux/pageOfProduct";
import {addItem} from "../../../stateRedux/shoppingCart";


const CartOfProduct = () => {

    const dispatch = useAppDispatch()


    const currentValiute = useAppSelector(state => state.currency.currentValiute)
    const {color, product, capacity, size} = useAppSelector(state => state.productById)

    const productPriceByCurrency = product?.prices?.find(el => el.currency.label === currentValiute.label)


    if (!productPriceByCurrency) {
        return <div>.....</div>
    }

    const onClickAddProductToCart = () => {
        dispatch(addItem({...product, color, size, capacity,productPriceByCurrency}))
        dispatch(removeSizeCapacityColors())
    }

    // gallery: string[];
    // name:string,
    //     id:string,
    //     description:string,
    //     category:string,
    //     prices: [{amount: number, currency: {label: string, symbol: string}}],
    //     brand:string
    // attributes:{id: string, name: string, type: string, items: {displayValue: string, id: string, value: string}[]}[]

    return (
        <>
            <div className={h.container}>

                <div className={h.flex}>
                    <div className={h.flex_1}>

                        <div className={h.flex_1_photo1}>
                            <img src={product.gallery[0]} alt=""/>
                        </div>

                    </div>

                    <div className={h.flex_2_3_container}>
                        <div className={h.flex_2}>
                            <img src={'fghfgh'} alt=""/>
                        </div>


                        <div className={h.flex_3}>
                            <div className={h.flex_title_main}>{product.brand}</div>
                            <div className={h.flex_title}>{product.name}</div>

                            <Sizes product={product}/>
                            <Colors product={product}/>
                            <Capacity product={product}/>


                            <div className={h.totalPrice}>
                                <div className={h.totalPrice_title}>
                                    PRICE:
                                </div>
                                <div className={h.totalPrice_price}>
                                    {productPriceByCurrency.amount} {productPriceByCurrency.currency.symbol}
                                </div>
                            </div>

                            <div className={h.button}>
                                <button onClick={onClickAddProductToCart} className={h.button_btn}>
                                    <span>Add to card</span>
                                </button>
                            </div>

                            <div className={h.text}>
                                <span>{product.description.replace(/<\/?[a-zA-Z]+>/gi, '')}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default CartOfProduct;


////SIZES

type SizesType = {
    product: ProductType
}

type PropsType = {
    el: any,
    capacity?: TypesForOptions
    color?:TypesForOptions
    sizes?:TypesForOptions
}

export const Sizes = ({product}: SizesType) => {

    let sizeOfProduct = product?.attributes?.find(el => el.id === 'Size')
    const [showSizes, setShowSizes] = useState(false)
    const {size} = useAppSelector(state => state.productById)


    useEffect(() => {
        if (product?.attributes?.find(el => el.id === 'Size')) {
            setShowSizes(true)
        }
    }, [product])

    return (
        <>
            {showSizes &&
            <div className={h.flex_sizes}>
                <div>Size:</div>
                <div className={h.flex_sizes_icons}>
                    {
                        sizeOfProduct?.items?.map((el,index) =>
                            <SizesItem key={index} el={el} sizes={size}/>
                        )}
                </div>
            </div>
            }
        </>
    );
};



export const SizesItem = ({el,sizes}:PropsType) => {

    const dispatch = useAppDispatch()
    const onClickChangeSize = (size: TypesForOptions) => {
        dispatch(setSize(size))

    }

    return (
        <div  onClick={() => onClickChangeSize(el)}
             className={`${sizes?.id === el.id ? h.flex_sizes_active : ''} ${h.flex_sizes_default}`}>{el.id}</div>
    );
};



///Colors

export const Colors = ({product}: SizesType) => {

        const [showColors, setShowColors] = useState(false)
    const {color} = useAppSelector(state => state.productById)

    let colorsofProduct = product?.attributes?.find(el => el.id === 'Color')


    useEffect(() => {

        if (product?.attributes?.find(el => el.id === 'Color')) {
            setShowColors(true)
        }
    }, [product])

    return (
        <>
            {showColors &&

            <div className={h.flex_colors}>
                <div className={h.flex_colors_title}>Color:</div>
                <div className={h.flex_colors_flex}>
                    {
                        colorsofProduct?.items?.map((el,index) =>
                            <ColorsItem key={index} el={el} color={color}/>
                        )}
                </div>
            </div>

            }
        </>
    );
};



export const ColorsItem = ({el,color}:PropsType) => {

    const dispatch = useAppDispatch()
    const onColorsClick = (color: TypesForOptions) => {
        dispatch(setProductsColor(color))
    }

    return (
        <div  onClick={() => onColorsClick(el)}
             style={{backgroundColor: el.value}}
             className={` ${color?.id === el.id ? h.flex_colors_active : ''} ${h.flex_colors_default}`}></div>
    );
};


///Capacity


export const Capacity = ({product}: SizesType) => {

    const {capacity} = useAppSelector(state => state.productById)
    const [showCapacity, setShowCapacity] = useState(false)
    let capacityOfProduct = product?.attributes?.find(el => el.id === 'Capacity')

    useEffect(() => {
        if (product?.attributes?.find(el => el.id === 'Capacity')) {
            setShowCapacity(true)
        }
    }, [product])

    return (
        <>
            {showCapacity &&
            <div className={h.flex_sizes}>
                <div>Capacity:</div>
                <div className={h.flex_sizes_icons}>
                    {
                        capacityOfProduct?.items?.map((el,index) =>
                            <CapacityItems el={el} key={index} capacity={capacity}/>
                        )}
                </div>
            </div>
            }
        </>
    );
};

export const CapacityItems = ({el, capacity}: PropsType) => {

    const dispatch = useAppDispatch()
    const onClickChangeCapacity = (capacity: TypesForOptions) => {
        dispatch(setCapacity(capacity))
    }

    debugger;

    return (
        <div  onClick={() => onClickChangeCapacity(el)}
             className={`${capacity?.id === el.id ? h.flex_capacity_active : ''} ${h.flex_capacity_default}`}>{el.value}</div>
    );
};


/////




