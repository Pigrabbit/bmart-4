import React, { useContext } from 'react'
import styled from 'styled-components'
import { SorterContext } from './SorterContext'
import { HEADER_HEIGHT } from '../../utils/styleConstants'

type Props = {
  sorterChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const StyledSorter = styled.div`
  display: flex;
  position: sticky;
  top: calc((${HEADER_HEIGHT} / 2) - 1px);
  z-index: 100;
  background: white;
  justify-content: flex-end;
  padding: 8px 17px;
  margin-top: 8px;
  border-bottom: 1px solid #ddd;
`
const StyledSelectWrap = styled.div`
  position: relative;
`

const StyledSelect = styled.select`
  appearance: none;
  border: none;
  height: 26px;
  padding-right: 20px;
`
const StyledIcon = styled.i`
  color: black;
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`

export const Sorter = (props: Props) => {
  const sorters = useContext(SorterContext)
  return (
    <StyledSorter>
      <StyledSelectWrap>
        <StyledSelect onChange={props.sorterChangeHandler}>
          {sorters.map((sorter, idx) => (
            <option value={sorter.id} key={idx}>
              {sorter.name}
            </option>
          ))}
        </StyledSelect>
        <StyledIcon className="icon">chevron_down</StyledIcon>
      </StyledSelectWrap>
    </StyledSorter>
  )
}
