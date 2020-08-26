import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { OrderHistoryData, GET_ORDER_HISTORY } from '../../apis/graphqlQuery'
import { Dashboard } from '../../components/Dashboard'
import { STYLES } from '../../utils/styleConstants'
import { HistoryCard } from './HistoryCard'

type Props = {}

const StyledContainer = styled.div`
  padding: ${STYLES.padding};
`

export const HistoryDashboard = (props: Props) => {
  const { loading, data, refetch } = useQuery<OrderHistoryData>(GET_ORDER_HISTORY)

  useEffect(() => {
    refetch()
  }, [])

  return (
    <Dashboard title="주문내역">
      <StyledContainer className="history-list">
        {data?.orderHistoryList.map((history, idx) => (
          <HistoryCard key={idx} orderHistory={history} />
        ))}
      </StyledContainer>
    </Dashboard>
  )
}
