import React from 'react'
import service from '../services/services'

const MyActivities = ({userLogin, userActivities}) => {

    const completeActivity = (activity) => {
        console.log("complete activity", activity);
        service.completeActivity(activity)
         .then(data => {
             console.log("activity completed?", data);
         })
         .catch(error => {
             console.log(error);
         })
    }

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
