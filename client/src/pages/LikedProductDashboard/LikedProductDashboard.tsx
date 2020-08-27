import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { VerticalList } from '../../components/VerticalList'
import { Header } from '../../components/Header'
import { CenteredImg } from '../../components/CenteredImg'
import { Navbar } from '../../components/Navbar'
import { LikedProductListData, LikedProductListVars, GET_LIKED_PRODUCTLIST } from '../../apis/like'
import { STYLES } from '../../utils/styleConstants'

type Props = {}

const StyledContainer = styled.div`
  padding-bottom: 70px;
`
const StyledListWrap = styled.div`
  margin-top: ${STYLES.margin};
`

export const LikedProductDashboard = (props: Props) => {
  const { loading, data, refetch } = useQuery<LikedProductListData, LikedProductListVars>(
    GET_LIKED_PRODUCTLIST,
    { variables: { offset: 0, limit: 100 } }
  )

  useEffect(() => {
    refetch()
  }, [])

  return (
    <StyledContainer>
      <Header title="찜한상품" />
      {!loading && data && data.likedProductList.length === 0 && <CenteredImg />}
      <StyledListWrap>
        <VerticalList
          title=""
          loading={loading && !data?.likedProductList}
          productList={data?.likedProductList || []}
        />
      </StyledListWrap>
      <Navbar />
    </StyledContainer>
  )
}
