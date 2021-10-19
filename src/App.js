import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Activity from './components/Activity'
import Leaderboard from './components/Leaderboard'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserDisplay from './components/UserDisplay'
import MyActivities from './components/MyActivities'
import Notification from './components/Notification'
import service from './services/services'

const App = () => {

  const [ activity, setActivity ] = useState(null)
  const [ user, setUser ] = useState({
    "username": "",
    "password": ""
  })
  const [ newUser, setNewUser ] = useState({
    "username": "",
    "password": ""
  })
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ activityType, setActivityType ] = useState('education')
  const [ activityParticipants, setActivityParticipants ] = useState(null)
  const [ activityPrice, setActivityPrice ] = useState(1.0)
  const [ userActivities, setUserActivities ] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState(null)
  const [ leaderboard, setLeaderboard ] = useState(null)

  useEffect(() => {
    console.log('effect')

    service.getAllScores()
      .then(data => {
        console.log('promise fulfilled: ', data)
        setLeaderboard(data)
      })
      .catch(err => {
        showNotification("Error getting data from server.", "error", true)
      })
  }, [])

  //function that returns a random activity from the API
  const findRandom = (event) => {
    event.preventDefault()
    showNotification("Getting activity...", "notice", false)

    service.getRandom()
      .then(data => {
        setActivity(data)
        clearNotification()
      })
  }

  //function that returns an activity with the specified type (category)
  const findActivityByType = (event) => {
    event.preventDefault()
    showNotification("Getting activity...", "notice", false)

    service.getType(activityType)
      .then(data => {
        setActivity(data)
        clearNotification()
      })
  }

  //function that returns an activity with the specified number of participants
  const findActivityByParticipants = (event) => {
    event.preventDefault()
    if (activityParticipants) { //a value has been selected in the form
      showNotification("Getting activity...", "notice", false)

      service.getParticipants(activityParticipants)
        .then(data => {
          clearNotification()
          setActivity(data)
        })
    } else {
      console.log("no participant value selected");
      //display notification to select an option in the form
      // alert("Please select number of participants.")
      showNotification("Please select number of participants.", "error", true)
    }
  }

  //function that returns an activity within the specified price range
  //note the API currently doesn't have anything with price = 1.0
  const findActivityByPrice = (event) => {
    event.preventDefault()
    showNotification("Getting activity...", "notice", false)

    service.getPrice(activityPrice)
      .then(data => {
        setActivity(data)
        clearNotification()
      })
  }

  //function that adds the given activity to the list of logged in user's activities
  const addActivity = (activity) => {
    if(userActivities.find(a => a.activity === activity.activity)) {
      showNotification(`The activity "${activity.activity}" already exists in My Activities`, "notice", true)
    } else {
        service
        .addActivity(activity, user)
        .then(data => {
            console.log("success", data);
            let updateUserActivities = userActivities
            updateUserActivities.push(data)
            setUserActivities(updateUserActivities)
            showNotification(`Successfully saved the activity "${activity.activity}" to My Activities`, "success", true)
        })
    }
  }

  //function that marks a user's activity as completed and adds a score for it
  const completeActivity = (activity) => {
    service.completeActivity(activity)
      .then(data => {
        setUserActivities(userActivities.filter(a => a.id !== activity.id))
        service.getAllScores()
          .then(data => {
          console.log('promise fulfilled: ', data)
          setLeaderboard(data)
        })
        showNotification(`Successfully marked "${activity.activity} as completed. You now have ${data.score} points.`, "success", true)
      })
      .catch(error => {
        showNotification(`An error has occurred: ${error}`, "error", true)
      })
  }

  //function that logs in a user
  const userLogin = (event) => {
    event.preventDefault()
    console.log("logging in user")

    service.login(user)
    .then(data => {
      console.log("success:", data)
      setLoggedIn(true)
      setUser(data)
      showNotification(`Successfully logged in as ${user.username}`, "success", true)
    })
    .catch(error => {
      console.log("error: ", error)
      // alert("Wrong username or password.")
      showNotification("Wrong username or password.", "error", true)
    })

    //once the user has logged in, get their saved activities
    service.getActivities(user)
    .then(data => {
      setUserActivities(data)
    })
  }

  //function that logs out a user
  const userLogout = () => {
    console.log("logging out")
    setLoggedIn(false)
    setUser({
      "username": "",
      "password": ""
    })
    showNotification("Succesfully logged out.", "success", true)
  }


  //function that displays a notification and hides it after five seconds if `timeout` is true
  const showNotification = (message, type, timeout) => {
    setNotificationMessage(message)
    setNotificationType(type)
    if (timeout) {
      setTimeout(() => {
        clearNotification()
    }, 5000)
    } 
  }

  //function that hides the notification
  const clearNotification = () => {
    setNotificationMessage(null) //reset message and type to hide the notification
    setNotificationType(null)
  }

  return (
    <div>
      <Router>
      <div>
        <Link to="/" style={{ textDecoration: 'none', padding: '10px', float: 'left' }}> Home</Link>
        <Link to="/leaderboard" style={{ textDecoration: 'none', padding: '10px', float: 'left' }}>Leaderboard</Link>
        <Link to="/my" style={{ textDecoration: 'none', padding: '10px', float: 'left' }}>My Activities</Link>
        <Link to="/login" style={{ textDecoration: 'none', padding: '10px', float: 'left' }}>Log In/Register</Link>
      </div>

      <div>
        <UserDisplay user={user} loggedIn={loggedIn} logoutFn={userLogout}  />
      </div>

      <Switch>

        <Route path="/leaderboard">
          <Leaderboard leaderboard={leaderboard}/>
        </Route>

        <Route path="/my">
          <MyActivities loggedIn={loggedIn} userActivities={userActivities} completeActivity={completeActivity} />
        </Route>

        <Route path="/login">
          <LoginForm loginFn={userLogin} setUserFn={setUser} user={user} loggedIn={loggedIn} />
          <RegisterForm setLoggedIn={setLoggedIn} newUser={newUser} setNewUser={setNewUser} setUser={setUser} setUserActivities={setUserActivities} loggedIn={loggedIn} />
        </Route>

        <Route path="/">
          <div>
            <h1>Bored?</h1>
            <h2>Find something to do:</h2>

            <form>
              <fieldset>
                <label htmlFor="type">Type</label> <br />
                <select onChange={(e) => setActivityType(e.target.value)} name="type">
                  <option value="education">Education</option>
                  <option value="recreational">Recreational</option>
                  <option value="social">Social</option>
                  <option value="DIY">DIY</option>
                  <option value="charity">Charity</option>
                  <option value="cooking">Cooking</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="music">Music</option>
                  <option value="busywork">Busywork</option>
                </select>
              </fieldset>

              {/* activities.json from API currently doesn't have any activities with more than 5 participants */}
              {/* change this implementation? */}
              <fieldset>
                <label htmlFor="participants">Participants</label> <br />
                1<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="1" onChange={(e) => setActivityParticipants(e.target.value)} />
                2<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="2" onChange={(e) => setActivityParticipants(e.target.value)} />
                3<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="3" onChange={(e) => setActivityParticipants(e.target.value)} />
                4<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="4" onChange={(e) => setActivityParticipants(e.target.value)} />
                5<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="5" onChange={(e) => setActivityParticipants(e.target.value)} />
              </fieldset>

              {/* API uses [0.0 - 1.0] */}
              <fieldset>
                <label htmlFor="price">Price Range</label> <br />
                <input type="range" name="price" min="0.0" max="1.0" step="0.1" onChange={(e) => setActivityPrice(e.target.value)} />
              </fieldset>

              <button className="button-primary" onClick={ findActivityByType } style={{marginRight: '10px'}}>Show me an activity (by type)</button>
              <button className="button-primary" onClick={ findActivityByParticipants } style={{marginRight: '10px'}}>Show me an activity (by participants)</button>
              <button className="button-primary" onClick={ findActivityByPrice } style={{marginRight: '10px'}}>Show me an activity (by price)</button>
              <button className="button-primary" onClick={ findRandom } style={{marginRight: '10px'}}>Show me a random activity</button>
            </form>

            <h2>You should try:</h2>
            <Activity activity={ activity } loggedIn={ loggedIn } addActivity={ addActivity } />
          </div>
        </Route>

      </Switch>
    </Router>

      <Notification message={notificationMessage} type={notificationType} />
    </div>
  )
}

export default App;
