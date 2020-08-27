import React from 'react'
import { cleanup } from '@testing-library/react'
import { Footer } from './Footer'
import { CS_EMAIL, CS_PHONE } from '../../utils/constants'
import { shallow } from 'enzyme'
import { expect } from 'chai'

describe('<Footer />', () => {
  afterEach(cleanup)

  it('footer라는 클래스 이름으로 DOM에 포함된다', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.is('.footer')).to.equal(true)
  })

  it('고객센터 연락처와 이메일 정보가 노출된다', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.find('.footer-phone-value').text()).to.equal(CS_PHONE)
    expect(wrapper.find('.footer-email-value').text()).to.equal(CS_EMAIL)
  })
})
