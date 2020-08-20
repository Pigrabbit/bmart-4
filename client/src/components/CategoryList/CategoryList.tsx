import React from 'react'
import styled from 'styled-components'
import { CATEGORIES } from '../../utils/constants'
import { replaceSlashesWithHyphens } from '../../utils/parser'

const StyledCategoryList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #fff;
  margin: 5px 0px;
  padding: 10px 0px;
`
const StyledCategory = styled.a``

export const CategoryList = () => {
  const categoryList = CATEGORIES
  return (
    <StyledCategoryList className="category-list">
      {categoryList.map((category, idx) => (
        <StyledCategory
          key={idx}
          href={`/category/${replaceSlashesWithHyphens(String(category.id))}`}
          className="category-list-item"
        >
          <div>{`${category.name}`}</div>
        </StyledCategory>
      ))}
    </StyledCategoryList>
  )
}