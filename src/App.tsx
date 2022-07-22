import React from 'react';
import './App.css';

import {client, DataType, Field, Query} from '@tilework/opus';

import Header from "./components/Header/Header";
import {ShoppingCart} from "./components/pages/ShoppingCart/ShoppingCart";
import HomePage from "./components/pages/HomePage/HomePage";
import CartOfProduct from "./components/pages/PageViewItem/CartOfProduct";
import {Route, Routes} from "react-router-dom";
import {createAsyncThunk} from "@reduxjs/toolkit";
import store from "./stateRedux/store";
import {Provider} from "react-redux";




class App extends React.Component {

    render() {

        return (
            <>
                <div className="main_width100">
                    <div className="container_width80">
                        <Provider store={store}>
                        <Header/>

                        <Routes>
                            <Route path={'/'} element={<HomePage/>}/>
                            <Route path={'/:category'} element={<HomePage/>}/>
                            <Route path={'/products/:id'} element={<CartOfProduct/>}/>
                            <Route path={'/shoppingcart'} element={<ShoppingCart/>}/>



                            {/*<Route path='/404' element={<h1>Page not Found</h1>}/>*/}
                            {/*<Route path='*' element={<Navigate to='/404'/>}/>*/}

                        </Routes>


                        {/*<HomePage/>*/}
                        {/*<CartOfProduct/>*/}
                        {/*<ShoppingCart/>*/}

                        </Provider>
                    </div>
                </div>
            </>
        );
    }
}

export default App;
