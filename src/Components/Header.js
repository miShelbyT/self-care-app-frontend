import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn, logOut } from '../redux/actions'

class Header extends React.Component {

  componentDidMount = () => {
    //this will run on refresh, passing undefined to your logIn action.
    //This is seperate from when the logIn action gets called in your logIn form. 
    this.props.submitHandler(null)
  }

  logout = () => {
    this.props.logoutHandler()
  }

  render() {
    // console.log(this.props.userObj)
    return (
      <div className="header">
        <div className="take-care">
          <NavLink to='/journal-entries'>
            {this.props.userObj ? <h1>Take Care, {this.props.userObj.name}</h1> : <h1>Take Care</h1>}

            <h5>A Self-Care Journal</h5>
          </NavLink>
        </div>


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

        <NavLink to="/welcome">
          <div className="nav-component" onClick={this.logout}>Log Out</div>
        </NavLink> 

        {this.props.userObj? <Redirect to="/journal-entries" /> : <Redirect to="/welcome" />}

        <hr></hr>
      </div>

    )
  }



}

const msp = (state) => {
  return { userObj: state.userObj }
}

const mdp = (dispatch) => ({
  submitHandler: (userObj) => dispatch(logIn(userObj)),
  logoutHandler: () => dispatch(logOut())
})


export default connect(msp, mdp)(Header)