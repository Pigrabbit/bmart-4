import React from 'react'
import styled from 'styled-components'
import { AutoSuggestType } from './SearchDashboard'
import { COLORS, STYLES } from '../../utils/styleConstants'

type Props = {
  query: string
  autoSuggestList: AutoSuggestType[]
  clickSuggestHandler: (query: string) => void
}

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .search-suggestion {
    height: 50px;
    box-sizing: border-box;
    padding: 10px ${STYLES.padding};
    width: 100%;
    background-color: white;
    font-size: 16px;
    line-height: 30px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
`

export const AutoSuggestQueryList = (props: Props) => {
  const { query, autoSuggestList } = props

  return (
    <StyledContainer>
      {autoSuggestList.map((keyword: AutoSuggestType, idx: number) => {
        const regex = new RegExp(query, 'g')
        const name = keyword.name.replace(regex, `<b>${query}</b>`)

        return (
          <div
            key={idx}
            className="search-suggestion"
            onClick={() => props.clickSuggestHandler(keyword.name)}
            dangerouslySetInnerHTML={{ __html: name }}
          ></div>
        )
      })}
    </StyledContainer>
  )
}
