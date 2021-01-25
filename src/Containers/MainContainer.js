import React from 'react'

import Welcome from '../Components/Welcome'
import ActivitiesContainer from '../Containers/ActivitiesContainer'

import JournalEntriesContainer from '../Containers/JournalEntriesContainer'
import JournalEntryForm from '../Components/JournalEntryForm'
import UserProfile from '../Components/UserProfile'
import MenuOverlay from '../Components/MenuOverlay'

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'




function MainContainer(props) {


  return (
    <div className="parent">
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/menu" render={() => <MenuOverlay user={props.user} />} />
        <Route path="/journal-entries" render={() => <JournalEntriesContainer user={props.user} />} />
        <Route path="/activities" render={() => <ActivitiesContainer user={props.user} />} />
        <Route path="/journal-new" render={() => <JournalEntryForm user={props.user} />} />
        <Route path="/user" render={() => <UserProfile user={props.user} />} />
      </Switch>
    </div>
  )
}

const msp = (state) => {
  return {
    user: state.userObj
  }
}




export default connect(msp)(MainContainer)