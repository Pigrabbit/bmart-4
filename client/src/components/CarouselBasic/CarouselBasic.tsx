import React, { useEffect, useRef, useState } from 'react'
import { BannerType } from '../../types/banner'
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
  display: flex;
  justify-content: center;
  align-items: center;
  filter: brightness(0.96);
  position: relative;

  .carousel-indicator-list {
    position: absolute;
    bottom: 24px;
    display: flex;
    justify-content: center;
  }

  .carousel-indicator-invisible {
    height: 8px;
    width: 8px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    margin: 0 1px;
  }

  .carousel-indicator-visible {
    height: 8px;
    width: 8px;
    background-color: white;
    border-radius: 50%;
    margin: 0 1px;
  }
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

export const CarouselBasic = (props: Props) => {
  const { bannerList } = props
  const sliderRef = useRef<HTMLDivElement>(null)
  const bannerRefList = useRef<Array<HTMLDivElement | null>>([])
  const [bannerIndex, setBannerIndex] = useState(0)

  useEffect(() => {
    const bannerObserveHandler = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
          setBannerIndex(bannerRefList.current.indexOf(entry.target as HTMLDivElement))
        }
      })
    }
    const observer = new IntersectionObserver(bannerObserveHandler, {
      root: sliderRef.current,
      threshold: 0.9,
    })
    bannerRefList.current.forEach((banner) => {
      observer.observe(banner!)
    })
  }, [])

  return (
    <StyledWrapper className="carousel-wrapper">
      <StyledCarousel className="carousel">
        <StyledContainer className="carousel-slide-container" ref={sliderRef}>
          {bannerList.map((item, idx) => (
            <StyledSlider
              key={idx}
              className="carousel-slide"
              ref={(el) => {
                bannerRefList.current[idx] = el
              }}
            >
              <img src={item.src} alt="" />
            </StyledSlider>
          ))}
        </StyledContainer>
        <div className="carousel-indicator-list">
          {bannerList.map((item, idx) => {
            return idx === bannerIndex ? (
              <div key={idx} className="carousel-indicator-visible"></div>
            ) : (
              <div key={idx} className="carousel-indicator-invisible"></div>
            )
          })}
        </div>
      </StyledCarousel>
    </StyledWrapper>
  )
}
