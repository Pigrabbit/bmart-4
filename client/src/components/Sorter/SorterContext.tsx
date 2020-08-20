import React from 'react'
export const SorterContext = React.createContext([
  { id: 'sellCountDesc', name: '판매량 많은 순' },
  { id: 'priceAsc', name: '가격 낮은 순' },
  { id: 'priceDesc', name: '가격 높은 순' },
])
export const SorterProvider = SorterContext.Provider
