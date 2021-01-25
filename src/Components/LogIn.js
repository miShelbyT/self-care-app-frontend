import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../redux/actions'

class LogIn extends React.Component {

  state = {
    name: "",
    password: "",
    beenClicked: true
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state.name)
  }

  submitHandler = (e) => {
    e.preventDefault()
    let userObj = {
      name: this.state.name,
      password: this.state.password
    }
    this.props.submitHandler(userObj)
    this.setState({
      name: "",
      password: ""
    })

  }



  render() {




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
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="secure password (which is def not 123!) goes here..."
              value={this.state.password}
              onChange={this.changeHandler}>
            </input>

            <button className="act-button" >Log In</button>
          </form>
          :
          <button>Click Here To Log In</button>
        }
        <br></br><br></br><br></br>
      </div>
    )
  }

}

const mdp = (dispatch) => {
  return {
    submitHandler: (userObj) => dispatch(logIn(userObj))

  }
}

export default connect(null, mdp)(LogIn)