import React from 'react';
import './Popular.css';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const Popular = () => {
    // Obtener los primeros 3 productos
    const popularProducts = data_product.slice(0, 3);

    return (
        <div className='popular'>
            <h1>POPULAR IN SCUDERIA</h1>
            <hr/>
            <div className="popular-items">
                {popularProducts.map((item, index) => (
                    <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
        </div>
    );
};

export default Popular;

