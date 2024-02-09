import React from 'react'
//import Hero from '../Components/Hero/Hero'
import Carousel from '../Components/Crousel/Crousel'
import Popular from '../Components/Popular/Popular'
import Video from '../Components/Video/Video'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'


export const Shop = () => {
  return (
    <div>
      <Carousel />
      <Popular />
      <Video />
      <NewCollections />
      <NewsLetter />
    </div>
  )
}

export default Shop