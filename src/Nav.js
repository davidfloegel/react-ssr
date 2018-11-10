import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <div>
    <Link to="/">Home</Link>{' / '}
    <Link to="/about">About</Link>{' / '}
    <Link to="/profile">Profile</Link>{' / '}
    <Link to="/private">Private</Link>
  </div>
)

export default Nav