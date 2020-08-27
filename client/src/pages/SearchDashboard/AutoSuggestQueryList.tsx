import React from 'react'
import styled from 'styled-components'
import { AutoSuggestType } from './SearchDashboard'
import { COLORS, STYLES } from '../../utils/styleConstants'

type Props = {
  autoSuggestList: AutoSuggestType[]
  clickSuggestHandler: (query: string) => void
}

const StyledContainer = styled.div`
  .search-suggestion {
    height: 50px;
    box-sizing: border-box;
    padding: 10px ${STYLES.padding};
    width: 100%;
    background-color: white;
    font-size: 16px;
    line-height: 30px;
    color: black;
  }
`

export const AutoSuggestQueryList = (props: Props) => {
  const { autoSuggestList } = props

  return (
    <StyledContainer>
      {autoSuggestList.map((keyword: AutoSuggestType, idx: number) => (
        <div
          key={idx}
          className="search-suggestion"
          onClick={() => props.clickSuggestHandler(keyword.name)}
        >
          {keyword.name.split(',')[0]}
        </div>
      ))}
    </StyledContainer>
  )
}
