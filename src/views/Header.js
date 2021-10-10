import PropTypes from 'prop-types'
import React from 'react'
import '../css/header.scss'
import logo from '../img/logo.png'

const Header = ({ children }) => (
  <header>
    <div className='logo'>
      <a href='/'>
        <img src={logo} alt='Logo' />
      </a>
    </div>
    {children}
  </header>
)
export default Header

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
}

Header.defaultProps = {
  children: '',
}
