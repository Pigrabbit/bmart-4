import React, { useEffect, useRef } from 'react'
import { BannerType } from '../../types/banner'
import { SLIDER_INTERVAL_TIME } from '../../utils/constants'
import styled from 'styled-components'
import { StyledWrapper } from '../../styles/StyledWrapper'

type Props = {
  width?: number
  bannerList: BannerType[]
  autoSlide: boolean
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

  const { width = window.innerWidth, bannerList, autoSlide } = props
  const silderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initSliderScrollEvent()
    if (autoSlide) startSlideInterval()
  }, [])

  const initSliderScrollEvent = () => {
    const silderElm = silderRef.current
    if (!silderElm) return

    silderElm.scrollLeft = width

    silderElm.addEventListener('scroll', sliderScrollHandler)
    silderElm.addEventListener('touchstart', clearSlideInterval)
    silderElm.addEventListener('touchend', startSlideInterval)
  }

  const sliderScrollHandler = () => {
    const silderElm = silderRef.current
    if (!silderElm) return

    const { scrollWidth, scrollLeft } = silderElm

    if (scrollWidth - width - scrollLeft <= 0) {
      silderElm.style.scrollBehavior = 'initial'
      silderElm.scrollLeft = width
      silderElm.style.scrollBehavior = 'smooth'
    }
    if (scrollLeft <= 0) {
      silderElm.style.scrollBehavior = 'initial'
      silderElm.scrollLeft = scrollWidth - 2 * width
      silderElm.style.scrollBehavior = 'smooth'
    }
  }

  const startSlideInterval = () => {
    sliderInterval = setInterval(() => {
      const silderElm = silderRef.current
      if (!silderElm) return

      const { scrollLeft } = silderElm

      silderElm.style.scrollBehavior = 'smooth'
      silderElm.scrollLeft = scrollLeft + width
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
        <StyledContainer ref={silderRef}>
          {itemList.map((item, idx) => (
            <StyledSlider key={idx} className="carousel-slide">
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <img src={item.src} alt="" />
              </a>
            </StyledSlider>
          ))}
        </StyledContainer>
      </StyledCarousel>
    </StyledWrapper>
  )
}
