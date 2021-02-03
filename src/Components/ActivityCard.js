import React from 'react'



function ActivityCard(props) {
  return (
    <div className="card activity">
    <div>
      <h3>{props.activity.name}</h3>
      <sup>Category: {props.activity.category}</sup>
      <p>{props.activity.benefits}</p>
      <p>For more information about the benefits of {props.activity.name} go <a href={props.activity.url} >here</a></p>
    </div>
    </div>
    
  )

}



export default ActivityCard