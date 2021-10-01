import React from 'react'

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

  const findActivity = (event) => {
    event.preventDefault()
    console.log("activity form submitted")
  }

  return (
    <div>
      <h1>Bored?</h1>
      <h2>Find something to do:</h2>

      <form onSubmit={ findActivity }>
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

        <fieldset>
          <label htmlFor="price">Price</label> <br />
          <input type="range" name="price" min="0" max="100" step="10" />
        </fieldset>

        <button type="submit">Show me an activity</button>
      </form>
    </div>
  )
}

export default App;
