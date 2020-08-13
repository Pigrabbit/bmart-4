import React from 'react'
import styled from 'styled-components'

import { Carousel } from '../../components/Carousel'
import { VerticalList } from '../../components/VerticalList'
import { HorizontalList } from '../../components/HorizontalList'
import { productList, bigBannerList, smallBannerList } from '../../utils/mockData'
import { Footer } from '../../components/Footer'
import { gql, useQuery } from '@apollo/client'

type Props = {}

const StyledContainer = styled.main`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`

const PRODUCTLIST_BY_CATEGORY = gql`
  query {
    productListByCategory(category: "과일", offset: 10, limit: 5) {
      id
      price
      name
      thumbnail_src
    }
  }
`

export const MainDashboard = (props: Props) => {
  
  const { loading, error, data } = useQuery(PRODUCTLIST_BY_CATEGORY)
  if (loading) return <p>Loading...</p>
  const { productListByCategory } = data
  console.log(productListByCategory)

  return (
    <StyledContainer className="dashboard">
      <Carousel bannerList={bigBannerList} />
      <HorizontalList
        title="성현님을 위해 준비한 상품"
        productList={productList}
        double={true}
      ></HorizontalList>
      <Carousel bannerList={smallBannerList} />
      <HorizontalList title="동혁님을 위해 준비한 상품" productList={productList} />
      <VerticalList title="성현님을 위해 준비한 상품" productList={productList} />
      <Footer />
    </StyledContainer>
  )
}
