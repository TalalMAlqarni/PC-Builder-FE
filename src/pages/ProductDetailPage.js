import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const url = `http://localhost:5125/api/v1/subcategories/products/${id}`;
        axios
            .get(url)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error.message}</p>
            ) : (
                <>
                    <h2>{product.productName}</h2>
                    <img src={product.productImage} alt={product.productName} />
                    <h2>Price: ${product.productPrice}</h2>
                    <h3>Product Details</h3>
                    <p>Color: {product.productColor}, Weight: {product.weight} kg, Added Date: {new Date(product.addedDate).toLocaleDateString()}, Brand: {product.subCategoryName}</p>

                    <div>
                        <h3>Rating</h3>
                        <Rating
                            name="read-only"
                            value={product.averageRating !== null ? product.averageRating : 0}
                            readOnly
                        />
                    </div>
                    <h3>Description</h3>
                    <p>{product.description}</p>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => window.history.back()}
                        sx={{ backgroundColor: "gray", color: "white" }}
                    >
                        Go Back
                    </Button>
                </>
            )
            }
        </div >
    );
}

export default ProductDetail;
