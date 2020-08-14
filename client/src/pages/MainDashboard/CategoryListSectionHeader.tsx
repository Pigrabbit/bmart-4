import React, { useState } from 'react'
import styled from 'styled-components'
import { CATEGORIES } from '../../utils/constants'
import { HEADER_HEIGHT, STYLES } from '../../utils/styleConstants'

type Props = { selectedCategory: string }

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  align-items: center;
  position: sticky;
  top: ${`calc(${HEADER_HEIGHT} - 1px)`};
  height: ${HEADER_HEIGHT};
  background: white;
  z-index: 10;
  border-bottom: 1px solid ${STYLES.borderColor};

  div {
    margin: 0 12px;
    padding: 6px 16px;
    text-align: center;
    font-size: 14px;
    flex: 0 0 auto;
    border-radius: 16px;

    &.selected {
      color: white;
      background-color: #444;
    }
  }
`
const StyledCategory = styled.div``

export const CategoryListSectionHeader = (props: Props) => {
  const { selectedCategory } = props
  return (
    <StyledHeader>
      {CATEGORIES.map((category, idx) => {
        return (
          <div key={idx} className={selectedCategory === category ? 'selected' : ''}>
            {category}
          </div>
        )
      })}
    </StyledHeader>
  )
}
