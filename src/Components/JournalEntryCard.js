import React from 'react'

function JournalEntryCard(props) {

  function changeDate(str) {
    let updatedDate = new Date (str.split('-'))
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return updatedDate.toLocaleDateString('en-US', options)
  }

  return (
    <div className="journal-card">
      <h3>{props.journal["user_activity"].activity.name}</h3>
      <h4>{changeDate(props.journal.date)}</h4>
      <h4>{props.journal["length_of_time"]} minutes</h4>
      <p>{props.journal.comments}</p>

    </div>
  )
}

export default JournalEntryCard