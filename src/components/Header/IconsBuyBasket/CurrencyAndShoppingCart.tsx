import React, {useEffect, useRef, useState} from "react";
import h from "./CurrencyAndShoppingCart.module.css";
import {MiniCart} from "../IconsBuyBasket/MiniCart/MiniCart";
import {useAppDispatch, useAppSelector} from "../../../stateRedux/store";
import {CurrenciesType, fetchCurrency, setСurrentValiute} from "../../../stateRedux/currency";


export const CurrencyAndShoppingCart = () => {

    const [isVisible, setIsVisible] = useState(false)
    const currency = useAppSelector(state => state.currency.currencies)
    const currentValiute=useAppSelector(state=> state.currency.currentValiute)

    console.log(currency)
    console.log(currentValiute)

    const dispatch = useAppDispatch()
    const onClickSelectsList = (obj:CurrenciesType) => {

        setIsVisible(false)
        dispatch(setСurrentValiute(obj))
    }

    const sortRef = useRef<HTMLHeadingElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.path.includes(sortRef.current)) {
                setIsVisible(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])


    useEffect(() => {
        dispatch((fetchCurrency()))
    }, [dispatch])


    return (
        <>
            <div className={h.flex_icon}>

                <div ref={sortRef} onClick={() => {
                    setIsVisible(!isVisible)
                }} className={h.buy_icon}>
                    <span className={h.cursor_pointer}>
                        {currentValiute.symbol}
                    </span>


                </div>



                <div style={{paddingLeft: '8px'}} className={h.buy_iconthree}>
                    <svg
                        className={h.array} width="8" height="4" viewBox="0 0 8 4" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.5L4 3.5L7 0.5" stroke="black" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </div>

                <div className={h.relative}>


                    {isVisible && (
                        <div className={h.popup}>

                            {currency.map((obj, index) => (
                                <li className={h.list} key={index} onClick={() => onClickSelectsList(obj)}>
                                    <span>{obj.symbol}</span>
                                    <span>{obj.label}</span>
                                </li>
                            ))}

                        </div>
                    )}

                    <MiniCart/>

                </div>

            </div>
        </>
    );
};



