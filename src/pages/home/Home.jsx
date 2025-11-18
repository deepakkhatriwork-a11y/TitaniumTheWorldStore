import React from 'react'
import Layout from '../../components/layout/Layout'
import Slider from '../../components/slider/Slider'
import Filter from '../../components/filter/Filter'
import Category from '../../components/category/Category'
import ProductCard from '../../components/productCard/ProductCard'

function Home() {
  return (
    <Layout>
      <Slider />
      <Filter />
      <Category />
      <ProductCard />
    </Layout>
  )
}

export default Home