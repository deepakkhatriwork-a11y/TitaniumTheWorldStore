import React, { useContext } from 'react';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';

function AllProductsWithFilter() {
    const context = useContext(myContext);
    const { products } = context;

    return (
        <Layout>
            <div className="min-h-screen">
                <Filter />
                <ProductCard />
            </div>
        </Layout>
    );
}

export default AllProductsWithFilter;