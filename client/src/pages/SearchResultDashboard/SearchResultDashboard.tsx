import React, { useState, useReducer } from 'react'
import { ProductCardType } from '../../types/productCard'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'
import { Sorter } from '../../components/Sorter'
import { SortType } from '../../types/sort'
import { PRODUCT_SORT_TYPE } from '../../utils/constants'
import { useLocation } from 'react-router-dom'

type Props = {}

type RouteState = {
  searchResultList: ProductCardType[]
}

type State = {
  resultList: ProductCardType[]
  sorter: SortType
}

type Action = {
  type: string
  payload: { sorter: SortType }
}

const searchResultReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'sorterChange': {
      if (action.payload.sorter === '') {
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
    default:
      return state
  }
}

export const SearchResultDashboard = (props: Props) => {
  const location = useLocation<RouteState>()
  const { searchResultList } = location.state

  const initialState: State = {
    resultList: searchResultList,
    sorter: '',
  }

  const [state, dispatch] = useReducer(searchResultReducer, initialState)

  const sorterChangeHandler = (sorter: SortType) => {
    dispatch({ type: 'sorterChange', payload: { sorter } })
  }

  return (
    <Dashboard title="검색 결과">
      <>
        <Sorter
          selectedSorter={state.sorter}
          sorterList={PRODUCT_SORT_TYPE}
          sorterChangeHandler={sorterChangeHandler}
        />
        <VerticalList title="" productList={state.resultList} />
      </>
    </Dashboard>
  )
}
