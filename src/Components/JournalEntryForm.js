import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { postUserActivityAndJournalEntry, getActivities } from '../redux/actions'

class JournalEntryForm extends React.Component {

  state = {
    activity: "",
    date: "",
    length_of_time: "",
    comments: "",
    beenClicked: false

  }

  componentDidMount = () => {
    this.props.getActivities()
    // this.props.getJournalEntries(this.props.userId)
  }

  renderActivityNames = () => {
    let activitiesArray = []
    let i
    for (i = 0; i < this.props.activities.length; i++) {
      activitiesArray.push(this.props.activities[i].name)
    }
    if (this.props.journalEntries.length > 0) {
      // console.log("i have journal entries")
      let j
      for (j = 0; j < this.props.journalEntries.length; j++) {
        activitiesArray.push(this.props.journalEntries[j]["user_activity"].activity_name)
      }
      // filtered out null attribute names
      let truthyActivitiesArray = activitiesArray.filter(activity => activity);
      // console.log(truthyActivitiesArray)
      return truthyActivitiesArray
    }
    else {
      return activitiesArray
    }
  }


  renderSelectFields = () => {
    return this.renderActivityNames().map(activity => <option key={activity} value={activity}>{activity}</option>)
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // first had to send POST to user_activities, return user_activity_id to add to new journal entry POST all of which happens in actions.js
  submitHandler = (e) => {
    e.preventDefault()
    let activityObj;
    let foundActivity = this.props.activities.find(activityEl => activityEl.name.toLowerCase() === this.state.activity.toLowerCase())

    if (foundActivity) {
      activityObj = {
        user_id: this.props.userId,
        activity_id: foundActivity.id
      }
    } else {
      activityObj = {
        user_id: this.props.userId,
        activity_name: this.state.activity
      }
    }

    let newJournalEntryObj = {
      user_id: this.props.userId,
      user_activity_id: "",
      date: this.state.date,
      length_of_time: parseInt(this.state["length_of_time"]),
      comments: this.state.comments
    }
if(this.state.comments !== "") {
  this.props.postUserActivityAndJournalEntry(activityObj, newJournalEntryObj, this.props.history)
  // console.log(this.props.userActivityObj.id)
  // this.props.addNewJournalEntry(newJournalEntryObj)
} else {
  alert("oops there are no comments in your journal entry. please try again.")
}

    this.setState({
      activity: "",
      date: "",
      length_of_time: "",
      comments: ""
    })
  }

  clickHandler = () => {
    this.setState({ beenClicked: !this.state.beenClicked })
  }



  render() {

    // console.log(this.renderActivityNames())
    return (

      <>
        {this.props.user ?

          <div className="form">

            {this.props.activities.length > 0 && this.props.journalEntries.length > 0 ? <h4>Hi {this.props.user.name}! Please enter your next journal entry here:</h4> : <h4>Hi {this.props.user.name}, welcome! Please enter your journal entry here:</h4>}

            <form onSubmit={this.submitHandler}>
              <label className="checkboxlabel">Click Here To Add New Activity: </label>
              <input type="checkbox" id="beenClicked" onClick={this.clickHandler} />
              <br></br><br></br>
              {this.state.beenClicked ?
                <>
                  <label>Enter New Activity: </label>
                  <input
                    type="text"
                    name="activity"
                    value={this.state.activity}
                    placeholder="input new activity"
                    onChange={this.changeHandler} />
                </>
                :
                <>
                  <label>Select Activity: </label>
                  <select
                    name="activity"
                    onChange={this.changeHandler}
                  >
                    <option
                    >Select An Activity
                </option>
                    {this.renderSelectFields()}
                  </select>
                </>
              }


              <br></br><br></br>
              <label>Date of Activity: </label>
              <input
                type="date"
                name="date"
                value={this.state.date}
                placeholder="input date picker"
                onChange={this.changeHandler} />
              <br></br><br></br>

              <label>Length of Time <br></br>(in minutes): </label>
              <input
                type="number"
                name="length_of_time"
                placeholder="ex. 20 (minutes)..."
                value={this.state["length_of_time"]}
                onChange={this.changeHandler} />
              <br></br><br></br>
              <label>Comments: </label>
              <textarea
                name="comments"
                placeholder="comments, empowering thoughts, goals go here..."
                value={this.state.comments}
                onChange={this.changeHandler}
              />
              <br></br><br></br>
              <button className="act-button">Submit Journal Entry</button>
            </form>
          </div>
          :
          <Redirect to='/welcome' />}

      </>

    )
  }
}

const msp = (state) => {
  return {
    activities: state.activities,
    journalEntries: state.journalEntries,
    userActivityObj: state.userActivityObj,
    userId: state.userId
  }
}

const mdp = (dispatch) => {
  return {
    postUserActivityAndJournalEntry: (userActivityObj, newJournalEntryObj, history) => dispatch(postUserActivityAndJournalEntry(userActivityObj, newJournalEntryObj, history)),
    getActivities: () => dispatch(getActivities())
  }
}

export default withRouter(connect(msp, mdp)(JournalEntryForm))