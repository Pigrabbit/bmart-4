import React from 'react'
import styled from 'styled-components'
import { CATEGORY_LIST } from '../../utils/constants'

const StyledCategoryList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #fff;
  margin: 5px 0px;
  padding: 10px 0px;
`

const StyledCategory = styled.a``

const StyledCategoryIcon = styled.img`
  max-width: 100%;
  margin: 5px 0px;
`

export const CategoryList = () => {
  const categoryList = CATEGORY_LIST
  return (
    <StyledCategoryList className="category-list">
      {categoryList.map((category, idx) => (
        <StyledCategory key={idx} href={`/category/${category}`} className="category-list-item">
          <StyledCategoryIcon
            src={`${process.env.PUBLIC_URL}/images/icons/${category}.png`}
            alt={`${category}-icon`}
            className="category-icon"
            id={`${category}-icon`}
          />
        </StyledCategory>
      ))}
    </StyledCategoryList>
  )
}
