import React from 'react'
import styled from 'styled-components'

import { Carousel } from '../../components/Carousel'
import { VerticalList } from '../../components/VerticalList'
import { HorizontalList } from '../../components/HorizontalList'
import { productList, bigBannerList, smallBannerList } from '../../utils/mockData'

type Props = {}

const Container = styled.main`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`

export const MainDashboard = (props: Props) => {
  return (
    <Container className="dashboard">
      <Carousel bannerList={bigBannerList} />
      <HorizontalList
        title="성현님을 위해 준비한 상품"
        productList={productList}
        double={true}
      ></HorizontalList>
      <Carousel bannerList={smallBannerList} />
      <HorizontalList title="동혁님을 위해 준비한 상품" productList={productList} />
      <VerticalList title="성현님을 위해 준비한 상품" productList={productList} />
    </Container>
  )
}
