import React, { useContext } from 'react'
import styled from 'styled-components'
import { FilterContext } from './FilterContext'

type Props = {}

const StyledFilter = styled.div`
  width: 100%;
`

const StyledSelect = styled.select`
  float: right;
`

export const toggleFilter = () => {}

export const Filter = (props: Props) => {
  const filters = useContext(FilterContext)
  return (
    <StyledFilter>
      <StyledSelect>
        {filters.map((filter, idx) => (
          <option key={idx}>{filter.name}</option>
        ))}
      </StyledSelect>
    </StyledFilter>
  )
}
