import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, NetworkStatus } from '@apollo/client'
import { Dashboard } from '../../components/Dashboard'
import { STYLES } from '../../utils/styleConstants'
import { HistoryCard } from './HistoryCard'
import { OrderHistoryData, GET_ORDER_HISTORY } from '../../apis/order'
import { CenteredImg } from '../../components/CenteredImg'
import { TUNG_MESSAGE } from '../../utils/constants'

type Props = {}

const StyledContainer = styled.div`
  padding: ${STYLES.padding};
  margin-top: ${STYLES.margin};
  background-color: white;
`

export const HistoryDashboard = (props: Props) => {
  const { loading, data, refetch, networkStatus } = useQuery<OrderHistoryData>(GET_ORDER_HISTORY, {
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      {!loading && data && data.orderHistoryList.length > 0 && (
        <Dashboard title="주문내역">
          <StyledContainer className="history-list">
            {loading || networkStatus === NetworkStatus.refetch
              ? ''
              : data?.orderHistoryList.map((history, idx) => (
                  <HistoryCard key={idx} orderHistory={history} />
                ))}
          </StyledContainer>
        </Dashboard>
      )}
      {!loading && data && data.orderHistoryList.length === 0 && (
        <Dashboard title="주문내역" footer={false}>
          <CenteredImg description={TUNG_MESSAGE.EMPTY_HISTORY} />
        </Dashboard>
      )}
    </>
  )
}
