import React from 'react'

const MyActivities = ({userLogin, userActivities, completeActivity}) => {

    if(userLogin) {
        return (
            <div>
                <h1>My Activities</h1>
                <ul>
                    {userActivities.map(activity =>
                        <li key={activity.id}>
                            {activity.activity} <button onClick={() => completeActivity(activity)}>Complete Activity</button>
                        </li>)}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <h3 style={{padding: '50px'}} >Not Logged In</h3>
            </div>
        )
    }

}

export default MyActivities
