import React from 'react'

const MyActivities = ({loggedIn, userActivities, completeActivity, deleteActivity}) => {

    if(loggedIn) {
        return (
            <div>
                <h1>My Activities</h1>
                <ul style={{listStyleType: 'none'}}>
                    {userActivities.map(activity =>
                        <li key={activity.id}>
                            {activity.activity} <button onClick={() => completeActivity(activity)}>Complete Activity</button> 
                            <button style={{borderColor: '#ff0000'}}onClick={() => deleteActivity(activity)}>Delete Activity</button>
                        </li>)}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <h3 style={{padding: '300px'}} >Not Logged In</h3>
            </div>
        )
    }

}

export default MyActivities
