import React from 'react'
import styled from 'styled-components'

type Props = {}

const StyledFilter = styled.div`
  width: 100%;
`

const StyledSelect = styled.select`
  float: right;
`

export const Filter = (props: Props) => {
  return (
    <StyledFilter>
      <StyledSelect>
        <option>가격 높은 순</option>
        <option>가격 낮은 순</option>
        <option>판매량 높은 순</option>
      </StyledSelect>
    </StyledFilter>
  )
}
