import React from 'react'
import { connect } from 'react-redux'
import { updateHandler, deleteHandler } from '../redux/actions'
import { Redirect, withRouter } from 'react-router-dom'



class UserProfile extends React.Component {


  state = {
    name: this.props.name,
    city: this.props.city,
    email_address: this.props["email_address"],
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
      email_address: this.state["email_address"]
    }
    // console.log(this.props.user.id)

    this.props.updateHandler(this.props.user.id, userObj)

  }


  beenClicked = () => {
    this.setState({ beenClicked: !this.state.beenClicked })
  }

  deleteHandler = () => {
    alert("Are You Sure You Want To Delete Your Profile?")
    this.props.deleteHandler(this.props.user.id)
  }



  render() {
    // console.log(this.props.userObj)
    // console.log(this.state.beenClicked)
    return (

      <>
        {this.props.user ?

          <>
            {!this.state.beenClicked ?
              <div className="container">
                <div className="card profile">
                  <h3>Name: {this.props.user.name}</h3>
                  <h3>Hometown: {this.props.user.city}</h3>
                  <h3>Email Address: {this.props.user["email_address"]}</h3>
                  <button className="other-button" onClick={this.beenClicked} >Update User</button>
                  <button className="other-button" onClick={this.deleteHandler}>Delete User</button>
                </div>
              </div> :

              <div className="container">
                <div className="profile-card">
                  <form onSubmit={this.submitHandler} className="form">
                    <label>UserName: </label>
                    <input
                      type="text"
                      name="name"
                      placeholder={this.props.user.name}
                      value={this.state.name}
                      onChange={this.changeHandler}>
                    </input>
                    <br></br><br></br>
                    <label>City: </label>
                    <input
                      type="text"
                      name="city"
                      placeholder={this.props.user.city}
                      value={this.state.city}
                      onChange={this.changeHandler}>
                    </input>
                    <br></br><br></br>
                    <label>Email Address: </label>
                    <input
                      type="email"
                      name="email_address"
                      placeholder={this.props.user["email_address"]}
                      value={this.state["email_address"]}
                      onChange={this.changeHandler}>
                    </input>
                    <button className="other-button" >Update Profile</button>
                    <button className="other-button" onClick={this.beenClicked} >Go Back</button>
                  </form>
                </div>
              </div>

            }

          </>

          :
          <Redirect to="/welcome" />}

      </>

    )

  }

}


const mdp = (dispatch) => {
  return {
    updateHandler: (objId, updatedObj) => dispatch(updateHandler(objId, updatedObj)),
    deleteHandler: (userId) => dispatch(deleteHandler(userId))
  }
}




export default withRouter(connect(null, mdp)(UserProfile))