import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../redux/actions'


function MenuOverlay(props) {

  const logoutHandler = () => {
    props.logout()
  }


  return (
<>
    {props.user? 
    
    <div className="overlay">
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      

      <NavLink to="/journal-new">
        <h2 className="menu-item" >New Journal Entry</h2>
      </NavLink>

      <NavLink to="/journal-entries">
        <h2 className="menu-item" >My Journal Entries</h2>
      </NavLink>

      <NavLink to="/user">
        <h2 className="menu-item" >My User Profile</h2>
      </NavLink>

      <NavLink to="/activities">
        <h2 className="menu-item" >Activities List</h2>
      </NavLink>

      <NavLink to="/welcome">
        <h2 className="menu-item" onClick={logoutHandler}>Log Out</h2>
      </NavLink>

    </div>
    
    
    : <Redirect to='/welcome' />
    
    }
    </>
    
  )

}

const mdp = (dispatch) => ({
  logout: () => dispatch(logOut())
})

export default connect(null, mdp)(MenuOverlay)