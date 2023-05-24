import { NavLink, useNavigate } from 'react-router-dom'
import './NavBar.scss'
import useAuth from '#Hooks/useAuth.js'
import { Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

export default function NavBar () {
  const navigate = useNavigate()
  const { user, deleteAuth } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => {
    deleteAuth()
    navigate('/')
  }

  return (
    <nav className='nav-bar'>
      <ul className='nav-bar_ul'>
        <div className='nav-bar_common'>
          <li className='nav-bar_li'>
            <NavLink to='/'>Inicio</NavLink>
          </li>
          <li className='nav-bar_li'>
            <div
              className='nav-bar_dropdown'
              aria-controls='gallery-menu'
              aria-haspopup='true'
              onClick={handleMenuOpen}
            >
              Galerías de arte
            </div>
            <Menu
              id='gallery-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <NavLink to='/gallery/painting'>Pintura</NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink to='/gallery/photography'>Fotografía</NavLink>
              </MenuItem>
            </Menu>
          </li>
          {user && user.role === 'artist' && (
            <li className='nav-bar_li'>
              <NavLink to='/create-artwork'>Subir obra</NavLink>
            </li>
          )}
        </div>
        <div className='nav-bar_profile'>
          {user && (
            <>
              <li className='nav-bar_li'>
                <NavLink to='/profile'>{user.name}</NavLink>
              </li>
              <li className='nav-bar_li'>
                <button className='nav-bar_btn' onClick={handleClick}>Cerrar sesión</button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li className='nav-bar_li'>
                <NavLink to='/login'>Iniciar sesión</NavLink>
              </li>
              <li className='nav-bar_li'>
                <NavLink to='/sign-up'>Registrarse</NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  )
}
