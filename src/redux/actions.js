import { GET_ACTIVITIES, GET_AFFIRMATION, GET_JOURNAL_ENTRIES, GET_USER_PROFILE } from './actionTypes'

export const getActivities = () => {
  return function(dispatch) {
    fetch("http://localhost:3000/api/v1/activities")
    .then(r => r.json())
    .then(activitiesArray => {
      // console.log(activitiesArray)
    dispatch({type: GET_ACTIVITIES, payload: activitiesArray})
    })
    .catch(console.log)
  }
}

export const getAffirmation = () => {
  return async (dispatch) => {
    await fetch("https://dulce-affirmations-api.herokuapp.com/affirmation")
      .then(r => r.json())
      .then(affirmation => {
        // console.log(affirmation[0].phrase)
        dispatch({ type: GET_AFFIRMATION, payload: affirmation[0].phrase })
      })
  }
}

export const getEntries = (userId) => {
  return function(dispatch){
    fetch("http://localhost:3000/api/v1/journal_entries")
    .then(r => r.json())
    .then(journalArray => {
      let myJournalArray = journalArray.filter(journalObj => journalObj["user_id"] === userId)
      dispatch({type: GET_JOURNAL_ENTRIES, payload: myJournalArray})
    })
  }
}

export const getUserProfile = (userId) => {
  return function(dispatch){
    fetch("http://localhost:3000/api/v1/users")
    .then(r => r.json())
    .then(userArray => {
      console.log(userArray)
      let myProfile
      if(userArray.includes(userId)){
        myProfile = userArray
      }
      dispatch({type: GET_USER_PROFILE, payload: myProfile})
    })
  }
}