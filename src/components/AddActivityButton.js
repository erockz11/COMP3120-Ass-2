import React from 'react'

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