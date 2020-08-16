import React from 'react'
import { ProductCard } from './ProductCard'
import { mount } from 'enzyme'
import { ProductCardType } from '../../types/productCard'
import { MemoryRouter, Link } from 'react-router-dom'

const product: ProductCardType = {
  id: '5275',
  name: '테스트 상품명',
  price: 1000000,
  thumbnailSrc:
    'thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
}

describe('<ProductCard />', () => {
  const wrapper = mount(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  )

  const productCardComp = wrapper.find(ProductCard)

  it('match: snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('match: props', () => {
    expect(productCardComp.props().product).toBe(product)
  })

  it('render: 썸네일, 링크, 상품이름, 가격', () => {
    expect(wrapper.find(Link).props().to).toBe(`/product/${product.id}`)

    const productNameElm = wrapper.find('div.product-name')
    expect(productNameElm.contains('테스트 상품명')).toBe(true)

    const priceElm = wrapper.find('div.price')
    expect(priceElm.text()).toBe('1,000,000원')

    const thumbnailElm = wrapper.find('img.thumbnail')
    expect(thumbnailElm.prop('src')).toBe(`http://${product.thumbnailSrc}`)
  })
})
