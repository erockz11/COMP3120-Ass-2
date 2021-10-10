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

  // load a few activities from https://github.com/drewthoennes/Bored-API/blob/master/db/activities.json for now
  // just to use for the placeholder UI until we implement requests to the proper API
  const activities = [
    {
      activity: "Learn Express.js",
      availability: 0.25,
      type: "education",
      participants: 1,
      price: 0.1,
      accessibility: "Few to no challenges",
      duration: "hours",
      kidFriendly: true,
      link: "https://expressjs.com/",
      key: "3943506"
    },
    {
      activity: "Bake something you've never tried before",
      availability: 0.3,
      type: "cooking",
      participants: 1,
      price: 0.4,
      accessibility: "Minor challenges",
      duration: "hours",
      kidFriendly: true,
      link: "",
      key: "5665663"
    },
    {
      activity: "Learn how to play a new sport",
      availability: 0.2,
      type: "recreational",
      participants: 1,
      price: 0.1,
      accessibility: "Minor challenges",
      duration: "minutes",
      kidFriendly: true,
      link: "",
      key: "5808228"
    },
    {
      activity: "Text a friend you haven't talked to in a long time",
      availability: 0.2,
      type: "social",
      participants: 2,
      price: 0.05,
      accessibility: "Few to no challenges",
      duration: "minutes",
      kidFriendly: true,
      link: "",
      key: "6081071"
    },
    {
      activity: "Meditate for five minutes",
      availability: 0.05,
      type: "relaxation",
      participants: 1,
      price: 0,
      accessibility: "Few to no challenges",
      duration: "minutes",
      kidFriendly: true,
      link: "",
      key: "3699502"
    },
    {
      activity: "Learn to play a new instrument",
      availability: 0.6,
      type: "music",
      participants: 1,
      price: 0.55,
      accessibility: "Major challenges",
      duration: "hours",
      kidFriendly: true,
      link: "",
      key: "3192099"
    }
  ]

  const getRandom = () => {
    return activities[Math.floor(Math.random() * activities.length)]
  }

  const [ activity, setActivity ] = useState(getRandom())

  const [ user, setUser ] = useState(null)
  const [ activityType, setActivityType ] = useState('education')
  const [ activityParticipants, setActivityParticipants ] = useState(null)

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

  const handleActivityTypeChange = (e) => {
    setActivityType(e.target.value)
  }

  const handleActivityParticipantsChange = (e) => {
    setActivityParticipants(e.target.value)
  }

  //function that returns an activity matching the parameters chosen in the frontend form
  const findActivityByType = (event) => {
    event.preventDefault()
    console.log("getting activity..."); //add some frontend notification here
    activityService
     .getType(activityType)
     .then(data => {
       setActivity(data)
     })
  }

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
    }
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
                <select onChange={handleActivityTypeChange} name="type">
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
                1<input type="radio" name="participants" value="1" onChange={handleActivityParticipantsChange} />
                2<input type="radio" name="participants" value="2" onChange={handleActivityParticipantsChange} />
                3<input type="radio" name="participants" value="3" onChange={handleActivityParticipantsChange} />
                4<input type="radio" name="participants" value="4" onChange={handleActivityParticipantsChange} />
                5<input type="radio" name="participants" value="5" onChange={handleActivityParticipantsChange} />
              </fieldset>

              {/* API uses [0.0 - 1.0] */}
              <fieldset>
                <label htmlFor="price">Price</label> <br />
                <input type="range" name="price" min="0" max="10" />
              </fieldset>

              <button onClick={ findActivityByType }>Show me an activity (by type)</button>
              <button onClick={ findActivityByParticipants }>Show me an activity (by participants)</button>
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
