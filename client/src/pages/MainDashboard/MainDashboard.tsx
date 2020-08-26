import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'

import { Carousel } from '../../components/Carousel'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'
import { CategoryList } from '../../components/CategoryList'
import { HorizontalList } from '../../components/HorizontalList'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { CategoryListSection } from './CategoryListSection'

import { bigBannerList, smallBannerList } from '../../utils/mockData'
import {
  GET_PRODUCTLIST_BY_CATEGORY,
  ProductByCategoryData,
  ProductByCategoryVars,
} from '../../apis/graphqlQuery'

type Props = {} & RouteComponentProps

const StyledContainer = styled.main``

export const MainDashboard = (props: Props) => {
  const { loading, data } = useQuery<ProductByCategoryData, ProductByCategoryVars>(
    GET_PRODUCTLIST_BY_CATEGORY,
    {
      variables: { category: '과일', offset: 10, limit: 10, sorter: '' },
    }
  )

  return loading || !data ? (
    <LoadingIndicator />
  ) : (
    <Dashboard title="" searchBar={true}>
      <StyledContainer className="dashboard">
        <Carousel bannerList={bigBannerList} />
        <CategoryList />
        <HorizontalList
          title="성현님을 위해 준비한 상품"
          productList={data.productListByCategory}
          double={true}
        ></HorizontalList>
        <Carousel bannerList={smallBannerList} />
        <HorizontalList
          title="동혁님을 위해 준비한 상품"
          productList={data.productListByCategory}
        />
        <VerticalList title="성현님을 위해 준비한 상품" productList={data.productListByCategory} />
        <CategoryListSection />
      </StyledContainer>
    </Dashboard>
  )
}
