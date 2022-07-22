import React from "react";
import h from "./ShoppingCart.module.css";
import {useAppDispatch, useAppSelector} from "../../../stateRedux/store";
import {Capacity, CapacityItems, ColorsItem, SizesItem} from "../PageViewItem/CartOfProduct";
import {addItem, ItemsType, minusItem} from "../../../stateRedux/shoppingCart";


export const ShoppingCart = () => {


    const shoppingCartProduct = useAppSelector(store => store.shoppingCart.items)
    const totalPrice = useAppSelector(store => store.shoppingCart.totalPrice)
    const {currentValiute} = useAppSelector(store => store.currency)


    if (!shoppingCartProduct) {
        return <div>...Not Items, sorry</div>
    }



    console.log(shoppingCartProduct)

    return (
        <>
            <div className={h.main}>
                <div className={h.container}>
                    <div className={h.title}>
                        Cart
                    </div>

                        {shoppingCartProduct.map((el,index) =>
                            <ShoppingCartItems key={index} el={el} currentValiute={currentValiute}/>
                        )}


                    <div className={h.generalPrice}>
                        <div className={h.generalPrice_left_flex}>
                            <div>Tax 21%:</div>
                            <div>Quantity:</div>
                            <div>Total:</div>
                        </div>
                        <div className={h.generalPrice_right_flex}>
                            <div>$42.00</div>
                            <div>3</div>
                            <div>${totalPrice}</div>
                        </div>
                    </div>

                    <div className={h.button}>
                        <button><span>Order</span></button>
                    </div>
                </div>
            </div>

        </>
    );
};





type ShoppingCartItems = {
    el: ItemsType
    currentValiute: any
}

export const ShoppingCartItems = ({el, currentValiute}: ShoppingCartItems) => {

const dispatch=useAppDispatch();
    const capacityItem = el.attributes.find(el => el.id === 'Capacity')
    const sizeItem = el.attributes.find(el => el.id === 'Size')
    const colorItem = el.attributes.find(el => el.id === 'Color')

    const onClickAddItem= ()=> {
        dispatch(addItem(el))
    }

    const onClickMinusItem= ()=> {
        dispatch(minusItem(el))
    }

    console.log(el)

    return (
        <>
            <div className={h.flex}>
                <div className={h.flex_1}>

                    <div className={h.flex_border}>


                        <div className={h.flex_title_main}>{el.name}</div>
                        <div className={h.flex_title}>{el.id}</div>


                        <div className={h.flex_prices}></div>

                        {capacityItem &&

                        <div className={h.flex_sizes}>
                            <div>Capacity:</div>
                            <div className={h.flex_sizes_icons}>

                                {capacityItem?.items.map((items,index) =>
                                    // <div
                                    //     className={`${h.flex_sizes_icons_xs} ${h.flex_sizes_default}`}>
                                    // </div>
                                    <CapacityItems key={index}  el={items} capacity={el.capacity}/>
                                )}

                            </div>
                        </div>
                        }

                        {sizeItem &&
                        <div className={h.flex_sizes}>
                            <div>Size:</div>
                            <div className={h.flex_sizes_icons}>

                                {sizeItem?.items.map((items,index) =>

                                    <SizesItem key={index} el={items} sizes={el.size}/>
                                // <div
                                //     className={`${h.flex_sizes_icons_xs} ${h.flex_sizes_default}`}>{el.size?.id}</div>
                                // <div className={`${h.flex_sizes_icons_s} ${h.flex_sizes_default}`}></div>
                                // <div className={`${h.flex_sizes_icons_m} ${h.flex_sizes_default}`}></div>
                                // <div className={`${h.flex_sizes_icons_l} ${h.flex_sizes_default}`}></div>

                                )}

                            </div>
                        </div>
                        }

                        {colorItem &&
                        <div className={h.flex_colors}>
                            <div className={h.flex_colors_title}>Color:</div>
                            <div className={h.flex_colors_flex}>

                                {colorItem?.items.map((items,index)=>
                                    <ColorsItem key={index} el={items} color={el.color}/>
                                // <div
                                //     className={`${h.flex_colors_white} ${h.flex_colors_default}`}>{el.color?.value}</div>

                                )}
                            </div>

                        </div>
                        }
                    </div>

                </div>


                <div className={h.flex_2_3}>
                    <div className={h.flex_2}>
                        <div onClick={onClickAddItem} className={`${h.flex_2_plus} ${h.flex_2_counters}`}>+</div>
                        <div className={h.flex_2_count}>{el.count}</div>
                        <div onClick={onClickMinusItem} className={`${h.flex_2_minus} ${h.flex_2_counters}`}><span>-</span></div>
                    </div>

                    <div className={h.flex_3}>
                        <div className={h.flex_3_pic}>
                            <img src={el.gallery[0]} alt=""/>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};



