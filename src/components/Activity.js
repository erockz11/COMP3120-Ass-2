import React from 'react'
import AddActivityButton from './AddActivityButton'

const Activity = ({ activity, loggedIn, addActivity }) => {
    //small helper function to return text as sentence/title case, as activity types are given in lowercase
    const capitalise = (text) => {
        if (text == "diy") {
            return "DIY"
        }
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
    }

    if (activity) {
        return (
            <div>
                <ul>
                    <li><b>{ activity.activity }</b></li>
                    <li>Category: { capitalise(activity.type) }</li>
                    <li>Participants: { activity.participants }</li>
                    <li>Price (0 is free, 1 is most expensive): { activity.price }</li>
                </ul>
                <AddActivityButton activity={activity} loggedIn={loggedIn} addActivity={ addActivity }/>
            </div>
        )
    } else {
        return null
    }
}

export default Activity