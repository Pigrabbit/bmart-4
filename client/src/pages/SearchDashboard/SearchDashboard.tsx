import React, { useState, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Dashboard } from '../../components/Dashboard'
import styled from 'styled-components'

type Props = {} & RouteComponentProps

const StyledContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  .search-form {
    width: 80%;
  }
`

const StyledInput = styled.input`
  width: 100%;
`

export const SearchDashboard = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)

  return (
    <Dashboard title="" header={false} footer={false}>
      <StyledContainer className="search-dashboard">
        <form className="search-form" ref={formRef}>
          <StyledInput
            className="search-input"
            type="text"
            value={searchQuery}
            name="query"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </StyledContainer>
    </Dashboard>
  )
}
