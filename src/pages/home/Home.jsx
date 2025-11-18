import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import Category from '../../components/category/Category'
import ProductCard from '../../components/productCard/ProductCard'

function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <Category />
      <ProductCard />
    </Layout>
  )
}

export default Home