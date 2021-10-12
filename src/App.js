import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Activity from './components/Activity'
import Leaderboard from './components/Leaderboard'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserDisplay from './components/UserDisplay'
import MyActivities from './components/MyActivities'
import activityService from './services/activities'

const App = () => {

  const [ activity, setActivity ] = useState(null)

  const [ user, setUser ] = useState(null)
  const [ activityType, setActivityType ] = useState('education')
  const [ activityParticipants, setActivityParticipants ] = useState(null)
  const [ activityPrice, setActivityPrice ] = useState(1.0)

  //function that returns a random activity from the API
  const findRandom = (event) => {
    event.preventDefault()
    console.log("getting activity..."); //add some frontend notification here
    activityService
     .getRandom()
     .then(data => {
       setActivity(data)
     })
  }

  //function that returns an activity with the specified type (category)
  const findActivityByType = (event) => {
    event.preventDefault()
    console.log("getting activity..."); //add some frontend notification here
    activityService
     .getType(activityType)
     .then(data => {
       setActivity(data)
     })
  }

  //function that reutns an activity with the specified number of participants
  const findActivityByParticipants = (event) => {
    event.preventDefault()
    if (activityParticipants) { //a value has been selected in the form
      console.log("getting activity..."); //add some frontend notification here
      activityService
      .getParticipants(activityParticipants)
      .then(data => {
        setActivity(data)
     })
    } else {
      console.log("no participant value selected");
      //display notification to select an option in the form
      alert("Please select number of participants.")
    }
  }

  //function that returns an activity with the specified price
  //note the API currently doesn't have anything with price = 1.0
  const findActivityByPrice = (event) => {
    event.preventDefault()
    console.log("getting activity..."); //add some frontend notification here
    activityService
     .getPrice(activityPrice)
     .then(data => {
       setActivity(data)
     })
  }

  //function that logs in a user
  const userLogin = (event) => {
    event.preventDefault()
    console.log("logging in user")
    setUser("Test User")
  }

  //function that logs out a user
  const userLogout = () => {
    console.log("logging out")
    setUser(null)
  }

  //function that registers a new user
  const userRegister = (event) => {
    event.preventDefault()
    console.log("Registering a new user")
  }

  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/my">My Activities</Link>
        <Link to="/login">Log In/Register</Link>
      </div>

      <div>
        <UserDisplay user={user} logoutFn={userLogout} />
      </div>

      <Switch>
    
        <Route path="/leaderboard">
          <Leaderboard/>
        </Route>

        <Route path="/my">
          <MyActivities/>
        </Route>

        <Route path="/login">
          <LoginForm loginFn={userLogin} />
          <RegisterForm registerFn={userRegister} />
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
                1<input type="radio" name="participants" value="1" onChange={(e) => setActivityParticipants(e.target.value)} />
                2<input type="radio" name="participants" value="2" onChange={(e) => setActivityParticipants(e.target.value)} />
                3<input type="radio" name="participants" value="3" onChange={(e) => setActivityParticipants(e.target.value)} />
                4<input type="radio" name="participants" value="4" onChange={(e) => setActivityParticipants(e.target.value)} />
                5<input type="radio" name="participants" value="5" onChange={(e) => setActivityParticipants(e.target.value)} />
              </fieldset>

              {/* API uses [0.0 - 1.0] */}
              <fieldset>
                <label htmlFor="price">Price Range</label> <br />
                <input type="range" name="price" min="0.0" max="1.0" step="0.1" onChange={(e) => setActivityPrice(e.target.value)} />
              </fieldset>

              <button onClick={ findActivityByType }>Show me an activity (by type)</button>
              <button onClick={ findActivityByParticipants }>Show me an activity (by participants)</button>
              <button onClick={ findActivityByPrice }>Show me an activity (by price)</button>
              <button onClick={ findRandom }>Show me a random activity</button>
            </form>

            <h2>You should try:</h2>
            <Activity activity={ activity } />
          </div>
        </Route>

      </Switch>
    </Router>
  )
}

export default App;
