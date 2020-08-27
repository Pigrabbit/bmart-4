import React, { useRef, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { SEARCH_URI, SPECIAL_CHAR_REGEX, AUTO_SUGGEST_URI } from '../../utils/constants'
import { ProductCardType } from '../../types/productCard'
import { COLORS, STYLES } from '../../utils/styleConstants'
import { SearchBarHeader } from './SearchBarHeader'
import { AutoSuggestQueryList } from './AutoSuggestQueryList'

type Props = {}

const StyledContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 51px - ${STYLES.margin});
  background-color: white;
`

export type AutoSuggestType = {
  name: string
}

type State = {
  query: string
  hasQueried: boolean
  searchResultList: ProductCardType[]
  autoSuggestList: AutoSuggestType[]
}

type Action = {
  type: string
  payload: any
}

const searchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'input': {
      if (SPECIAL_CHAR_REGEX.test(action.payload.query)) return { ...state }
      if (action.payload.query.length === 0) return { ...state, query: '', autoSuggestList: [] }

      return {
        ...state,
        query: action.payload.query,
      }
    }
    case 'suggest': {
      return {
        ...state,
        autoSuggestList: action.payload.autoSuggestList,
      }
    }
  }
  return state
}

const initialState = {
  query: '',
  hasQueried: false,
  searchResultList: [],
  autoSuggestList: [],
}

export const SearchDashboard = (props: Props) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const history = useHistory()

  const fetchSearchResult = async (query: string) => {
    const result = await fetch(SEARCH_URI as RequestInfo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
    const data = await result.json()
    return data
  }

  const submitHandler = async () => {
    const query = state.query
    const data = await fetchSearchResult(query)
    moveToResultPage(data, query)
  }

  let interval: any = useRef(-1)

  const changeInputHandler = async (query: string) => {
    dispatch({ type: 'input', payload: { query } })

    if (interval.current !== 0) {
      clearTimeout(interval.current)
    }

    interval.current = setTimeout(async () => {
      if (query.trim().length === 0) return
      const result = await fetch(AUTO_SUGGEST_URI as RequestInfo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
      const data = await result.json()

      dispatch({ type: 'suggest', payload: { autoSuggestList: data } })
    }, 250)
  }

  const clickSuggestHandler = async (query: string) => {
    const data = await fetchSearchResult(query)
    moveToResultPage(data, query)
  }

  const moveToResultPage = (searchResultList: ProductCardType[], query: string) => {
    history.push({
      pathname: '/search-result',
      state: { searchResultList, query },
    })
  }

  return (
    <>
      <SearchBarHeader
        query={state.query}
        submitHandler={submitHandler}
        changeInputHandler={changeInputHandler}
      />
      <StyledContainer className="search-dashboard">
        {state.query.length > 0 && state.autoSuggestList.length > 0 && (
          <AutoSuggestQueryList
            query={state.query}
            autoSuggestList={state.autoSuggestList}
            clickSuggestHandler={clickSuggestHandler}
          />
        )}
      </StyledContainer>
    </>
  )
}
