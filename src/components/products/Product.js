import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button'

function Product({ product, cartList, setCartList }) {
    const {
        productId,
        productName,
        description,
        productPrice,
        productColor,
        productImage,
        weight,
        averageRating,
        addedDate
    } = product;

    function addToCart() {
        if (product.sku <= 0) {
            alert("Sorry, this product is out of stock and cannot be added to the cart.");
            return;
        }
        const existProduct = cartList.find(item => item.productId === productId);
        if (existProduct) {
            if (existProduct.quantity + 1 > product.sku) {
                alert("Cannot add more of this product, as stock is limited.");
                return;
            }
            setCartList(
                cartList.map(item =>
                    item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCartList([...cartList, { ...product, quantity: 1 }]);
        }
    }




    return (
        <div className="product-card">
            <h2>{productName}</h2>
            <img src={productImage} alt={productName} className="product-image" />
            <h3>Price: ${productPrice}</h3>
            <Link to={`${productId}`}>
                <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} >More Details</Button>
            </Link>

            <div style={{ marginTop: '0.5rem' }}>
                <Button variant="contained" onClick={addToCart} sx={{ backgroundColor: 'DarkGreen', color: 'white' }} >Add to Cart</Button>
            </div>

        </div>
    );
}

export default Product;
