import React from 'react'
import styled from 'styled-components'

import { Carousel } from '../../components/Carousel'
import { VerticalList } from '../../components/VerticalList'
import { HorizontalList } from '../../components/HorizontalList'
import { bigBannerList, smallBannerList } from '../../utils/mockData'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { Navbar } from '../../components/Navbar'

type Props = {}

const StyledContainer = styled.main`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`

export const MainDashboard = (props: Props) => {
  
  const { loading, error, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {variables: {category: '과일', offset: 10, limit: 10}})
  if (loading) return <p>Loading...</p>
  const { productListByCategory } = data


  return (
    <StyledContainer className="dashboard">
      <Header />
      <Navbar />
      <Carousel bannerList={bigBannerList} />
      <HorizontalList
        title="성현님을 위해 준비한 상품"
        productList={productListByCategory}
        double={true}
      ></HorizontalList>
      <Carousel bannerList={smallBannerList} />
      <HorizontalList title="동혁님을 위해 준비한 상품" productList={productListByCategory} />
      <VerticalList title="성현님을 위해 준비한 상품" productList={productListByCategory} />
      <Footer />
    </StyledContainer>
  )
}
