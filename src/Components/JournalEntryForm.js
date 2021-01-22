import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import { postUserActivityAndJournalEntry, getEntries, getActivities } from '../redux/actions'

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
    // if (this.props.journalEntries["user_activity"]["activity_name"]){
    //   let i
    //   for (i = 0; i < this.props.journalEntries["user_activity"]["activity_name"].length; i++) {
    //     activitiesArray.push(this.props.journalEntries["user_activity"][i].activity_name)
    // } 
      return activitiesArray
    // }
    // console.log(activitiesArray)
  }

  renderSelectFields = () => {
    return this.renderActivityNames().map(activity => <option key={activity} value={activity}>{activity}</option>)
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }

  // first had to send POST to user_activities, return user_activity_id to add to new journal entry POST
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
    // console.log(activityObj)
    
    let newJournalEntryObj = {
      user_id: this.props.userId,
      user_activity_id: "",
      date: this.state.date,
      length_of_time: parseInt(this.state["length_of_time"]),
      comments: this.state.comments
    }
    
    this.props.postUserActivityAndJournalEntry(activityObj, newJournalEntryObj, this.props.history)
// console.log(this.props.userActivityObj.id)
    // this.props.addNewJournalEntry(newJournalEntryObj)


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

  // console.log(this.props.journalEntries)
    return (

      <div className="form">

        {this.props.activities.length > 0 && this.props.journalEntries.length > 0 ? <h4>Hi {this.props.userObj.name}! Please enter your next journal entry here:</h4> : <h4>Hi {this.props.userObj.name}, welcome! Please enter your journal entry here:</h4>}

        <form onSubmit={this.submitHandler}>
          <label>Click Here To Add New Activity: </label>
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

          <label>Length of Time: </label>
          <input
            type="number"
            name="length_of_time"
            placeholder="length of time of activity goes here..."
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
          <button className= "act-button">Submit Journal Entry</button>
        </form>
      </div>
    )
  }
}

const msp = (state) => {
  return {
    activities: state.activities,
    journalEntries: state.journalEntries,
    userActivityObj: state.userActivityObj,
    userId: state.userId,
    userObj: state.userObj
  }
}

const mdp = (dispatch) => {
  return {
    postUserActivityAndJournalEntry: (userActivityObj, newJournalEntryObj, history) => dispatch(postUserActivityAndJournalEntry(userActivityObj, newJournalEntryObj, history)),
    // getJournalEntries: (userId) => dispatch(getEntries(userId)),
    getActivities: () => dispatch(getActivities())
  }
}

export default withRouter(connect(msp, mdp)(JournalEntryForm))