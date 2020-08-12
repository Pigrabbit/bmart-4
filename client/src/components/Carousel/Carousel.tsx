import React, { useEffect, useRef } from 'react'
import { StyledWrapper } from '../../styles/StyledWrapper'

type Props = { width: number }

const images = [
  { order: 0, backgroundColor: 'green' },
  { order: 1, backgroundColor: 'navy' },
  { order: 2, backgroundColor: 'red' },
  // { order: 3, backgroundColor: "orange" },
  // { order: 4, backgroundColor: "gray" },
  // { order: 5, backgroundColor: "blue" },
  // { order: 6, backgroundColor: "purple" },
]

export const Carousel = (props: Props) => {
  const { width } = props
  const silderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initEvents()
  }, [])

  let initialX = 0
  let translateX = 0
  let sliderInterval: any = null

  const initEvents = () => {
    const silderElm = silderRef.current
    if (!silderElm) return

    startSlideInterval()
    silderElm.addEventListener('pointerdown', sliderPointerDownHandler)
  }

  const startSlideInterval = () => {
    const silderElm = silderRef.current
    if (!silderElm) return

    addSliderTransition()
    sliderInterval = setInterval(() => {
      silderElm.style.transform = `translateX(${getTranslateX() - width}px)`
      const transitionEndHandler = () => {
        if ((images.length + 1) * width === Math.abs(getTranslateX())) {
          clearSlideInterval()
          silderElm.style.transform = `translateX(${width * -1}px)`

          silderElm.getBoundingClientRect()
          startSlideInterval()
        }

        if (Math.abs(getTranslateX()) === 0) {
          clearSlideInterval()
          silderElm.style.transform = `translateX(${width * -1 * images.length}px)`

          silderElm.getBoundingClientRect()
          startSlideInterval()
        }

        silderElm.removeEventListener('transitionend', transitionEndHandler)
      }
      silderElm.addEventListener('transitionend', transitionEndHandler)
    }, 2000)
  }

  const clearSlideInterval = () => {
    removeSliderTransition()
    clearInterval(sliderInterval)
  }

  const addSliderTransition = () => {
    const silderElm = silderRef.current
    if (!silderElm) return

    silderElm.style.transition = `transform 400ms ease`
  }

  const removeSliderTransition = () => {
    const silderElm = silderRef.current
    if (!silderElm) return

    silderElm.style.removeProperty('transition')
  }

  const sliderPointerDownHandler = (e: MouseEvent) => {
    const silderElm = silderRef.current
    if (!silderElm) return

    initialX = e.pageX
    translateX = getTranslateX()

    clearSlideInterval()
    window.addEventListener('pointermove', sliderPointerMoveHandler)
    window.addEventListener('pointerup', sliderPointerUpHandler)
  }

  const getTranslateX = (): number => {
    const silderElm = silderRef.current
    if (!silderElm) return 0

    return parseFloat(silderElm.style.transform.replace(/[^-0-9\.]/g, '') || '0')
  }

  const getDestination = (): number => {
    const translateX = getTranslateX()
    const rest = (translateX - width) % width

    if (Math.abs(rest) >= width / 2) return Math.ceil((translateX - width) / width) * width
    else return (Math.ceil((translateX - width) / width) + 1) * width
  }

  const sliderPointerMoveHandler = (e: MouseEvent) => {
    const silderElm = silderRef.current
    if (!silderElm) return

    silderElm.style.transform = `translateX(${e.pageX - initialX + translateX}px)`
  }

  const sliderPointerUpHandler = () => {
    const silderElm = silderRef.current
    if (!silderElm) return

    addSliderTransition()

    const transitionEndHandler = () => {
      removeSliderTransition()
      if ((images.length + 1) * width === Math.abs(getTranslateX())) {
        clearSlideInterval()
        silderElm.style.transform = `translateX(${width * -1}px)`

        silderElm.getBoundingClientRect()
        startSlideInterval()
      }

      if (Math.abs(getTranslateX()) === 0) {
        clearSlideInterval()
        silderElm.style.transform = `translateX(${width * -1 * images.length}px)`

        silderElm.getBoundingClientRect()
        startSlideInterval()
      }

      silderElm.removeEventListener('transitionend', transitionEndHandler)
      startSlideInterval()
    }

    silderElm.addEventListener('transitionend', transitionEndHandler)
    silderElm.style.transform = `translateX(${getDestination()}px)`

    window.removeEventListener('pointermove', sliderPointerMoveHandler)
    window.removeEventListener('pointerup', sliderPointerUpHandler)
  }

  return (
    <StyledWrapper>
      <div className="view" style={{ width }}>
        <div
          className="carousel-container"
          ref={silderRef}
          style={{ transform: `translateX(${width * -1}px)` }}
        >
          {[images[images.length - 1], ...images, images[0]].map((img, idx) => {
            return (
              <div
                key={idx}
                className="carousel-slide"
                style={{ backgroundColor: img.backgroundColor, width }}
              >
                {img.order % images.length}
              </div>
            )
          })}
        </div>
      </div>
    </StyledWrapper>
  )
}
