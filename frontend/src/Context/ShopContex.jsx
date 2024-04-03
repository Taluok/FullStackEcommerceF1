import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4001/allproducts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllProducts(data);
                
                if (localStorage.getItem('auth-token')) {
                    const cartResponse = await fetch('http://localhost:4001/getcart', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'auth-token': localStorage.getItem('auth-token'),
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!cartResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const cartData = await cartResponse.json();
                    setCartItems(cartData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };
    
        fetchProducts();
    }, []);
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4001/addtocart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error adding to cart:', error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4001/removefromcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error removing from cart:', error));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (allProducts && allProducts.length > 0) {
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    const itemInfo = allProducts.find((product) => product.id === Number(item));
                    if (itemInfo) {
                        totalAmount += itemInfo.new_price * cartItems[item];
                    }
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, error };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;




