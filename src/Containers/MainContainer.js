import React from 'react'

import Welcome from '../Components/Welcome'
import ActivitiesContainer from '../Containers/ActivitiesContainer'

import JournalEntriesContainer from '../Containers/JournalEntriesContainer'
import JournalEntryForm from '../Components/JournalEntryForm'
import UserProfile from '../Components/UserProfile'

import { Route, Switch } from 'react-router-dom'



function MainContainer(props){



return (
<div className="main-container">
<Switch>
      <Route path="/welcome" component={Welcome} />
        <Route path="/activities" component={ActivitiesContainer} />
        <Route path="/journal-entries" component={JournalEntriesContainer} />
        <Route path="/journal-new" component={JournalEntryForm} />
        <Route path="/user" render={() => <UserProfile />} />
      </Switch>

</div>
)
}


export default MainContainer