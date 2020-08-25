import React from 'react'
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

const StyledContainer = styled.div``

export const LikedProductDashboard = (props: Props) => {
  const { loading, data } = useQuery<LikedProductListData, LikedProductListVars>(
    GET_LIKED_PRODUCTLIST,
    { variables: { offset: 1, limit: 10 } }
  )

  return loading || !data ? (
    <p>loading...</p>
  ) : (
    <Dashboard title="찜한상품">
      <VerticalList title="" productList={data.likedProductList} />
    </Dashboard>
  )
}
