import React from 'react'
import DashboardProducts from '../components/dashboard/DashboardProducts'
import DashboardProductsCreate from '../components/dashboard/DashboardProductsCreate'
import DashboardProductsDetails from '../components/dashboard/DashboardProductsDetails'
import DashboardProductsUpdate from '../components/dashboard/DashboardProductsUpdate';

export default function DashboardProductsPage(prop) {
    const { allProductList, getProducts } = prop;
    const [isAdding, setIsAdding] = React.useState(false);
    const [productIdForMoreDetails, setProductIdForMoreDetails] = React.useState(null);
    const [productIdForMoreUpdate, setProductIdForUpdate] = React.useState(null);
    return (
        <div>
            {isAdding && <DashboardProductsCreate setIsAdding={setIsAdding} getProducts={getProducts} />}
            {productIdForMoreDetails && <DashboardProductsDetails productId={productIdForMoreDetails} setProductIdForMoreDetails={setProductIdForMoreDetails} />}
            {productIdForMoreUpdate && <DashboardProductsUpdate productId={productIdForMoreUpdate} setProductIdForMoreUpdate={setProductIdForUpdate} getProducts={getProducts} />}
            {(!isAdding && !productIdForMoreDetails && !productIdForMoreUpdate) && <DashboardProducts allProductList={allProductList} setIsAdding={setIsAdding} getProducts={getProducts} setProductIdForMoreDetails={setProductIdForMoreDetails} setProductIdForUpdate={setProductIdForUpdate} />}
        </div>
    )
}
