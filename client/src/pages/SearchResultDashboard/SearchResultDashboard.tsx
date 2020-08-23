import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProductCardType } from '../../types/productCard'

type Props = {} & RouteComponentProps

type State = {
  searchResultList: ProductCardType[] 
} | any

export const SearchResultDashboard = (props: Props) => {
  const { location } = props
  const state: State = location.state || null

  const { searchResultList } = state
  console.log(searchResultList)
  return (
    <div>
      search-result
    </div>
  )
}
