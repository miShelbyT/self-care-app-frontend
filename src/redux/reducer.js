import { combineReducers } from 'redux'
import { GET_ACTIVITIES, GET_AFFIRMATION, GET_JOURNAL_ENTRIES, GET_USER_PROFILE } from './actionTypes'


const defaultState = {
  activities: [],
  journalEntries: [],
  affirmation: "",
  userId: 1,
  user: {
    "id": 1,
    "name": "Shelby",
    "city": "NYC",
    "email_address": "shelby@shel.com"}
}

function activitiesReducer(currentState = defaultState.activities, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.payload
    default:
      return currentState
  }
}

function affirmationReducer(currentState = defaultState.affirmation, action){
  switch (action.type) {
    case GET_AFFIRMATION:
      return action.payload
      default:
        return currentState
  }
}

function journalReducer(currentState = defaultState.journalEntries, action){
  switch(action.type){
    case GET_JOURNAL_ENTRIES:
      return action.payload
      default:
        return currentState
  }
}

function userIdReducer(currentState = defaultState.userId, action){
  switch(action.type){
    default:
      return currentState
  }
}

function userReducer(currentState = defaultState.user, action){
  switch(action.type){
    case GET_USER_PROFILE:
      return action.payload
    default:
      return currentState
  }
}


const rootReducer = combineReducers({
  activities: activitiesReducer,
  affirmation: affirmationReducer,
  journalEntries: journalReducer,
  userId: userIdReducer,
  user: userReducer
})

export default rootReducer