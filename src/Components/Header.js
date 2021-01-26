import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn, logOut } from '../redux/actions'
class Header extends React.Component {


  state = {
    beenClicked: false
  }


  menuClick = () => {
    this.setState({ beenClicked: !this.state.beenClicked })
  }

  componentDidMount = () => {
    //this will run on refresh, passing undefined to your logIn action.
    //This is seperate from when the logIn action gets called in your logIn form. 
    this.props.submitHandler(null)
  }

  logout = () => {
    this.props.logoutHandler()
  }

  render() {
    // console.log(this.state.beenClicked)
    return (
      <div className="header">
        <div className="take-care">
          
            {this.props.userObj ? <h1>Take Care, {this.props.userObj.name}</h1> : 
            <>
            <h1>Take Care</h1>
            <p>A Self-Care Journal</p>
            </>}
            
            
          </div>

          <NavLink to="/menu">
            <label htmlFor="hamburger" className="burger" onClick={this.menuClick}>&#9776; Menu</label>
          </NavLink>
        

        {this.props.userObj ? <Redirect to="/journal-entries" /> : <Redirect to="/welcome" />}
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