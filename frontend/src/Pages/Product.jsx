import React, { useContext } from 'react';
import './CSS/Product.css';
import { ShopContext } from '../Context/ShopContex';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';

const Products = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    // Verificar si productId es válido y si existe el producto en all_product
    const product = all_product.find((e) => e.id === Number(productId));
    // Asegurarse de que product tenga un valor antes de renderizar ProductDisplay
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
