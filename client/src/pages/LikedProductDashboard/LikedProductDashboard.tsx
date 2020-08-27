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
import { Header } from '../../components/Header'
import { CenteredImg } from '../../components/CenteredImg'
import { Navbar } from '../../components/Navbar'

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
    <div>
      <Header title="찜한상품" />
      {data.likedProductList.length === 0 ? (
        <CenteredImg />
      ) : (
        <VerticalList title="" productList={data.likedProductList} />
      )}
      <Navbar />
    </div>
  )
}
