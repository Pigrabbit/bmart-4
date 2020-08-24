import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { CATEGORIES } from '../../utils/constants'
import { HEADER_HEIGHT, STYLES } from '../../utils/styleConstants'

type Props = { selectedCategory: string }

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  align-items: center;
  position: sticky;
  top: ${`calc(${HEADER_HEIGHT} - 1px)`};
  height: 50px;
  background: white;
  z-index: 10;
  border-bottom: 1px solid ${STYLES.borderColor};
  padding: 0 ${STYLES.padding};
  scroll-behavior: smooth;

  div {
    margin-rigth: 6px;
    padding: 6px 16px;
    text-align: center;
    font-size: 14px;
    flex: 0 0 auto;
    border-radius: 16px;

    &:last-child {
      margin-right: 0;
    }

    &.selected {
      color: white;
      background-color: #444;
    }
  }
`
const StyledTitle = styled.div`
  font-size: 20px;
  background-color: white;
  text-align: center;
  padding: 20px 0 10px 0;

  p {
    line-height: 30px;

    &:first-child {
      font-weight: 700;
    }
  }
`

export const CategoryListSectionHeader = (props: Props) => {
  const { selectedCategory } = props

  const headerRef = useRef<HTMLDivElement>(null)
  const headerItemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerItemRef?.current || !headerRef?.current) return
    const selectedHeaderElm = headerItemRef.current
    const headerElm = headerRef.current

    const posX = selectedHeaderElm.offsetLeft
    const headerWidth = selectedHeaderElm.clientWidth
    const windowWidth = window.innerWidth

    headerElm.scrollLeft = posX + (headerWidth - windowWidth) / 2
  }, [selectedCategory])

  return (
    <>
      <StyledTitle>
        <p>번쩍하면 배달오는</p>
        <p>B마트 대표상품</p>
      </StyledTitle>
      <StyledHeader ref={headerRef}>
        {CATEGORIES.map((category, idx) => {
          return selectedCategory === category.name ? (
            <div key={idx} ref={headerItemRef} className="selected">
              {category.name}
            </div>
          ) : (
            <div key={idx}>{category.name}</div>
          )
        })}
      </StyledHeader>
    </>
  )
}
