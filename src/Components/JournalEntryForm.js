import React from 'react'
import { connect } from 'react-redux'

class JournalEntryForm extends React.Component {

  state = {
    activity: "",
    date: "",
    length_of_time: "",
    comments: "",
    beenClicked: false

  }

  // renderActivityNames = () => {
  //   let activitiesArray = []
  //   let i
  //   for (i = 0; i < this.props.activities.length; i++) {
  //     activitiesArray.push(this.props.activities[i].name)
  //   }
  //   // console.log(activitiesArray)
  //   return activitiesArray
  // }

  // renderSelectFields = () => {
  //   return this.renderActivityNames().forEach(activity => <option>{activity}</option>)
  // }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    // this.props.addActivity()
    // .then(() => this.props.addEntry())
    // this.setState({
    //   activity: "",
    //   date: "",
    //   length_of_time: "",
    //   comments: "",
    //   beenClicked: false
    // })
  }

  clickHandler = () => {
    this.setState({ beenClicked: !this.state.beenClicked })
  }

  render() {
    return (
      <div className="form">
        <h1>New Journal Entry:</h1>
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
                  value="hiking">Hiking
                </option>
                <option
                  value="spinning">Spinning or Cycling
                </option>
                <option
                  value="running">Running
                </option>
                <option
                  value="meditation">Meditation
                </option>
                <option
                  value="sleep">Sleep
                </option>
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
          <button>Submit Journal Entry</button>
        </form>

      </div>


    )


  }

}

const msp = (state) => {
  return { activities: state.activities }
}

export default connect(msp)(JournalEntryForm)