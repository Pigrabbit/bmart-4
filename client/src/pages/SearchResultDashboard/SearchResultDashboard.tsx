import React, { useState, useReducer } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProductCardType } from '../../types/productCard'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'
import { Sorter } from '../../components/Sorter'

type Props = {} & RouteComponentProps

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
      if (action.payload.sorter === 0) {
        return {
          resultList: [...state.resultList]
            .sort((a, b) => {
              if (a.id > b.id) return 1
              else return -1
            }),
          sorter: action.payload.sorter
        }
      } else if (action.payload.sorter === 1) {
        return {
          resultList: [...state.resultList]
            .sort((a, b) => {
              if (a.price > b.price) return 1
              else return -1
            }),
          sorter: action.payload.sorter
        }
      } else if (action.payload.sorter === 2) {
        return {
          resultList: [...state.resultList]
            .sort((a, b) => {
              if (a.price < b.price) return 1
              else return -1
            }),
          sorter: action.payload.sorter
        }
      }
    }
  }
  return state
}

export const SearchResultDashboard = (props: Props) => { 
  const { location } = props
  const routeState = location.state as RouteState
  const { searchResultList } = routeState

  const initialState = {
    resultList: searchResultList,
    sorter: 0
  }
    
  const [state, dispatch] = useReducer(searchResultReducer, initialState)

   // useState를 활용해서 sorter 상태 관리
   const [sorter, setSorter] = useState(0)
   const sorterChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({ type: 'sorterChange', payload: { sorter: parseInt(event.target.value) }})
   }

  return (
    <Dashboard title="" header={false}>
      <>
        <Sorter sorterChangeHandler={sorterChangeHandler}/>
        <VerticalList title="검색 결과" productList={state.resultList} />
      </>
    </Dashboard>
  )
}