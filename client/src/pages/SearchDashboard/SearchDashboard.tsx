import React, { useState, useRef, FormEvent, useReducer } from 'react'
import { Redirect } from 'react-router-dom'
import { Dashboard } from '../../components/Dashboard'
import styled from 'styled-components'
import { SEARCH_URI, SPECIAL_CHAR_REGEX } from '../../utils/constants'
import { ProductCardType } from '../../types/productCard'

type Props = {}

const StyledContainer = styled.section`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-form {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const StyledInput = styled.input`
  width: 90%;
  border: none;
  height: 24px;
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
        hasQueried: true,
        searchResultList: action.payload.searchResultList,
      }
    }
    case 'input': {
      if (SPECIAL_CHAR_REGEX.test(action.payload.query)) return { ...state }
      return {
        ...state,
        query: action.payload.query,
      }
    }
  }
  return state
}

const initialState = {
  query: '',
  hasQueried: false,
  searchResultList: [],
}

export const SearchDashboard = (props: Props) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

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

    dispatch({ type: 'submit', payload: { searchResultList: data, query: state.query } })
  }

  return (
    <Dashboard title="검색" navbar={false} searchBar={false} footer={false}>
      {state.hasQueried ? (
        <Redirect
          to={{
            pathname: '/search-result',
            state: { searchResultList: state.searchResultList, query: state.query },
          }}
        />
      ) : (
        <StyledContainer className="search-dashboard">
          <form className="search-form" onSubmit={submitHandler}>
            <StyledInput
              className="search-input"
              type="text"
              value={state.query}
              name="query"
              onChange={(e) => dispatch({ type: 'input', payload: { query: e.target.value } })}
            />
            <StyledSubmitBtn className="search-submit-btn" type="submit">
              <img src={`${process.env.PUBLIC_URL}/images/navbar-icon/search.svg`} />
            </StyledSubmitBtn>
          </form>
        </StyledContainer>
      )}
    </Dashboard>
  )
}
