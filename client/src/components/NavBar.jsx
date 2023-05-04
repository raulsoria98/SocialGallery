import { NavLink } from 'react-router-dom'
import './NavBar.scss'

export default function NavBar () {
  return (
    <nav className='nav-bar'>
      <ul>
        <div className='nav-bar_common'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
        </div>
        <div className='nav-bar_profile'>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/sign-up'>Sign Up</NavLink>
          </li>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  )
}
