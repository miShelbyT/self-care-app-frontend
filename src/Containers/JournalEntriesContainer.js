import React from 'react'
import Affirmations from '../Components/Affirmations'
import JournalEntryCard from '../Components/JournalEntryCard'
import { connect } from 'react-redux'
import { getEntries, getAffirmation } from '../redux/actions'
import { Redirect } from 'react-router-dom'


class JournalEntriesContainer extends React.Component {


  state = {
    dateSearch: "",
    activitySearch: ""
  }

  componentDidMount() {
    this.props.getAffirmation()
    if (this.props.user) {
      this.props.getJournalEntries(this.props.user.id)
    }
  }

  renderJournalEntries() {
    return this.filterEntries().map(journalObj => < JournalEntryCard journal={journalObj} key={journalObj.id} />)
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })

  }

  changeDate(str) {
    let updatedDate = new Date(str.split('-'))
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return updatedDate.toLocaleDateString('en-US', options)
  }



// set up so i can filter by date and also by name during the same search
  filterEntries = () => {
    let filteredArray = []
    let otherFilteredArray = []
    let finalArray = []
    let dateSort = this.props.journalEntries.filter(entry => this.changeDate(entry.date).toLowerCase().includes(this.state.dateSearch.toLowerCase()))
    let i
    for (i = 0; i < dateSort.length; i++) {
      if (dateSort[i].user_activity.activity) {
        // first iterating thru for activity.name from activity db
        filteredArray.push(dateSort[i])
        
        filteredArray = filteredArray.filter(entry => entry.user_activity.activity.name.toLowerCase().includes(this.state.activitySearch.toLowerCase()))
        
      }
      if (dateSort[i].user_activity.activity_name) {
        // then iterating thru for activity_name from user_activity db
        otherFilteredArray.push(dateSort[i])
        
        otherFilteredArray = otherFilteredArray.filter(entry => entry.user_activity.activity_name.toLowerCase().includes(this.state.activitySearch.toLowerCase()))
        
      }
      finalArray = [...filteredArray, ...otherFilteredArray]
    }
    return finalArray
  }





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
                    <label>Filter By Date:</label>
                    <input type="text"
                      name="dateSearch"
                      value={this.state.dateSearch}
                      onChange={this.onChange}
                    ></input>

                    <label>Filter By Activity:</label>
                    <input type="text"
                      name="activitySearch"
                      value={this.state.activitySearch}
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