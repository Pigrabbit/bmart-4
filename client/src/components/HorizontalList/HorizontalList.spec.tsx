import React from 'react'
import { HorizontalList } from './HorizontalList'
import { mount } from 'enzyme'
import { productList } from '../../utils/mockData'
import { MemoryRouter } from 'react-router-dom'

import { Props } from './HorizontalList'

const testProps: Props = {
  title: '테스트',
  double: false,
  productList,
}

describe('<HorizontalList />', () => {
  const wrapper = mount(
    <MemoryRouter>
      <HorizontalList {...testProps} />
    </MemoryRouter>
  )

  it('match: snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('render: double prop에 따라 올바른 상품 리스트를 노출하는가', () => {
    // double: false 일 때 리스트 1개, 상품갯수는 props로 전달한 갯수만큼
    expect(wrapper.find('.product-list').hostNodes().length).toStrictEqual(1)
    expect(wrapper.find('.product-card').hostNodes().length).toStrictEqual(
      testProps.productList.length
    )

    wrapper.setProps(
      {
        children: <HorizontalList {...{ ...testProps, double: true }} />,
      },
      () => {
        // double: true 일 때 리스트 2개, 상품갯수는 props로 전달한 갯수만큼 (위와 동일)
        expect(wrapper.find('.product-list').hostNodes().length).toStrictEqual(2)
        expect(wrapper.find('.product-card').hostNodes().length).toStrictEqual(
          testProps.productList.length
        )
      }
    )
  })
})
