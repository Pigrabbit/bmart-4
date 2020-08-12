import React from 'react'
import styled from 'styled-components'

import { Carousel } from '../../components/Carousel'
import { HorizontalList } from '../../components/HorizontalList'
import { ProductCardType } from '../../types/productCard'

const productList: ProductCardType[] = [
  {
    name: '비요뜨 초코링 143g',
    price: 1390,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '홈런볼 초코 46g',
    price: 1290,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '서울우유 100ml',
    price: 3090,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '비요뜨 초코링 143g',
    price: 1390,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '홈런볼 초코 46g',
    price: 1290,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '비요뜨 초코링 143g',
    price: 1390,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '홈런볼 초코 46g',
    price: 1290,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '서울우유 100ml',
    price: 3090,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
  {
    name: '비요뜨 초코링 143g',
    price: 1390,
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
  },
]

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
      <Carousel width={window.innerWidth}></Carousel>
      <HorizontalList title="동혁님을 위해 준비한 상품" productList={productList}></HorizontalList>
      <HorizontalList
        title="성현님을 위해 준비한 상품"
        productList={productList}
        double={true}
      ></HorizontalList>
    </Container>
  )
}
