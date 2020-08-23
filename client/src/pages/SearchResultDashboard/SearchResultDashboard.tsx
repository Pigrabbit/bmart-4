import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProductCardType } from '../../types/productCard'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'

type Props = {} & RouteComponentProps

type State = {
  searchResultList: ProductCardType[] 
}

export const SearchResultDashboard = (props: Props) => {
  const { location } = props
  if (!location.state) return null
  const state = location.state as State

  const { searchResultList } = state
  
  return (
    <Dashboard title="" header={false}>
        <VerticalList title="검색 결과" productList={searchResultList} />
    </Dashboard>
  )
}
