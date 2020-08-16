import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { VerticalList } from './VerticalList'
import { productList } from '../../utils/mockData'

import { Props } from './VerticalList'

const testProps: Props = {
  title: '테스트',
  productList,
}

describe('<VerticalList />', () => {
  const wrapper = mount(
    <MemoryRouter>
      <VerticalList {...testProps} />
    </MemoryRouter>
  )

  it('match: snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('render: 제목이 올바르게 노출되는가', () => {
    expect(wrapper.find('.title').text()).toBe(testProps.title)
  })

  it('render: 상품 리스트가 올바르게 노출되는가', () => {
    expect(wrapper.find('.product-card').hostNodes().length).toStrictEqual(
      testProps.productList.length
    )
  })
})
