import React from 'react'
import Affirmations from '../Components/Affirmations'
import JournalEntryCard from '../Components/JournalEntryCard'
import { connect } from 'react-redux'
import { getEntries } from '../redux/actions'


class JournalEntriesContainer extends React.Component {

  componentDidMount() {
    this.props.getJournalEntries(this.props.userId)
  }

  renderJournalEntries = () => {
    return this.props.journalEntries.map(journalObj => < JournalEntryCard journal={journalObj} key={journalObj.id} />)
  }



  render() {
    // console.log(this.props.journalEntries)

    return (
      <div className="journal-entries">
        <Affirmations />
        <h1>My Self-Care Activities:</h1>
        {this.renderJournalEntries()}


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
    getJournalEntries: (userId) => (dispatch(getEntries(userId)))
  }
}

export default connect(msp, mdp)(JournalEntriesContainer)