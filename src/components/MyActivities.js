import React from 'react'

//component that displays a user's saved activities
//shows "Not Logged In" if no one has logged in
const MyActivities = ({loggedIn, userActivities, completeActivity, deleteActivity}) => {
    let activitiesToComplete = userActivities.filter(activity => activity.completed === false)
    let completedActivities = userActivities.filter(activity => activity.completed === true)

    if(loggedIn) {
        return (
            <div>
                <h1>My Activities</h1>
                <ul style={{listStyleType: 'none'}}>
                    {activitiesToComplete.map(activity =>
                        <li key={activity.id}>
                            {activity.activity} <button onClick={() => completeActivity(activity)}>Complete Activity</button> 
                            <button style={{borderColor: '#ff0000', marginLeft: '5px', borderWidth: '1.5px'}}onClick={() => deleteActivity(activity)}>Delete Activity</button>
                        </li>)}
                </ul>

                <h1 style={{fontSize: '25px', marginBottom: '0px'}}>My Completed Activities</h1>
                <ul style={{listStyleType: 'none'}}>
                    {completedActivities.map(activity =>
                        <li style={{fontSize: '10px', color: '#13A72D'}} key={activity.id}>
                            {activity.activity}
                            <button style={{borderColor: '#ff0000', borderWidth: '1.5px', fontSize: '10px', padding: '0 5px', margin: '5px'}}onClick={() => deleteActivity(activity)}>Delete Activity</button>
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
