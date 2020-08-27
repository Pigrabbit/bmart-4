import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../utils/styleConstants'

type Props = {
  checked: boolean
  disabled?: boolean
  changeHandler: (checked: boolean) => void
}

const StyledContainer = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #555;
  border-radius: 2px;
  flex: 0 0 auto;

  input[type='checkbox'] {
    display: none;
  }

  .icon {
    font-size: 18px;
    line-height: 18px;
    font-weight: 900;
  }

  &.checked {
    background-color: ${COLORS.blue};
    border-color: ${COLORS.blue};
    color: white;
  }
`

export const Checkbox = (props: Props) => {
  const { checked, disabled = false } = props

  const clickToggleCheckButtonHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()

    const { checked } = e.target

    props.changeHandler(checked)
  }

  return (
    <StyledContainer className={`${checked ? 'checked' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={clickToggleCheckButtonHandler}
      />
      <i className="icon">{checked ? 'checkmark_alt' : ''}</i>
    </StyledContainer>
  )
}
