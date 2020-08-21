import React from 'react'
import styled from 'styled-components'
import { CATEGORIES } from '../../utils/constants'
import { replaceSlashesWithHyphens, replaceSlashesWithCommas } from '../../utils/parser'

const StyledCategoryList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #fff;
  margin: 5px 0px;
  padding: 10px 0px;
`
const StyledCategory = styled.a`
  text-decoration: none;
  display: flex;
  padding: 5px;
`

const StyledEmoji = styled.div`
  font-size: 25px;
  margin: auto 10px;
`
const StyledCategoryText = styled.div`
  font-weight: 700;
  color: black;
  font-size: 12px;
  margin: auto 0px;
  word-break: keep-all;
  word-wrap: break-word;
`
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
          <StyledEmoji>{`${category.emoji}`}</StyledEmoji>
          <StyledCategoryText>{`${replaceSlashesWithCommas(
            String(category.name)
          )}`}</StyledCategoryText>
        </StyledCategory>
      ))}
    </StyledCategoryList>
  )
}
