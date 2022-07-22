import React, {useEffect} from 'react';

import c from './HomePage.module.css'

import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../stateRedux/store";
import {fetchProducts} from "../../../stateRedux/products";
import {fetchProductByID} from "../../../stateRedux/pageOfProduct";


const HomePage = () => {


    // state = {
    //     dataPriceTitle : [{title: 'Sony', price: '30', url: photo}, {
    //         title: 'Sony',
    //         price: '20',
    //         url: photo
    //     }, {title: 'Sony', price: '15', url: photo}, {title: 'Sony', price: '20', url: photo}, {
    //         title: 'Sony',
    //         price: '20',
    //         url: photo
    //     }, {title: 'Sony', price: '20', url: photo}],
    //
    //     category: ['all', 'clothes', 'tech']
    // }


    const dispatch = useAppDispatch()

    const {products} = useAppSelector(state => state.products)

    console.log(products)
    const currentValiute = useAppSelector(state => state.currency.currentValiute)




    useEffect(() => {
        dispatch(fetchProducts('all'))
    }, [dispatch])


    // const onClickHandler= () =>
    // {
    //
    // }

// console.log(products[2].prices[2].currency.label)




    return (

        <div className={c.container_full}>


            <div className={c.main}>
                <div className={c.categories}><span>Category name</span></div>

                <div className={c.container_main}>
                    <div className={c.container_wrapper}>
                        {
                            products.map((el: any) => <DataItem key={el.id} el={el}/>)
                        }

                    </div>
                </div>
            </div>


        </div>

    );
}

export default HomePage;


type DataItemType = {
    el: any;
}


export const DataItem = ({el}: DataItemType) => {


    const dispatch = useAppDispatch()
    const onClickHandler = () => {
        dispatch(fetchProductByID(el.id))
    }
    const currentValiute = useAppSelector(state => state.currency.currentValiute)

    const currentValiuteForProduct=el.prices.find((el:any )=> el.currency.label=== currentValiute.label)


    return (
        <>
            <div className={c.items_bottom_margin}>
                <div className={c.items_container}>


                    <NavLink onClick={onClickHandler} to={`/products/${el.id}`}>
                        <div className={c.items_flex}>
                            <div className={c.items_photo}>
                                <img src={el.gallery[0]} alt=""/>
                            </div>
                            <div className={c.items_text}>
                                <div className={c.items_title}><span>{el.name}</span></div>
                                <div className={c.items_price}>{currentValiuteForProduct.amount}{currentValiuteForProduct.currency.symbol}</div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

