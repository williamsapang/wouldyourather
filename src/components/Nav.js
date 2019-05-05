import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav (props) {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        {props.loggedIn === false ? null : (
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
        )}
        {props.loggedIn === false ? null : (
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
        )}
        {props.loggedIn === false ? null : (
          <li>
            <NavLink to='/logout' activeClassName='active'>
              Logout
            </NavLink>
          </li>
        )}

      </ul>
    </nav>
  )
}