import React from 'react'
import { cleanup } from '@testing-library/react'
import { Navbar } from './Navbar'
import { NAVIGATIONS } from '../../utils/constants'
import { shallow } from 'enzyme'
import { expect } from 'chai'

describe('<Navbar />', () => {
  afterEach(cleanup)

  it('navbar라는 클래스 이름으로 DOM에 포함된다', () => {
    const wrapper = shallow(<Navbar />)
    expect(wrapper.is('.navbar')).to.equal(true)
  })

  it('홈, 검색, 찜, 히스토리, 장바구니 순으로 아이콘이 노출된다', () => {
    const wrapper = shallow(<Navbar />)
    const iconList = wrapper.find('.navbar-item')
    expect(iconList).to.have.lengthOf(5)
    iconList.forEach((icon, idx) => {
      expect(icon.exists(`#navbar-item-icon-${NAVIGATIONS[idx].name}`)).to.equal(true)
    })
  })
})
