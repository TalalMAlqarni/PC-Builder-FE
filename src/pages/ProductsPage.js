import React from 'react'
import Products from '../components/products/Products'
import { useState } from 'react'
import Form from '../components/form/Form'
import RangeSlider from '../components/rangeForm/RangeForm'

function ProductsPage(prop) {
    const { allProductList } = prop;
    const [userInput, setUserInput] = useState('');
    const [value, setValue] = React.useState([0, 5000]);
    return (
        <>
            <label>Please enter product name: </label>
            <Form setUserInput={setUserInput} placeholder="Search..." />
            <RangeSlider setValue={setValue} />
            <Products allProductList={allProductList} userInput={userInput} value={value} />
        </>
    );
}

export default ProductsPage