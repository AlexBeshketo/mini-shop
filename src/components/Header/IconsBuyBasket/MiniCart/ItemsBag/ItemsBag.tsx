import h from "./ItemsBag.module.css";
import image from "utils/counter/img.png";
import React from "react";


export const ItemsBag = () => {


    return (
        <>
            <div className={h.flex}>

                <div className={h.flex_1}>
                    <div className={h.flex_title}>Apollo Running Short</div>
                    <div className={h.flex_price}> 50.00</div>
                    <div className={h.flex_sizes}>
                        <div>Size</div>
                        <div className={h.flex_sizes_icons}>

                            <div className= {`${h.flex_sizes_icons_XS} ${h.flex_sizes_icons_default}`}> </div>
                            <div className= {`${h.flex_sizes_icons_S} ${h.flex_sizes_icons_default}`}> </div>
                            <div className= {`${h.flex_sizes_icons_L} ${h.flex_sizes_icons_default}`}> </div>
                            <div className= {`${h.flex_sizes_icons_M} ${h.flex_sizes_icons_default}`}> </div>


                        </div>
                    </div>
                    <div className={h.flex_colors}>
                        <div>Color</div>
                        <div className={h.flex_colors_flex}>
                            <div className={`${h.flex_colors_white} ${h.flex_colors_default}`}> </div>
                            <div className={`${h.flex_colors_black} ${h.flex_colors_default}`}> </div>
                            <div className={`${h.flex_colors_green} ${h.flex_colors_default}`}> </div>
                        </div>
                    </div>
                </div>

                <div className={h.flex_2}>
                    <div className={h.flex_2_plus}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V16" stroke="#1D1F22" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 12H16" stroke="#1D1F22" stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22"/>
                        </svg>
                    </div>
                    <div className={h.flex_2_count}>1</div>
                    <div className={h.flex_2_minus}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16" stroke="#1D1F22" stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22"/>
                        </svg>

                    </div>
                </div>

                <div className={h.flex_3}>
                    <div className={h.flex_3_pic}>
                        <img src={image} alt=""/>

                    </div>
                </div>

            </div>
        </>
    );
};

