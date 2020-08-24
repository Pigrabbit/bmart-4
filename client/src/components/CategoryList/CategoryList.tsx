import React from 'react'
import styled from 'styled-components'
import { CATEGORIES } from '../../utils/constants'
import { StyledLink } from '../../styles/StyledLink'
import { STYLES } from '../../utils/styleConstants'
import { StyledWrapper } from '../../styles/StyledWrapper'

const StyledCategoryList = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  background-color: #fff;
  padding: 0 ${STYLES.padding};
  padding-top: 10px;
`
const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 56px;
  margin-right: 12px;
`

const StyledThumbnail = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 56px;
    height: 56px;

    border-radius: 50%;
  }
`
const StyledCategoryText = styled.div`
  color: black;
  font-size: 12px;
  word-break: keep-all;
  word-wrap: break-word;
  line-height: 30px;
  text-align: center;
`
const StyledSpacer = styled.div`
  width: 5px;
  height: 1px;
  flex: 0 0 auto;
`

export const CategoryList = () => {
  const categoryList = CATEGORIES
  return (
    <StyledWrapper>
      <StyledCategoryList className="category-list">
        {categoryList.map((category, idx) => (
          <StyledLink key={idx} to={`/category/${category.id}`}>
            <StyledCategory className="category-list-item">
              <StyledThumbnail>
                <img src={category.thumbnail} alt="" />
              </StyledThumbnail>
              <StyledCategoryText>{`${String(category.displayName)}`}</StyledCategoryText>
            </StyledCategory>
          </StyledLink>
        ))}
        <StyledSpacer />
      </StyledCategoryList>
    </StyledWrapper>
  )
}
