import React from 'react'
import AddActivityButton from './AddActivityButton'

const Activity = ({ activity, loggedIn, addActivity }) => {
    if (activity) {
        return (
            <div>
                { activity.activity }
                <AddActivityButton activity={activity} loggedIn={loggedIn} addActivity={ addActivity }/>
            </div>
        )
    } else {
        return null
    }
}

export default Activity