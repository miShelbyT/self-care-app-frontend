import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {

  return (
    <div className="header">

      <NavLink to='/welcome'>
        <h1 className="logo">Take Care</h1>
        <sup>A Self-Care Journal</sup>
      </NavLink>

      <NavLink to="/activities">
        <div className="nav-component" >Activities</div>
      </NavLink>

      <NavLink to="/journal-new">
        <div className="nav-component" >New Journal Entry</div>
      </NavLink>

      <NavLink to="/journal-entries">
        <div className="nav-component" >Journal Entries</div>
      </NavLink>

      <NavLink to="/user">
        <div className="nav-component" >User Profile</div>
      </NavLink>

      <NavLink to="/logout">
        <div className="nav-component" >Log Out</div>
      </NavLink>

      <hr></hr>
    </div>

  )


}


export default Header