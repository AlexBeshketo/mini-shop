import React, {useEffect} from 'react';
import h from './Header.module.css'
import BuyLogo from '../../utils/header/a-logo.png'
import {CurrencyAndShoppingCart} from "components/Header/IconsBuyBasket/CurrencyAndShoppingCart";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../stateRedux/store";
import { setCategory} from "../../stateRedux/categoriesSlice";
import {fetchProducts} from "../../stateRedux/products";


export class Header extends React.Component {
    render() {
        return (
            <header>
                <div className={h.header_container}>

                    <div className={h.flex_list}>


                        <Categories/>

                        <NavLink to="/all">
                            <div className={h.buy_icon}>
                                <img className={h.buy_icon_greenBasket} src={BuyLogo} alt="BuyLogo"/>
                            </div>
                        </NavLink>

                        {/*third block of icons */}
                        <CurrencyAndShoppingCart/>
                        {/*<MiniCart/>*/}

                    </div>
                </div>

            </header>
        );
    }
}

export default Header;


export const Categories = () => {



    const dispatch = useAppDispatch()
    const categories = ["all","clothes", "tech" ]


    const onClickCategory = (categoryName: string) => {
        console.log(categoryName)
        // dispatch(setCategory(categoryName))
        dispatch(fetchProducts(categoryName))
    }

    return (
        <div className={h.list}>
            {categories.map((categoryName, index) => (
                <NavLink key={index} to={`/${categoryName}`}>
                <span onClick={()=>onClickCategory(categoryName)} key={index}>{categoryName}</span>
                </NavLink>
            ))}

        </div>
    );
};




