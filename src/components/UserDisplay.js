import React from 'react'

//component to display the username of a user who is logged in
//or to display Not Logged In if the user is not logged in
//also has a button that lets the user logout
const UserDisplay = ({user, logoutFn}) => {
    
    const handleClick = () => {
        logoutFn()
    }

    if(user) {
        return (
            <div>
                <h3>Logged In as: {user}</h3>
                <button onClick={handleClick}>Logout</button>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Not Logged In</h3>
            </div>
        )
    }
}

export default UserDisplay