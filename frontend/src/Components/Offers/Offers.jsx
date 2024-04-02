import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/keyart_crushed.png'

const Offers = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1> Especial Offers For You</h1>
                <p> ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt="pilots" className="OffersImag"/>
            </div>
        </div>
    )
}

export default Offers