import React from 'react'

//component to display the username of a user who is logged in
//shows "Not Logged In" if no one has logged in
//also contains the log out button
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