import React from 'react'
import service from '../services/services'

const AddActivityButton = ({ activity, loggedIn, user, userActivities, setUserActivities, showNotification }) => {

    const addActivity = () => {
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

    if (loggedIn) {
        return (
            <button style={{fontWeight: 'bold'}} onClick={addActivity}>Add to My Activities</button>
        )
    } else {
        return (
            <div style={{fontSize: '10px'}}>
                Log in to save this activity
            </div>
        )
    }
}

export default AddActivityButton