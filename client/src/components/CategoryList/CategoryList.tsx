import React from 'react'
import styled from 'styled-components'

const StyledCategoryList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #fff;
  margin: 5px 0px;
  padding: 10px 0px;
`

const StyledCategory = styled.img`
  max-width: 100%;
  margin: 5px 0px;
`

export const CategoryList = () => {
  return (
    <StyledCategoryList className="category-list">
      <StyledCategory
        className="category-list-salad"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-salad.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-egg"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-egg.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-mealkit"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-mealkit.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-milk"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-milk.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-bread"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-bread.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-yasik"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-yasik.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-choco"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-choco.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-ice"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-ice.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-hair"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-hair.png`}
        alt=""
      />
      <StyledCategory
        className="category-list-more"
        src={`${process.env.PUBLIC_URL}/images/icons/lossy-more.png`}
        alt=""
      />
    </StyledCategoryList>
  )
}
