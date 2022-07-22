import React from 'react';

import c from './Container.module.css'
import photo from '../../utils/counter/img.png'


class Container extends React.Component {

    dataPriceTitle= [{title:'Sony', price:'30' , url:photo},{title:'Sony', price:'20', url:photo},{title:'Sony', price:'15',url:photo},{title:'Sony', price:'20', url:photo},{title:'Sony', price:'20', url:photo},{title:'Sony', price:'20', url:photo}]


    render() {
        return (

            <div className={c.container_full}>

                <div className={c.container}>

                    <div className={c.main}>
                        <div className={c.categories}><span>Category name</span></div>

                        <div className={c.container_main}>
                            <div className={c.container_wrapper}>

                                {this.dataPriceTitle.map (el=>
                                    <DataItem el={el}/>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Container;


type DataItemType= {
    el:any;
}


export const DataItem = ({el}:DataItemType) => {
    return (
        <>
            <div className={c.items_bottom_margin}>
                <div className={c.items_container}>
                    <div className={c.items_flex}>
                        <div className={c.items_photo}>
                            <img src={el.url} alt=""/>
                        </div>
                        <div className={c.items_text}>
                            <div className={c.items_title}><span>{el.title}</span></div>
                            <div className={c.items_price}>{el.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

