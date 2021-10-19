import React from 'react'

//component to display the username of a user who is logged in
//or to display Not Logged In if the user is not logged in
//also has a button that lets the user logout
const UserDisplay = ({user, loggedIn, logoutFn}) => {
    
    const handleClick = () => {
        logoutFn()
    }
    if(loggedIn){
        console.log(user)
        console.log(user.username)
    }

    if(loggedIn) {
        return (
            <div>
                Logged In as: {user.username} | <a className="logout" onClick={handleClick}>Logout</a>
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