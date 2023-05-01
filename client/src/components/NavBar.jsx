import { NavLink } from 'react-router-dom'

export default function NavBar () {
  return (
    <nav className='nav-bar'>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/sign-in'>Sign In</NavLink>
        </li>
        <li>
          <NavLink to='/sign-up'>Sign Up</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}
