import React from 'react'

type Props = {}

export const Navbar = (props: Props) => {
  return (
    <nav className="navbar">
      <a href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/home.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </a>
      <a href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/search.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </a>
      <a href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/favorite.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </a>
      <a href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/history.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </a>
      <a href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/shopping_cart.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </a>
    </nav>
  )
}
