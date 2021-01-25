import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../redux/actions'

class SignUp extends React.Component {

  state = {
    name: "",
    city: "",
    email_address: "",
    password: "",
    beenClicked: false
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }

  submitHandler = (e) => {
    e.preventDefault()

    let userObj = {
      name: this.state.name,
      city: this.state.city,
      email_address: this.state["email_address"],
      password: this.state.password,
    }
    this.props.submitHandler(userObj)

    this.setState({
      name: "",
      city: "",
      email_address: "",
      password: ""
    })
  }

  clickHandler = () => {
    this.setState({ beenClicked: true})
  }


  render() {
// console.log(this.state.beenClicked)
    return (
      <div>

        {this.state.beenClicked ?

          <form onSubmit={this.submitHandler} className="form">
            <label>UserName: </label>
            <input
              type="text"
              name="name"
              placeholder="user name goes here..."
              value={this.state.name}
              onChange={this.changeHandler}>
            </input>
            <br></br><br></br>
            <label>City: </label>
            <input
              type="text"
              name="city"
              placeholder="my city goes here..."
              value={this.state.city}
              onChange={this.changeHandler}>
            </input>
            <br></br><br></br>
            <label>Email Address: </label>
            <input
              type="email"
              name="email_address"
              placeholder="email address goes here..."
              value={this.state["email_address"]}
              onChange={this.changeHandler}>
            </input>
            <br></br><br></br>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="secure password (which is def not 123!) goes here..."
              value={this.state.password}
              onChange={this.changeHandler}>
            </input>

            <button className="welcome-button">Sign Up</button>
          </form>
          :
          <button className="welcome-button" onClick={this.clickHandler}>...Or Click Here To Sign Up</button>
        }

      </div>
    )
  }

}

const mdp = (dispatch) => {
  return {
    submitHandler: (userObj) => dispatch(signUp(userObj))

  }
}

export default connect(null, mdp)(SignUp)