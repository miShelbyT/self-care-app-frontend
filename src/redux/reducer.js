import { combineReducers } from 'redux'
import { GET_ACTIVITIES, GET_AFFIRMATION, GET_JOURNAL_ENTRIES, POST_NEW_JOURNAL_ENTRY, LOG_IN, SIGN_UP, LOG_OUT, DELETE_ENTRY, UPDATE_JOURNAL_OBJ, UPDATE_USER, DELETE_USER } from './actionTypes'


const defaultState = {
  activities: [],
  journalEntries: [],
  affirmation: "",
  userId: null,
  userObj: null

}

function activitiesReducer(currentState = defaultState.activities, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.payload
    default:
      return currentState
  }
}

function affirmationReducer(currentState = defaultState.affirmation, action) {
  switch (action.type) {
    case GET_AFFIRMATION:
      return action.payload
    default:
      return currentState
  }
}
// need to fix updating state in UPDATE - replacing the one index wipes out the join table and activity data
function journalReducer(currentState = defaultState.journalEntries, action) {
  switch (action.type) {
    case GET_JOURNAL_ENTRIES:
      // console.log(action.payload)
      return action.payload
    case POST_NEW_JOURNAL_ENTRY:
      return [...currentState, action.payload]
    case UPDATE_JOURNAL_OBJ:
      let newArray = [...currentState]
      // console.log(newArray)
      let journalindex = newArray.findIndex(entry => entry.id === action.payload.id)
      newArray[journalindex].date = action.payload.date
      newArray[journalindex]["length_of_time"] = action.payload["length_of_time"]
      newArray[journalindex].comments = action.payload.comments
      // console.log(newArray)
      return newArray
    case DELETE_ENTRY:
      return currentState.filter(journalEntry => journalEntry.id !== action.payload)
    default:
      return currentState
  }
}


function userIdReducer(currentState = defaultState.userId, action) {
  switch (action.type) {
    case LOG_IN:
      return action.payload.id
    case SIGN_UP:
      return action.payload.id
    case LOG_OUT:
      return null
    case DELETE_USER:
      return null
    default:
      return currentState
  }
}

function userObjReducer(currentState = defaultState.userObj, action) {
  switch (action.type) {
    case LOG_IN:
      return action.payload
    case SIGN_UP:
      return action.payload
    case LOG_OUT:
      return null
    case UPDATE_USER:
      return action.payload
    case DELETE_USER:
      return null
    default:
      return currentState
  }
}


const rootReducer = combineReducers({
  activities: activitiesReducer,
  affirmation: affirmationReducer,
  journalEntries: journalReducer,
  userId: userIdReducer,
  userObj: userObjReducer
})

export default rootReducer