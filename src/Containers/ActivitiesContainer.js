import React from 'react'
import ActivityCard from '../Components/ActivityCard'
import { connect } from 'react-redux'
import { getActivities } from '../redux/actions'

class ActivitiesContainer extends React.Component {

  componentDidMount = () => {
    this.props.getActivities()
  }

  renderActivities = () => {
    return this.props.activities.map(activityObj => <ActivityCard key={activityObj.id} activity={activityObj} />)
  }
  render() {
    // console.log(this.props.activities)
    return (
      <div>
        <h2>Examples of Self Care Activities:</h2>
        <div className="container" >
          {this.props.activities.length > 0 ?
            this.renderActivities() : <h1>Loading....</h1>}
        </div>

      </div>
    )
  }

}

const mdp = (dispatch) => {
  return {
    getActivities: () => dispatch(getActivities())
  }
}

const msp = (state) => {
  return { activities: state.activities }
}

export default connect(msp, mdp)(ActivitiesContainer)