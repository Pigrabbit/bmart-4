import React from 'react'
import { Header } from '../../components/Header'
import { Navbar } from '../../components/Navbar'

export const NotFoundDashboard = () => {
  const NotFound = (
    <div>
      <h1>길을 잃으셨나요?</h1>
      <p>해당 페이지를 찾을 수 없습니다.</p>
      <p>홈페이지로 이동해서 다양한 상품들을 만나보세요.</p>
      <a href="/">B Mart 홈</a>
    </div>
  )
  return (
    <div>
      <Header title="404 Not Found" />
      {NotFound}
      <Navbar />
    </div>
  )
}
