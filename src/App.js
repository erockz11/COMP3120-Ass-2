import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Activity from './components/Activity'
import Leaderboard from './components/Leaderboard'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserDisplay from './components/UserDisplay'
import MyActivities from './components/MyActivities'

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

  const findRandom = (event) => {
    event.preventDefault()
    setActivity(getRandom())
  }

  const findActivity = (event) => {
    event.preventDefault()
    console.log("activity form submitted")
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
                <select name="type">
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
                Any<input type="checkbox" name="participants" value="participants_any" />
                1<input type="checkbox" name="participants" value="participants_1" />
                2<input type="checkbox" name="participants" value="participants_2" />
                3<input type="checkbox" name="participants" value="participants_3" />
                4<input type="checkbox" name="participants" value="participants_4" />
                5<input type="checkbox" name="participants" value="participants_5" />
              </fieldset>

              {/* API uses [0.0 - 1.0] */}
              <fieldset>
                <label htmlFor="price">Price</label> <br />
                <input type="range" name="price" min="0" max="10" />
              </fieldset>

              <button onClick={ findActivity }>Show me an activity</button>
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
