import React from 'react'
import styled from 'styled-components'
import { STYLES, HEADER_HEIGHT } from '../../utils/styleConstants'

type Props = {
  title: string
}

const StyledContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px ${STYLES.padding};
  position: sticky;
  top: 0;
  background: white;
  height: ${HEADER_HEIGHT};
  z-index: 10;
  border-bottom: 1px solid ${STYLES.borderColor};
`

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
`

const StyledTitle = styled.h1`
  margin: auto auto auto 0;
`

const StyledOptions = styled.div`
  display: flex;
`

const StyledButton = styled.button`
  padding: 10px;
  margin: auto 0 auto 10px;
`

const StyledBackButton = styled.button`
  margin: auto;
  margin-right: 10px;
  font-size: 25px;
  text-align: center;
`

export const backButtonClickHandler = () => {
  window.history.back()
}

export const Header = (props: Props) => {
  return (
    <StyledContainer className="header" data-testid="header">
      {props.title === '' ? (
        <StyledLogo className="logo">
          <StyledImage
            className="header-title-logo"
            src={`${process.env.PUBLIC_URL}/images/bmart-logo.png`}
            alt=""
          />
          <StyledTitle className="header-title-text">마트</StyledTitle>
        </StyledLogo>
      ) : (
        <StyledLogo className="back">
          <h1>
            <StyledBackButton className="header-back-button" onClick={backButtonClickHandler}>
              ←
            </StyledBackButton>
          </h1>
          <StyledTitle className="header-title-text">{`${props.title}`}</StyledTitle>
        </StyledLogo>
      )}
      <StyledOptions className="header-menu-list">
        <StyledButton className="header-menu">검색</StyledButton>
        <StyledButton className="header-menu">옵션</StyledButton>
      </StyledOptions>
    </StyledContainer>
  )
}
