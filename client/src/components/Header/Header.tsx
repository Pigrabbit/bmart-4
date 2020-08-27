import React from 'react'
import styled from 'styled-components'
import { STYLES, COLORS, HEADER_HEIGHT } from '../../utils/styleConstants'
import { NAVIGATIONS } from '../../utils/constants'
import { StyledLink } from '../../styles/StyledLink'
import { useHistory } from 'react-router-dom'

type Props = {
  title: string
  searchBar?: boolean
}

const StyledContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 ${STYLES.padding};
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
  border-bottom: 1px solid ${STYLES.borderColor};
`
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: calc(${HEADER_HEIGHT} / 2);
`

const StyledSearchBar = styled.div`
  height: calc(${HEADER_HEIGHT} / 2);

  .search-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    background-color: ${COLORS.lightBlue};
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 0 12px;

    .icon {
      font-size: 15px;
      line-height: 16px;
      margin-right: 8px;
      font-weight: 700;
    }

    p {
      font-size: 14px;
      line-height: 16px;
    }
  }
`

const StyledImage = styled.img`
  height: 26px;
`

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: calc(100% - 80px);
`

const StyledTitle = styled.h1`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`

const StyledButton = styled.button`
  font-size: 22px;
  line-height: 22px;
  color: black;
`

export const Header = (props: Props) => {
  const { title, searchBar = false } = props
  const history = useHistory()
  const searchUri = NAVIGATIONS.find((nav) => nav.name === 'search')

  return (
    <StyledContainer className="header" data-testid="header">
      <StyledHeader>
        <StyledButton className="header-back-button" onClick={() => history.goBack()}>
          {title !== '' && <i className="icon">arrow_left</i>}
        </StyledButton>
        <StyledLogo
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
        >
          {title === '' ? (
            <StyledImage
              className="header-title-logo"
              src={`${process.env.PUBLIC_URL}/images/bmart-title.png`}
              alt=""
            />
          ) : (
            <StyledTitle className="header-title-text">{`${title}`}</StyledTitle>
          )}
        </StyledLogo>
      </StyledHeader>
      {searchBar && searchUri && (
        <StyledLink to={`${searchUri.path}`}>
          <StyledSearchBar>
            <div className="search-bar">
              <i className="icon">search</i>
              <p className="placeholder">B마트 상품을 검색해보세요!</p>
            </div>
          </StyledSearchBar>
        </StyledLink>
      )}
    </StyledContainer>
  )
}
