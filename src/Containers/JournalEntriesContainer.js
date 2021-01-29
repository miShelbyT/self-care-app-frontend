import React from 'react'
import Affirmations from '../Components/Affirmations'
import JournalEntryCard from '../Components/JournalEntryCard'
import { connect } from 'react-redux'
import { getEntries, getAffirmation } from '../redux/actions'
import { Redirect } from 'react-router-dom'


class JournalEntriesContainer extends React.Component {


  state = {
    searchTerm: ""
  }

  componentDidMount() {
    this.props.getAffirmation()
    if (this.props.user) {
      this.props.getJournalEntries(this.props.user.id)
    }
    // }
  }

  renderJournalEntries() {
    return this.filterEntriesByDate().map(journalObj => < JournalEntryCard journal={journalObj} key={journalObj.id} />)
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })

  }

  changeDate(str) {
    let updatedDate = new Date(str.split('-'))
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return updatedDate.toLocaleDateString('en-US', options)
  }



  filterEntriesByDate = () => {
    return this.props.journalEntries.filter(entry => this.changeDate(entry.date).toLowerCase().includes(this.state.searchTerm.toLowerCase()))

  }


  // tried to filter entries by name but optional join table caused so many null values that it was too hard for this time frame... maybe i'll do it in Mod 6!!

  // filterEntries = () => {
 
  //   let finalArray = []
  //   // first iterating thru for activity_name from join table db
  //   let filteredArray = this.props.journalEntries.filter(entry => entry.user_activity.activity_name)
 
  //   if (filteredArray.length > 0) {
  //     finalArray = filteredArray.filter(entry => entry.user_activity.activity_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  //     console.log(finalArray)
  //     return finalArray
  //   }
  //   if (finalArray.length === 0) {
  //     // then iterating thru for activity.name from activity db
  //     let filteredArray = this.props.journalEntries.filter(entry => entry.user_activity.activity)
  //     let finalArray = filteredArray.filter(entry => entry.user_activity.activity.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  //     console.log(finalArray)
  //     return finalArray
  //   }
  // }


  render() {

    return (
      <>

        {this.props.user ?

          <>

            {this.props.user.id && this.props.journalEntries.length > 0 ?
              <div className="journal-entries">
                <Affirmations />
                <h1>My Journal Entries:</h1>
                <div>
                  <form className="form filter">
                    <label>Search Activity By Date:</label>
                    <input type="text"
                      name="searchTerm"
                      value={this.state.searchTerm}
                      onChange={this.onChange}
                    ></input>
                  </form>
                </div>
                <div className="container" >
                  {this.renderJournalEntries()}
                </div>
              </div> :
              <>
                <div className="journal-entries">
                  <Affirmations />
                  <h1>You do not have any journal entries (yet)....</h1>
                </div>
              </>

            }
          </>

          :

          <Redirect to="/welcome" />

        }

      </>


    )

  }
}

const msp = (state) => {
  return {
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