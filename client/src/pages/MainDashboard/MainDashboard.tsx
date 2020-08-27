import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, NetworkStatus } from '@apollo/client'

import { Carousel } from '../../components/Carousel'
import { Dashboard } from '../../components/Dashboard'
import { CategoryList } from '../../components/CategoryList'
import { HorizontalList } from '../../components/HorizontalList'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { CategoryListSection } from './CategoryListSection'

import { bigBannerList, smallBannerList } from '../../utils/mockData'
import {
  GET_PRODUCTLIST_BY_CATEGORY,
  ProductByCategoryData,
  ProductByCategoryVars,
  ProductByDiscoutRateData,
  ProductByDiscountRateVars,
  GET_PRODUCT_BY_DISCOUNT_RATE,
} from '../../apis/product'

type Props = {}

const StyledContainer = styled.main``

export const MainDashboard = (props: Props) => {
  const { loading, data, refetch, networkStatus } = useQuery<
    ProductByCategoryData,
    ProductByCategoryVars
  >(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: { category: '과일', offset: 10, limit: 10, sorter: '' },
    notifyOnNetworkStatusChange: true,
  })

  const promotion = useQuery<ProductByDiscoutRateData, ProductByDiscountRateVars>(
    GET_PRODUCT_BY_DISCOUNT_RATE,
    {
      variables: { offset: 0, limit: 10 },
      notifyOnNetworkStatusChange: true,
    }
  )

  useEffect(() => {
    refetch()
    promotion.refetch()
  }, [])

  return (
    <Dashboard title="" searchBar={true}>
      <StyledContainer className="dashboard">
        <Carousel bannerList={bigBannerList} />
        <CategoryList />
        <HorizontalList
          loading={
            (loading || networkStatus === NetworkStatus.refetch) && !data?.productListByCategory
          }
          title={`회원님을 위해 준비한 상품`}
          productList={data?.productListByCategory || []}
          double={true}
        />
        <Carousel bannerList={smallBannerList} />
        <HorizontalList
          loading={
            (promotion.loading || promotion.networkStatus === NetworkStatus.refetch) &&
            !promotion.data?.productListByDiscountRate
          }
          title="번쩍 ⚡ 할인 상품"
          productList={promotion.data?.productListByDiscountRate || []}
        />
        <CategoryListSection />
      </StyledContainer>
    </Dashboard>
  )
}
