import React from 'react'
import styled from 'styled-components'
import { AutoSuggestType } from './SearchDashboard'

type Props = {
  autoSuggestList: AutoSuggestType[]
  clickSuggestHandler: (query: string) => void
}

const StyledContainer = styled.div``

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
