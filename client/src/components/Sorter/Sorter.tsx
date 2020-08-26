import React, { useContext } from 'react'
import styled from 'styled-components'
import { HEADER_HEIGHT } from '../../utils/styleConstants'
import { SortType } from '../../types/sort'

type Props = {
  selectedSorter: SortType
  sorterList: { id: SortType; name: string }[]
  sorterChangeHandler: (sorter: SortType) => void
}

const StyledSorter = styled.div`
  display: flex;
  position: sticky;
  top: calc((${HEADER_HEIGHT} / 2) - 1px);
  z-index: 1000;
  background: white;
  justify-content: flex-end;
  padding: 8px 17px;
  margin-top: 8px;
  border-bottom: 1px solid #ddd;
`
const StyledSelectWrap = styled.label`
  position: relative;
  padding-right: 24px;
`

const StyledSelect = styled.select`
  appearance: none;
  background: white;
  border: none;
  height: 26px;
`
const StyledIcon = styled.i`
  color: black;
  font-size: 14px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`

export const Sorter = (props: Props) => {
  const { sorterList, selectedSorter } = props

  const sorterChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.sorterChangeHandler(e.target.value as SortType)
  }

  return (
    <StyledSorter>
      <StyledSelectWrap>
        <StyledSelect onChange={sorterChangeHandler} value={selectedSorter}>
          {sorterList.map((sorter, idx) => (
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
