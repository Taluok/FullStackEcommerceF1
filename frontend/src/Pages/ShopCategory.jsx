import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContex";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
    const { allProducts } = useContext(ShopContext);

    // Filtrar los productos por categoría
    const filteredProducts = allProducts.filter((item) => item.category === props.category);

    return (
        <div className="shop-category">
            {props.banner && <img className='shopcategory-banner' src={props.banner} alt="" />}
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {filteredProducts.map((item) => (
                    <Item key={item.id} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
                ))}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCategory;




