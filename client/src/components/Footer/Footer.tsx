import React from 'react'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'
import { CS_EMAIL, CS_PHONE } from '../../utils/constants'

type Props = {}

const StyledContainer = styled.footer`
    height: 160px;
    padding: 16px;
    display: flex;
    flex-direction: column;
`

const StyledButton = styled.button`
    margin: ${STYLES.margin} 0;
    padding: 16px 0;
    border: 1px solid gray;
    border-radius: 5px;
    width: 100%;
    align-self: center;
`

const StyledRow = styled.p`
    margin: 0 0 5px 0;
`

export const Footer = (props: Props) => {
    const returnButtonClickHandler = () => {
        alert("반품·교환 하시겠어요?")
    }

    return (
        <StyledContainer className="footer" data-testid="footer">
            <StyledButton className="footer-return-button" onClick={returnButtonClickHandler}>
                반품·교환하기
            </StyledButton>
            <StyledRow className="footer-phone">
                <span className="footer-phone-label">고객센터 | </span>
                <strong className="footer-phone-value">{CS_PHONE}</strong>
            </StyledRow>
            <StyledRow className="footer-email">
                <span className="footer-email-label">제휴문의 | </span>
                <strong className="footer-email-value">{CS_EMAIL}</strong>
            </StyledRow>
        </StyledContainer>
    )
}
