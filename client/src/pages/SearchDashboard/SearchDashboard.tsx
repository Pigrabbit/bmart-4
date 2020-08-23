import React, { useState, useRef, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Dashboard } from '../../components/Dashboard'
import styled from 'styled-components'
import { SEARCH_URI } from '../../utils/constants'

type Props = {} & RouteComponentProps

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

export const SearchDashboard = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    
    console.log(searchQuery)
    fetch(SEARCH_URI as RequestInfo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: searchQuery })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
  return (
    <Dashboard title="" header={false} footer={false}>
      <StyledContainer className="search-dashboard">
        <form className="search-form" ref={formRef} onSubmit={submitHandler}>
          <StyledInput
            className="search-input"
            type="text"
            value={searchQuery}
            name="query"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <StyledSubmitBtn className="search-submit-btn" type="submit">
            <img src={`${process.env.PUBLIC_URL}/images/navbar-icon/search.svg`}/>
          </StyledSubmitBtn>
        </form>
      </StyledContainer>
    </Dashboard>
  )
}
