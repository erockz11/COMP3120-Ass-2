import React from 'react'
import AddActivityButton from './AddActivityButton'

const Activity = ({ activity, loggedIn, user, userActivities, setUserActivities, notificationFn }) => {
    if (activity) {
        return (
            <div>
                { activity.activity }
                <AddActivityButton activity={activity} loggedIn={loggedIn} user={user} userActivities={ userActivities } setUserActivities={ setUserActivities } showNotification={notificationFn}/>
            </div>
        )
    } else {
        return null
    }
}

export default Activity