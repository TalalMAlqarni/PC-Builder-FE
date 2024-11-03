import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button'

function Product({ product }) {
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

  return (
      <div className="product-card">
      <h2>{productName}</h2>
      <img src={productImage} alt={productName} className="product-image" />
      <h3>Price: ${productPrice}</h3>
                      <Link to={`${productId}`}>
                <Button variant="contained" sx={{ backgroundColor: 'gray', color: 'white' }} >More Details</Button>
            </Link>
    </div>
  );
}

export default Product;
