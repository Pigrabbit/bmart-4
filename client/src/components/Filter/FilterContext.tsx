import React from 'react'
export const FilterContext = React.createContext([
  { id: 0, name: '판매량 많은 순' },
  { id: 1, name: '가격 낮은 순' },
  { id: 2, name: '가격 높은 순' },
])
export const FilterProvider = FilterContext.Provider
