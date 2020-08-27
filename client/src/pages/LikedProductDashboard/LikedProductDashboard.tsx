import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import {
  LikedProductListData,
  GET_LIKED_PRODUCTLIST,
  LikedProductListVars,
} from '../../apis/graphqlQuery'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'

type Props = {}

export const LikedProductDashboard = (props: Props) => {
  const { loading, data, refetch } = useQuery<LikedProductListData, LikedProductListVars>(
    GET_LIKED_PRODUCTLIST,
    { variables: { offset: 0, limit: 100 } }
  )

  useEffect(() => {
    refetch()
  }, [])

  return loading || !data ? (
    <p>loading...</p>
  ) : (
    <Dashboard title="찜한상품">
      <VerticalList title="" productList={data.likedProductList} />
    </Dashboard>
  )
}
