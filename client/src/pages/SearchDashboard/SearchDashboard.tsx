import React, { useState, useRef, FormEvent, useReducer, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Dashboard } from '../../components/Dashboard'
import styled from 'styled-components'
import { SEARCH_URI, SPECIAL_CHAR_REGEX, MAX_SEARCH_QUERY_LENGTH } from '../../utils/constants'
import { ProductCardType } from '../../types/productCard'
import { COLORS, STYLES } from '../../utils/styleConstants'

type Props = {}

const StyledContainer = styled.div`
  padding: ${STYLES.padding};
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(40px, 1fr));
  justify-items: center;

  .search-alert {
    color: ${COLORS.red};
  }

  .search-suggestion {
    height: 30px;
    width: 90%;
    padding: 8px 12px;
    background-color: #fff;
    justify-self: start;
  }
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.lightBlue};
`

const StyledInput = styled.input`
  width: 90%;
  border: none;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 0 12px;
`

const StyledSubmitBtn = styled.button`
  margin-top: 2px;
  img {
    width: 24px;
  }
`

type State = {
  query: string
  hasQueried: boolean
  isQueryLengthOverLimit: boolean
  searchResultList: ProductCardType[]
}

type Action = {
  type: string
  payload: any
}

const searchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'submit': {
      return {
        ...state,
        query: '',
        hasQueried: true,
        searchResultList: action.payload.searchResultList,
      }
    }
    case 'input': {
      if (SPECIAL_CHAR_REGEX.test(action.payload.query)) return { ...state }
      if (action.payload.query.length > MAX_SEARCH_QUERY_LENGTH)
        return { ...state, isQueryLengthOverLimit: true }
      return {
        ...state,
        query: action.payload.query,
        isQueryLengthOverLimit: false,
      }
    }
  }
  return state
}

const initialState = {
  query: '',
  hasQueried: false,
  isQueryLengthOverLimit: false,
  searchResultList: [],
}

export const SearchDashboard = (props: Props) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const result = await fetch(SEARCH_URI as RequestInfo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: state.query }),
    })
    const data = await result.json()

    dispatch({ type: 'submit', payload: { searchResultList: data } })
  }

  return (
    <Dashboard title="검색" navbar={false} searchBar={false} footer={false}>
      {state.hasQueried ? (
        <Redirect
          to={{ pathname: '/search-result', state: { searchResultList: state.searchResultList } }}
        />
      ) : (
        <StyledContainer className="search-dashboard">
          <StyledForm className="search-form" onSubmit={submitHandler}>
            <StyledInput
              className="search-input"
              type="text"
              ref={inputRef}
              value={state.query}
              name="query"
              placeholder="B마트 상품을 검색해보세요!"
              autoComplete="off"
              onChange={(e) => dispatch({ type: 'input', payload: { query: e.target.value } })}
            />
            <StyledSubmitBtn
              className="search-submit-btn"
              type="submit"
              disabled={state.isQueryLengthOverLimit}
            >
              <img src={`${process.env.PUBLIC_URL}/images/navbar-icon/search.svg`} />
            </StyledSubmitBtn>
          </StyledForm>
          {state.query.length > 0 ? (
            <>
              <div className="search-suggestion">{state.query}</div>
              <div className="search-suggestion">{state.query + ' 1개'}</div>
              <div className="search-suggestion">{state.query + ' 어린이'}</div>
            </>
          ) : (
            ''
          )}

          {state.isQueryLengthOverLimit ? (
            <p className="search-alert">검색어는 30자 이하로 입력해주세요</p>
          ) : (
            ''
          )}
        </StyledContainer>
      )}
    </Dashboard>
  )
}
