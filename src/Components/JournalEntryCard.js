import React from 'react'
import { connect } from 'react-redux'
import { deleteJournalEntry } from '../redux/actions'
import JournalUpdate from './JournalUpdate'

class JournalEntryCard extends React.Component {

  state = {
    show: false
  }

  changeDate(str) {
    let updatedDate = new Date(str.split('-'))
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return updatedDate.toLocaleDateString('en-US', options)
  }


  showModal = () => {
    this.setState({ show: !this.state.show })
  }

  deleteEntry = () => {
    alert("Are You Sure You Want To Delete This Entry?")
    this.props.deleteHandler(this.props.journal.id)
  }
  render() {
    // console.log(this.props.journal["user_activity"]["activity_name"])
    // console.log(this.props.journal["user_activity"].activity)
    return (
      <>
        <div className="card">
          <div className="card-contents">
            {/* user_activity might have an id that corresponds to an activity.name or user_activity might have an original name which should be user_activity["activity_name"] */}
            <div className="sticky-div">
              {this.props.journal["user_activity"].activity ?
                <>
                  <h3>{this.props.journal["user_activity"].activity.name}</h3>
                  <sup>category: {this.props.journal["user_activity"].activity.category}</sup>
                </> :
                <h3>{this.props.journal["user_activity"]["activity_name"]}</h3>
              }

              <h4>{this.changeDate(this.props.journal.date)}</h4>
              <h4>{this.props.journal["length_of_time"] < 60 ? `${this.props.journal["length_of_time"]} minutes` :

                this.props.journal["length_of_time"] % 60 === 0 ?
                  `${Math.floor(this.props.journal["length_of_time"] / 60)} hours` :
                  `${Math.floor(this.props.journal["length_of_time"] / 60)} hours, ${this.props.journal["length_of_time"] % 60} minutes`}</h4>
            </div>

            <p>{this.props.journal.comments}</p>

          </div>
          <button className="act-button" onClick={this.deleteEntry} >Delete Activity</button>

          <button className="act-button" onClick={this.showModal} >{this.state.show ? "Click To Go Back" : "Update Activity"}</button>

          <JournalUpdate onClose={this.showModal} show={this.state.show} journal={this.props.journal}>{this.props.children}</JournalUpdate>

        </div>
      </>
    )


  }
}

const mdp = (dispatch) => {
  return {
    deleteHandler: (journalId) => dispatch(deleteJournalEntry(journalId))
  }
}

export default connect(null, mdp)(JournalEntryCard)