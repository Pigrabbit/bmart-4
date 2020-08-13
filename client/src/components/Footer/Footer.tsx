import React from 'react'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'

type Props = {
    phone: string,
    email: string,
}

const StyledContainer = styled.footer`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledRow = styled.p`
    margin: 0 0 0 ${STYLES.margin};
`

export const Footer = (props: Props) => {
    const { phone, email } = props

    return (
        <StyledContainer className="footer">
            <StyledRow className="footer-phone">
                <span className="footer-phone-label">고객센터 | </span>
                <strong className="footer-phone-value">{phone}</strong>
            </StyledRow>
            <StyledRow className="footer-email">
                <span className="footer-email-label">제휴문의 | </span>
                <strong className="footer-email-value">{email}</strong>
            </StyledRow>
        </StyledContainer>
    )
}
