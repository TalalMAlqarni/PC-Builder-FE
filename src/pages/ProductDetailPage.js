import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import { Box, Typography, Paper, Grid, Container } from "@mui/material";

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
        <Container sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <Typography variant="h6" align="center">Loading...</Typography>
            ) : error ? (
                <Typography variant="h6" color="error" align="center">{error.message}</Typography>
            ) : (
                <Paper sx={{ p: 3 }}>
                    <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={product.productImage}
                                    alt={product.productName}
                                    style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom>{product.productName}</Typography>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Price: ${product.productPrice}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>Color:</strong> {product.productColor} <br />
                                <strong>Weight:</strong> {product.weight} kg <br />
                                <strong>Added Date:</strong> {new Date(product.addedDate).toLocaleDateString()} <br />
                                <strong>Brand:</strong> {product.subCategoryName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>Rating</Typography>
                            <Rating
                                name="read-only"
                                value={product.averageRating !== null ? product.averageRating : 0}
                                readOnly
                            />
                            <Typography variant="h6" sx={{ mt: 2 }}>Description</Typography>
                            <Typography variant="body1">{product.description}</Typography>
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIcon />}
                                    onClick={() => window.history.back()}
                                    sx={{ backgroundColor: "#1A204f", color: "white", "&:hover": { backgroundColor: "darkgray" } }}
                                >
                                    Go Back
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Container>
    );
}

export default ProductDetail;
