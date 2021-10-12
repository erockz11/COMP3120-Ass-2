import React from 'react'

//component to display the username of a user who is logged in
//or to display Not Logged In if the user is not logged in
//also has a button that lets the user logout
const UserDisplay = ({user, loggedIn, logoutFn}) => {
    
    const handleClick = () => {
        logoutFn()
    }

    if(loggedIn) {
        return (
            <div>
                <h3>Logged In as: {user.username}</h3>
                <button onClick={handleClick}>Logout</button>
            </div>
        )
    } else {
        return (
            <div>
                
            </div>
        )
    }
}

export default UserDisplay