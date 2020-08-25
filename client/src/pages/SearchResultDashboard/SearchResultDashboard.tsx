import React, { useState, useReducer } from 'react'
import { ProductCardType } from '../../types/productCard'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'
import { Sorter } from '../../components/Sorter'
import { useLocation } from 'react-router-dom'

type Props = {}

type RouteState = {
  searchResultList: ProductCardType[]
}

type State = {
  resultList: ProductCardType[]
  sorter: number
}

type Action = {
  type: string
  payload: any
}

const searchResultReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'sorterChange': {
      if (action.payload.sorter === 'sellCountDesc') {
        return {
          resultList: [...state.resultList].sort((a, b) => {
            if (a.id > b.id) return 1
            else return -1
          }),
          sorter: action.payload.sorter,
        }
      } else if (action.payload.sorter === 'priceAsc') {
        return {
          resultList: [...state.resultList].sort((a, b) => {
            if (a.price > b.price) return 1
            else return -1
          }),
          sorter: action.payload.sorter,
        }
      } else if (action.payload.sorter === 'priceDesc') {
        return {
          resultList: [...state.resultList].sort((a, b) => {
            if (a.price < b.price) return 1
            else return -1
          }),
          sorter: action.payload.sorter,
        }
      }
    }
  }
  return state
}

export const SearchResultDashboard = (props: Props) => {
  const location = useLocation<RouteState>()
  const { searchResultList } = location.state

  const initialState = {
    resultList: searchResultList,
    sorter: 0,
  }

  const [state, dispatch] = useReducer(searchResultReducer, initialState)
  const sorterChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'sorterChange', payload: { sorter: event.target.value } })
  }

  return (
    <Dashboard title="" header={false}>
      <>
        <Sorter sorterChangeHandler={sorterChangeHandler} />
        <VerticalList title="검색 결과" productList={state.resultList} />
      </>
    </Dashboard>
  )
}
