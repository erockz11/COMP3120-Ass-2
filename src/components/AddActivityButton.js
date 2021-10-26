import React from 'react'

//component that displays the button used to add activities to account
//shows "Log in to save this activity" if no one is logged in
const AddActivityButton = ({ activity, loggedIn, addActivity }) => {

    if (loggedIn) {
        return (
            <button style={{fontWeight: 'bold'}} onClick={() => addActivity(activity)}>Add to My Activities</button>
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