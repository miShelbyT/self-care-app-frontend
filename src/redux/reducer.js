import { combineReducers } from 'redux'
import { GET_ACTIVITIES, GET_AFFIRMATION, GET_JOURNAL_ENTRIES, POST_NEW_JOURNAL_ENTRY, LOG_IN, SIGN_UP, LOG_OUT, DELETE_ENTRY, UPDATE_JOURNAL_OBJ } from './actionTypes'


const defaultState = {
  activities: [],
  journalEntries: [],
  affirmation: "",
  userId: null,
  userObj: {}

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

function journalReducer(currentState = defaultState.journalEntries, action) {
  switch (action.type) {
    case GET_JOURNAL_ENTRIES:
      // console.log(action.payload)
      return action.payload
    case POST_NEW_JOURNAL_ENTRY:
      return [...currentState, action.payload]
    case UPDATE_JOURNAL_OBJ:
      let newArray = [...currentState]
      let journalindex = newArray.findIndex(entry => entry.id === action.payload.id)
      newArray[journalindex] = action.payload
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