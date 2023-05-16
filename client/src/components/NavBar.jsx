import { NavLink, useNavigate } from 'react-router-dom'
import './NavBar.scss'
import useAuth from '#Hooks/useAuth.js'

export default function NavBar () {
  const navigate = useNavigate()
  const { user, deleteAuth } = useAuth()

  const handleClick = () => {
    deleteAuth()
    navigate('/')
  }

  return (
    <nav className='nav-bar'>
      <ul>
        <div className='nav-bar_common'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/gallery'>Gallery</NavLink>
          </li>
          {user && user.role === 'artist' && (
            <li>
              <NavLink to='/create-artwork'>Create Artwork</NavLink>
            </li>
          )}
        </div>
        <div className='nav-bar_profile'>
          {user && (
            <>
              <li>
                <NavLink to='/profile'>{user.name}</NavLink>
              </li>
              <li>
                <button onClick={handleClick}>Logout</button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <NavLink to='/login'>Login</NavLink>
              </li>
              <li>
                <NavLink to='/sign-up'>Sign Up</NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  )
}
