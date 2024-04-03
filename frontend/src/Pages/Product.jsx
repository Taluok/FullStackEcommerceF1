import React, { useContext } from 'react';
import './CSS/Product.css';
import { ShopContext } from '../Context/ShopContex';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';

const Products = () => {
    const { allProducts } = useContext(ShopContext);
    const { productId } = useParams();
    
    const product = allProducts && allProducts.length > 0 ? allProducts.find((e) => e.id === Number(productId)) : null;


    return (
        <div>
            {product && (
                <>
                    <Breadcrum product={product} />
                    <ProductDisplay product={product} />
                    <DescriptionBox/>
                </>
            )}
        </div>
    );
};

export default Products;


