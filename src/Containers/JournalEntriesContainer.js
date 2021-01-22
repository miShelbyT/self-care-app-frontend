import React from 'react'
import Affirmations from '../Components/Affirmations'
import JournalEntryCard from '../Components/JournalEntryCard'
import { connect } from 'react-redux'
import { getEntries, getAffirmation } from '../redux/actions'


class JournalEntriesContainer extends React.Component {

  
  componentDidMount() {
    this.props.getAffirmation()
    if (this.props.userId) {
      this.props.getJournalEntries(this.props.userId)
    } else {
      let user = localStorage["USER_DATA"]
      let parsedUser = JSON.parse(user)
      this.props.getJournalEntries(parsedUser.id)
    }
  }

  renderJournalEntries = () => {
    return this.props.journalEntries.map(journalObj => < JournalEntryCard journal={journalObj} key={journalObj.id} />)
  }


  render() {
    // console.log(this.props.journalEntries)
    // console.log(this.props.userId)
    return (
      <div className="journal-entries">
        <Affirmations />
        <h1>My Self-Care Activities:</h1>
        <div className="container" >
          {this.props.journalEntries.length > 0 ?
            this.renderJournalEntries() : <h3>Oops. You Don't Have Any Entries Yet!</h3>}          
        </div>
      </div>

    )

  }
}

const msp = (state) => {
  return {
    userId: state.userId,
    journalEntries: state.journalEntries
  }
}

const mdp = (dispatch) => {
  return {
    getJournalEntries: (userId) => (dispatch(getEntries(userId))),
    getAffirmation: () => dispatch(getAffirmation())
  }
}

export default connect(msp, mdp)(JournalEntriesContainer)