import React, { useContext } from 'react'
import styled from 'styled-components'
import { SorterContext } from './SorterContext'

type Props = {
  sorterChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const StyledSorter = styled.div`
  width: 100%;
  display: block;
  position: relative;
`

const StyledSelect = styled.select`
  margin: 10px;
`

export const Sorter = (props: Props) => {
  const sorters = useContext(SorterContext)
  return (
    <StyledSorter>
      <StyledSelect onChange={props.sorterChangeHandler}>
        {sorters.map((sorter, idx) => (
          <option value={sorter.id} key={idx}>
            {sorter.name}
          </option>
        ))}
      </StyledSelect>
    </StyledSorter>
  )
}
