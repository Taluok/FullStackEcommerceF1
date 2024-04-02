import React, { useContext } from 'react';
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContex'

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="productDisplay">
            {product && (
                <div className="productdisplay-left">
                    <div className="productdisplay-img-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                    <div className="productdisplay-img">
                        <img className='productdisplay-main-img' src={product.image} alt="" />
                    </div>
                    <div className="productdisplay-right">
                        <h1>{product.name}</h1>
                        <div className="productdisplay-rigth-star">
                            <img src={star_icon} alt="" />
                            <img src={star_icon} alt="" />
                            <img src={star_icon} alt="" />
                            <img src={star_icon} alt="" />
                            <img src={star_dull_icon} alt="" />
                            <p>(122)</p>
                        </div>
                        <div className="productdisplay-right-prices">
                            <div className="productdisplay-rigth-price-old">${product.old_price}</div>
                            <div className="productdisplay-right-price-new">${product.new_price}</div>
                        </div>
                        <div className="productdisplay-right-description">
                            Uno de los estilos de zapatillas más icónicos de PUMA está de vuelta y esta vez se trata de deportes de motor.
                        </div>
                        <div className='productdisplay-right-size'>
                            <h1>Select Size</h1>
                            <div className="productdisplay-right-sizes">
                                <div>S</div>
                                <div>M</div>
                                <div>L</div>
                                <div>XL</div>
                                <div>XXL</div>
                            </div>
                        </div>
                        <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                        <p className="productdisplay-right-category"><span>Category :</span>Women, Deportive Tshirt, Shoes </p>
                        <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest, F1, Deport</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDisplay;
