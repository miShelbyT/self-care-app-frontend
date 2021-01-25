import React from 'react'
import Affirmations from '../Components/Affirmations'
import JournalEntryCard from '../Components/JournalEntryCard'
import { connect } from 'react-redux'
import { getEntries, getAffirmation } from '../redux/actions'
import { Redirect } from 'react-router-dom'


class JournalEntriesContainer extends React.Component {


  state = {
    name: ""
  }

  componentDidMount() {
    this.props.getAffirmation()
    if (this.props.user) {
      this.props.getJournalEntries(this.props.user.id)
    }
    // }
  }

  renderJournalEntries(){
    return this.props.journalEntries.map(journalObj => < JournalEntryCard journal={journalObj} key={journalObj.id} />)
  }


  onChange = (e)=> {
    this.setState({ [e.target.name]: e.target.value })

  }


  

  filterActivityByDate = (a,b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.date) - new Date(a.date);
  }



  render() {
    // console.log(this.renderFilteredEntries())
    // console.log(this.filterActivityByDate())
    return (
      <>

        {this.props.user ?

          <>

            {this.props.user.id && this.props.journalEntries.length > 0 ?
              <div className="journal-entries">
                <Affirmations />
                <h1>My Self-Care Activities:</h1>
                <div>
                  <form className="form" style={{ width: 400 }}>
                    <label>Filter Activity By Name:</label>
                    <input type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    ></input>
                  </form>
                </div>
                <div className="container" >
                  {this.renderJournalEntries()}
                </div>
              </div> : <h1>You do not have any activities (yet)....</h1>

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