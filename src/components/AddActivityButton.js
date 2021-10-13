import React from 'react'

const AddActivityButton = ({ loggedIn, user }) => {
    if (loggedIn) {
        return (
            <button onClick={() => console.log("add activity")}>Add to My Activities</button>
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