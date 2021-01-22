import React from 'react'



function ActivityCard(props) {
  return (
    <div className="activity-card">
      <h3>{props.activity.name}</h3>
      <h5>{props.activity.category}</h5>
      <p>{props.activity.benefits}</p>
      <p>For more information about the benefits of {props.activity.name} go <a href={props.activity.url} >here</a></p>
    </div>
    
  )

}



export default ActivityCard