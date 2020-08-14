import React from 'react'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Header } from './Header'

describe('<Header />', () => {
  afterEach(cleanup)

  it('헤더 로고 이미지가 노출된다', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.exists('.header-title-logo')).to.equal(true)
  })

  it('헤더 텍스트가 노출된다', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.exists('.header-title-text')).to.equal(true)
  })

  it('헤더 검색 옵션이 2개 노출된다', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('.header-menu')).to.have.lengthOf(2)
  })
})
