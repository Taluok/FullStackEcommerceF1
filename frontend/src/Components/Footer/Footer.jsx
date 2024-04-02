import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import Instagram from '../Assets/instagram_icon.png'
import Pinterest from '../Assets/pintester_icon.png'
import Whatsapp from '../Assets/whatsapp_icon.png'

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="Logo Footer" />
                <p>Grand Prix Goods</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={Instagram} alt="Instagram" />
                </div>
                <div className="footer-icons-container">
                    <img src={Pinterest} alt="Instagram" />
                </div>
                <div className="footer-icons-container">
                    <img src={Whatsapp} alt="Instagram" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyrigth @ 2024 - Grand Prix Goods</p>
            </div>
    </div>
    )
}

export default Footer