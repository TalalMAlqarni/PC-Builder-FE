import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

export default function Opinion({ cartlist }) {
    const [products, setProducts] = useState([]); // State for products
    const [feedback, setFeedback] = useState(""); // To store the feedback response
    const [loading, setLoading] = useState(false); // To show loading state

    // Update products when cartlist prop changes
    useEffect(() => {
        if (cartlist && cartlist.length > 0) {
            const productNames = cartlist.map((product) => product.productName);
            setProducts(productNames); // Set products from cartlist
        }
    }, [cartlist]);

    const handleAnalyzeCart = () => {
        console.log(products);

        setLoading(true); // Show loading state while request is in progress
        axios
            .post("http://localhost:5125/api/v1/CartAnalysis", {
                products: products, // Send the list of products inside a DTO
            })
            .then((response) => {
                console.log(response.data);
                setFeedback(response.data.content[0].text); // Set the feedback to the state
                setLoading(false); // Hide the loading state
            })
            .catch((error) => {
                console.error(error);
                setFeedback("There was an error analyzing the cart.");
                setLoading(false); // Hide the loading state
            });
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                Cart Analysis Opinion
            </Typography>

            <Button
                variant="contained"
                color="warning"
                onClick={handleAnalyzeCart}
                disabled={loading} // Disable button while loading
            >
                {loading ? <CircularProgress size={24} /> : "Analyze Cart"}
            </Button>

            {feedback && (
                <Box sx={{ marginTop: 3, borderBottom: '5px solid #f49521' }}>
                    <Typography variant="h4" sx={{ color: 'white', backgroundColor: '#f49521' }} gutterBottom>
                        Analysis
                    </Typography>
                    <Typography
                        color="#1A204f"
                        variant="h5"
                        sx={{ whiteSpace: "pre-line", textAlign: "justify" }}
                    >
                        <strong>{feedback}</strong>
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
