import React from 'react'
import AddActivityButton from './AddActivityButton'

const Activity = ({ activity, loggedIn, user }) => {
    if (activity) {
        return (
            <div>
                { activity.activity }
                <AddActivityButton activity={activity} loggedIn={loggedIn} user={user}/>
            </div>
        )
    } else {
        return null
    }
}

export default Activity