import React from 'react'
import "../header/Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0,0)} className="header">Movies HUB 🎥</span>
  )
}

export default Header
