import React from 'react'
import LogIn from './LogIn'
import SignUp from './SignUp'

function Welcome() {


  return (
    <div>
      <div>
        <div>
          <LogIn />
          <SignUp />
        </div>
      </div>
      <img src="https://i.imgur.com/7gmGaC7.png" alt="yin yang" className="logos" />
      <img src="https://i.imgur.com/16T94A7.png" alt="meditation altar rocks" className="logos" />
      <img src="https://i.imgur.com/iF1TZHA.png" alt="Sanskrit Om" className="logos" />

    </div>

  )
}

export default Welcome