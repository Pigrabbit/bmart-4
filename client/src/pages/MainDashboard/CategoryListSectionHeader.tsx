import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { CATEGORIES } from '../../utils/constants'
import { HEADER_HEIGHT, STYLES } from '../../utils/styleConstants'
import { useHistory } from 'react-router-dom'

type Props = {
  focusedCategory: string
  changeFocus: (category: string, flag: 'in' | 'out') => void
  selectCategory: (focusedCategory: string) => void
}

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  align-items: center;
  position: sticky;
  top: ${`calc(${HEADER_HEIGHT} - 1px)`};
  height: 50px;
  background: white;
  z-index: 1000;
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
  const { focusedCategory } = props

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
  }, [focusedCategory])

  const clickCategoryHeaderHandler = (categoryName: string, idx: number) => () => {
    const a = document.querySelector<HTMLDivElement>(`#category-${idx}`)
    window.scroll(0, (a?.offsetTop || 0) - 140)
    props.changeFocus(categoryName, 'in')
  }

  return (
    <>
      <StyledTitle>
        <p>번쩍하면 배달오는</p>
        <p>B마트 대표상품</p>
      </StyledTitle>
      <StyledHeader ref={headerRef}>
        {CATEGORIES.map((category, idx) => {
          return focusedCategory === category.name ? (
            <div
              key={idx}
              ref={headerItemRef}
              className="selected"
              onClick={clickCategoryHeaderHandler(category.name, idx)}
            >
              {category.name}
            </div>
          ) : (
            <div key={idx} onClick={clickCategoryHeaderHandler(category.name, idx)}>
              {category.name}
            </div>
          )
        })}
      </StyledHeader>
    </>
  )
}
