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
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'

type Props = {} & RouteComponentProps

const StyledContainer = styled.main``

export const MainDashboard = (props: Props) => {

  useEffect(() => {
    if (!document.cookie.includes('token')) {
      return
    }
    const tokenLoc = document.cookie.indexOf('token')
    let endLoc = Math.min(document.cookie.length, document.cookie.indexOf(';', tokenLoc))
    if (endLoc === -1) {
      endLoc = document.cookie.length
    }
    const token = document.cookie.substring(tokenLoc, endLoc + 1)
    if (!token) return
    localStorage.setItem('token', token.split('=')[1])
    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }, [])

  const { loading, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: { category: '과일', offset: 10, limit: 10, sorter: 'sellCountDesc' },
  })

  if (loading) return <LoadingIndicator />
  const { productListByCategory } = data

  return (
    <Dashboard title="">
      <StyledContainer className="dashboard">
        <Carousel bannerList={bigBannerList} />
        <CategoryList />
        <HorizontalList
          title="성현님을 위해 준비한 상품"
          productList={productListByCategory}
          double={true}
        ></HorizontalList>
        <Carousel bannerList={smallBannerList} />
        <HorizontalList title="동혁님을 위해 준비한 상품" productList={productListByCategory} />
        <VerticalList title="성현님을 위해 준비한 상품" productList={productListByCategory} />
        <CategoryListSection />
      </StyledContainer>
    </Dashboard>
  )
}
