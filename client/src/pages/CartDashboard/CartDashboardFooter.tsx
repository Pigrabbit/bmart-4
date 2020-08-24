import React from 'react'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'

type Props = {}

const StyledContainer = styled.div`
  padding: 10px ${STYLES.padding};

  p {
    padding: 10px 0;
  }
`

export const CartDashboardFooter = (props: Props) => {
  return (
    <StyledContainer className="policy">
      <p>배달팁 할인 이벤트는 내부사정으로 사전 예고 없이 조기 종료 될 수 있습니다.</p>
      <p>
        장바구니에 담긴 상품은 최대 7일 동안 저장됩니다. 판매 종료 상품은 장바구니에서 자동으로
        삭제됩니다.
      </p>
    </StyledContainer>
  )
}
