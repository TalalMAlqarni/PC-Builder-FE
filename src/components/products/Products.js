import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./Products.css";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

function Products(prop) {
  const { allProductList, userInput, value } = prop;
  const totalProducts = allProductList.length;
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

    axios
      .get(urlForProductList)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limit, offset, userInput, value]);

  const handleChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * limit);
  };

  return (
    <>
      <div className="products-list">
        {productList.map((product) => (
          <Product key={product.productId} product={product} />
        ))}
      </div>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={Math.ceil(totalProducts / limit)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );

}

export default Products;


