import React from 'react'
import { connect } from 'react-redux'



function UserProfile(props){
console.log(props.userObj)

    return (
      <div className="container">
        <div className="profile-card">
        <h3>Name: {props.userObj.name}</h3>
        <h3>Hometown: {props.userObj.city}</h3>
        <h3>Email Address: {props.userObj["email_address"]}</h3>
        </div>
        
      </div>
    )



}

const msp = (state) => {
  return {
    userObj: state.userObj
  }
}




export default connect(msp)(UserProfile)