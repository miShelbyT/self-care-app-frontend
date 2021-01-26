import React from 'react'
import { connect } from 'react-redux'
import { updateJournalEntry } from '../redux/actions'

class JournalUpdateForm extends React.Component {

  state = {
    date: this.props.journal.date,
    length_of_time: this.props.journal["length_of_time"],
    comments: this.props.journal.comments,

  }


  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }

  submitHandler = (e) => {
    e.preventDefault()

    let updatedJournalObj = this.state
    // console.log(newJournalEntryObj)
    this.props.updateJournalEntry(this.props.journal.id, updatedJournalObj)

    // this.setState({
    //   date: this.props.journal.date,
    //   length_of_time: this.props.journal["length_of_time"],
    //   comments: this.props.journal.comments
    // })
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e)
  }


  render() {
    if (!this.props.show) {
      return null
    }
    // console.log(this.props.show)
    return (

      <div className="modal-container">
       <div className="modal-content form">{this.props.children}
      
        <form onSubmit={this.submitHandler} >
          <label className="longer-label">Click Here To Update Journal Entry: </label>
          <br></br><br></br>

          <label>Date of Activity: </label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            placeholder="input date picker"
            onChange={this.changeHandler} />
          <br></br><br></br>

          <label>Length of Time: </label>
          <input
            type="number"
            name="length_of_time"
            value={this.state["length_of_time"]}
            onChange={this.changeHandler} />
          <br></br><br></br>

          <label>Comments: </label>
          <textarea
            name="comments"
            value={this.state.comments}
            onChange={this.changeHandler}
          />
          <br></br><br></br>
          <button className="act-button" >Submit Updated Entry</button>
          <button className="act-button" onClick={this.onClose} >Go Back</button>
        </form>
      </div>
      </div>
    )
  }
}





const mdp = (dispatch) => {
  return {
    updateJournalEntry: (journalId, journalObj) => dispatch(updateJournalEntry(journalId, journalObj))
  }
}

export default connect(null, mdp)(JournalUpdateForm)