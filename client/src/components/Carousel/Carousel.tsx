import React, { useEffect, useRef } from 'react'
import { BannerType } from '../../types/banner'
import { SLIDER_INTERVAL_TIME } from '../../utils/constants'
import styled from 'styled-components'
import { StyledWrapper } from '../../styles/StyledWrapper'

type Props = {
  width?: number
  bannerList: BannerType[]
}

const StyledCarousel = styled.div`
  font-size: 0;
  margin: 0 auto;
  overflow: hidden;

  position: relative;
`
const StyledContainer = styled.div`
  font-size: 0;
  height: 100%;
  margin: 0 auto;
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`
const StyledSlider = styled.div`
  font-size: 0;
  flex: 0 0 auto;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  overflow: hidden;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
`

export const Carousel = (props: Props) => {
  let sliderInterval: any = null

  const { width = window.innerWidth, bannerList } = props
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initSliderScrollEvent()
    startSlideInterval()
  }, [])

  const initSliderScrollEvent = () => {
    const sliderElm = sliderRef.current
    if (!sliderElm) return

    sliderElm.scrollLeft = width

    sliderElm.addEventListener('scroll', sliderScrollHandler)
    sliderElm.addEventListener('touchstart', clearSlideInterval)
    sliderElm.addEventListener('touchend', startSlideInterval)
  }

  const sliderScrollHandler = () => {
    const sliderElm = sliderRef.current
    if (!sliderElm) return

    const { scrollWidth, scrollLeft } = sliderElm

    if (scrollWidth - width - scrollLeft <= 0) {
      sliderElm.style.scrollBehavior = 'initial'
      sliderElm.scrollLeft = width
      sliderElm.style.scrollBehavior = 'smooth'
    }
    if (scrollLeft <= 0) {
      sliderElm.style.scrollBehavior = 'initial'
      sliderElm.scrollLeft = scrollWidth - 2 * width
      sliderElm.style.scrollBehavior = 'smooth'
    }
  }

  const startSlideInterval = () => {
    sliderInterval = setInterval(() => {
      const sliderElm = sliderRef.current
      if (!sliderElm) return

      const { scrollLeft } = sliderElm

      sliderElm.style.scrollBehavior = 'smooth'
      sliderElm.scrollLeft = scrollLeft + width
    }, SLIDER_INTERVAL_TIME)
  }

  const clearSlideInterval = () => {
    clearInterval(sliderInterval)
  }

  const length = bannerList.length
  const itemList = length > 1 ? [bannerList[length - 1], ...bannerList, bannerList[0]] : bannerList

  return (
    <StyledWrapper>
      <StyledCarousel>
        <StyledContainer ref={sliderRef}>
          {itemList.map((item, idx) => (
            <StyledSlider key={idx} className="carousel-slide">
              <img src={item.src} alt="" />
            </StyledSlider>
          ))}
        </StyledContainer>
      </StyledCarousel>
    </StyledWrapper>
  )
}
