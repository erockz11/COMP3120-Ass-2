import React from 'react'

const MyActivities = ({userLogin}) => {

    if(userLogin) {
        return (
            <div>
                <h1>My Activites</h1>
                <p>Learn Express.js</p>
                <p>Bake something you've never tried before</p>
                <p>Learn how to play a new sport</p>
                <p>Text a friend you haven't talked to in a long time</p>
                <p>Meditate for five minutes</p>
                <p>Learn to play a new instrument</p>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Not Logged In</h3>
            </div>
        )
    }

}

export default MyActivities
