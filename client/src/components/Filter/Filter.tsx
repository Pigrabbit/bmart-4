import React, { useContext } from 'react'
import styled from 'styled-components'
import { FilterContext } from './FilterContext'

type Props = {
  fn: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const StyledFilter = styled.div`
  width: 100%;
`

const StyledSelect = styled.select`
  float: right;
`

export const Filter = (props: Props) => {
  const filters = useContext(FilterContext)
  return (
    <StyledFilter>
      <StyledSelect onChange={props.fn}>
        {filters.map((filter, idx) => (
          <option value={filter.id} key={idx}>
            {filter.name}
          </option>
        ))}
      </StyledSelect>
    </StyledFilter>
  )
}
