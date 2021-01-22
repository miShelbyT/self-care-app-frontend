import { GET_ACTIVITIES, GET_AFFIRMATION, GET_JOURNAL_ENTRIES, POST_NEW_JOURNAL_ENTRY, LOG_IN, SIGN_UP, LOG_OUT, DELETE_ENTRY, UPDATE_JOURNAL_OBJ } from './actionTypes'

export const getActivities = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/activities")
      .then(r => r.json())
      .then(activitiesArray => {
        // console.log(activitiesArray)
        dispatch({ type: GET_ACTIVITIES, payload: activitiesArray })
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
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/journal_entries")
      .then(r => r.json())
      .then(journalArray => {
        // console.log(journalArray)
        let myJournalArray = journalArray.filter(journalObj => journalObj["user_id"] === userId)
        dispatch({ type: GET_JOURNAL_ENTRIES, payload: myJournalArray })
      })
  }
}

// need to POST userActivity to get id to msp and pass to Journal Entry for POST
export const postUserActivityAndJournalEntry = (userActivityObj, journalEntryObj, history) => {
  // console.log("join table object being sent", userActivityObj)
  return async (dispatch) => {
    await fetch("http://localhost:3000/api/v1/user_activities", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userActivityObj)
    })
      .then(r => r.json())
      .then(newObj => {
        console.log("join table object returned from fetch", newObj)
        addJournalEntry(journalEntryObj, newObj.id, dispatch, history)
      })

      .catch((error) => {
        console.error('Error:', error);
      });

  }
}

export const addJournalEntry = (journalEntryObj, userActivityId, dispatch, history) => {
  // console.log("journal object being sent", journalEntryObj)
  journalEntryObj["user_activity_id"] = userActivityId
  // console.log(journalEntryObj["user_activity_id"])
  fetch("http://localhost:3000/api/v1/journal_entries", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(journalEntryObj)
  })
    .then(r => r.json())
    .then(returnedObj => {
      // console.log("journal object returned from fetch", returnedObj)
      dispatch({ type: POST_NEW_JOURNAL_ENTRY, payload: returnedObj })
      history.push('/journal-entries')
    })
}

export const updateJournalEntry = (journalId, journalObj) => {
  return function (dispatch) {
    fetch(`http://localhost:3000/api/v1/journal_entries/${journalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(journalObj)
    })
      .then(r => r.json())
      .then(updatedObj => {
        // console.log(updatedObj)
        dispatch({ type: UPDATE_JOURNAL_OBJ, payload: updatedObj })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}


export const deleteJournalEntry = (journalEntryId) => {
  // console.log("journal id", journalEntryId)
  return function (dispatch) {
    fetch(`http://localhost:3000/api/v1/journal_entries/${journalEntryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        // console.log(data)
        dispatch({ type: DELETE_ENTRY, payload: journalEntryId })
      })
      .catch(console.log)
  }
}

//log in action:
export const logIn = (userObj) => {
  return function (dispatch) {
    //BEFORE login fetch, check if the userObj being passed is undefined. 
    //If so, get the user data from local storage IF there is user data in local storage. 
    //If there is no user data in local storage, log in fetch will run. 
    if (userObj === null) {
      const userDataStr = localStorage.getItem("USER_DATA")
      //user data must be parsed back to JSON
      let userDataObj = JSON.parse(userDataStr)
      if (userDataObj) {
        // console.log("user data from local storage", userDataObj)
        //payload will be sent from local storage to reducers
        dispatch({ type: LOG_IN, payload: userDataObj })
      }

    } else {
      //normal log in fetch
      fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application.json"
        },
        body: JSON.stringify(userObj)
      })
        .then(r => r.json())
        .then(data => {
          // console.log(data)
          if (data.id) {
            // console.log("found user", data['name'])
            // console.log("found user object", data)
            //If user was fetched succesfully, user data will be added to local storage
            localStorage.setItem("USER_DATA", JSON.stringify(data))
            dispatch({ type: LOG_IN, payload: data })
          } else {
            console.log("user not found")
            window.alert("Wrong Username or Password Please Try Again")
          }
        })
        .catch(console.log)

    }

  }
}

//sign up action:
export const signUp = (userObj) => {
  //normal create user fetch:
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(userObj)
    })
      .then(r => r.json())
      .then(data => {
        // console.log(data)
        if (!data.id) {
          console.log("user creation failed")
          window.alert("Please Enter a Username and Password")
        } else {
          //this is where the user data gets stored to local storage, only if user creation was succesful. Gets turned from JSON into a string. 
          localStorage.setItem("USER_DATA", JSON.stringify(data))
          dispatch({ type: SIGN_UP, payload: data })
        }
      })
      .catch(console.log)
  }
}

//log out action
export const logOut = () => {
  //remove user data from local storage
  localStorage.removeItem("USER_DATA")
  console.log("user logged out")
  return { type: LOG_OUT }
}
