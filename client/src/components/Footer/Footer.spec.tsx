import React from 'react';
import {cleanup, fireEvent, render, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { Footer } from './Footer'
import { CS_EMAIL, CS_PHONE } from '../../utils/constants'


describe('<Footer />', () => {
    afterEach(cleanup)

    it ('DOM에 포함된다', () => {
        const { getByTestId } = render( <Footer /> )
        expect(getByTestId('footer')).toBeInTheDocument()
    })

    it ('고객센터 연락처와 이메일 정보가 노출된다', () => {
        const { queryByText } = render( <Footer /> )
        expect(queryByText(CS_PHONE)).toBeInTheDocument()
        expect(queryByText(CS_EMAIL)).toBeInTheDocument()
    })
})