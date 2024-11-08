import React from 'react'
import DashboardProducts from '../components/dashboard/DashboardProducts'
import DashboardProductsCreate from '../components/dashboard/DashboardProductsCreate'

export default function DashboardProductsPage(prop) {
    const { allProductList, getProducts } = prop;
    const [isAdding, setIsAdding] = React.useState(false);
    return (
        <div>
            {isAdding ? <DashboardProductsCreate setIsAdding={setIsAdding} getProducts={getProducts} /> : null}
            {!isAdding && <DashboardProducts allProductList={allProductList} setIsAdding={setIsAdding} getProducts={getProducts} />}
        </div>
    )
}
