import React, { useState, useEffect } from "react";
import Product from "./Product";
import { Grid, Typography, Pagination, Stack } from "@mui/material";
import axios from "axios";

function Products({ allProductList, userInput, value, cartList, setCartList }) {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams({ limit, offset, MinPrice: value[0], MaxPrice: value[1] });
    if (userInput) {
      urlParams.set("search", userInput);
    }

    const urlForProductList = `http://localhost:5125/api/v1/subcategories/products?${urlParams.toString()}`;

    axios.get(urlForProductList)
      .then(res => setProductList(res.data))
      .catch(err => console.log(err));
  }, [limit, offset, userInput, value]);

  useEffect(() => {
    setPage(1);
    setOffset(0);
  }, [userInput, value]);

  const handleChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * limit);
  };

  return (
    <>
      <Grid container spacing={4}>
        {productList.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.productId}>
            <Product product={product} cartList={cartList} setCartList={setCartList} />
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={Math.ceil(allProductList.length / limit)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}

export default Products;
