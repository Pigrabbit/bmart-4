import React, { useState } from 'react'
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

  position: relative;

  .carousel-indicator-list {
    width: 60%;
    position: absolute;
    bottom: 2%;
    display: flex;
    justify-content: space-around;
  }

  .carousel-indicator {
    height: 16px;
    width: 16px;
    background-color: transparent;
    border: 1px solid #bbb;
    border-radius: 50%;
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
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0)

  const scrollHandler = () => {
    console.log('hi')
  }

  return (
    <StyledWrapper>
      <StyledCarousel className="carousel">
        <StyledContainer className="carousel-slide-container" onScroll={scrollHandler}>
          {bannerList.map((item, idx) => (
            <StyledSlider key={idx} className="carousel-slide">
              <img src={item.src} alt="" />
            </StyledSlider>
          ))}
        </StyledContainer>
        <div className="carousel-indicator-list">
          {bannerList.map((item, idx) => (
            <div key={idx} className="carousel-indicator"></div>
          ))}
        </div>
      </StyledCarousel>
    </StyledWrapper>
  )
}
