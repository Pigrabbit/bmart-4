import React from 'react'
import { ProductCard } from './ProductCard'
import { mount } from 'enzyme'
import { ProductCardType } from '../../types/productCard'

const product: ProductCardType = {
  id: '5275',
  name: '테스트 상품명',
  price: 1000000,
  thumbnailSrc:
    'thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/08/09/15/2/267a0947-5985-43d7-8e65-5c0520d892e0.jpg',
}

describe('<ProductCard />', () => {
  it('matches snapshot', () => {
    const wrapper = mount(<ProductCard product={product} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders thumbnail, product name, price ', () => {
    const wrapper = mount(<ProductCard product={product} />)

    // check: props
    expect(wrapper.props().product).toBe(product)

    // check: product name
    const productNameElm = wrapper.find('div.product-name')
    expect(productNameElm.contains('테스트 상품명')).toBe(true)

    // check: price parsed to local string
    const priceElm = wrapper.find('div.price')
    expect(priceElm.text()).toBe('1,000,000원')

    // check: parsed thumbnail href
    const thumbnailElm = wrapper.find('img.thumbnail')
    expect(thumbnailElm.prop('src')).toBe(`http://${product.thumbnailSrc}`)
  })
})
