import React from 'react'
import service from '../services/services'

const AddActivityButton = ({ activity, loggedIn, user }) => {

    const addActivity = () => {
        service
         .addActivity(activity, user)
         .then(data => {
             console.log("success", data);
         })
    }

    if (loggedIn) {
        return (
            <button onClick={addActivity}>Add to My Activities</button>
        )
    } else {
        return (
            <div>
                Log in to save this activity
            </div>
        )
    }
}

export default AddActivityButton