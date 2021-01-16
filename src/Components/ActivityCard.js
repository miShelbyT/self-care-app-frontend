import React from 'react'



function ActivityCard(props) {

  return (
    <div className="activity-div">
      <h3>{props.activity.name}</h3>
      <h5>{props.activity.category}</h5>
      <p>{props.activity.benefits}</p>
    </div>
    
  )

}



export default ActivityCard