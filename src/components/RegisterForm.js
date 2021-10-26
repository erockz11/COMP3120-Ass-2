import React from 'react'
import Services from '../services/services'

//component to allow the user to login using a username and password
//blank if there is a user logged in
const RegisterForm = ({setLoggedIn, newUser, setNewUser, setUser, setUserActivities, loggedIn, showNotification}) => {

    const userRegister = (event) => {
        event.preventDefault()
        console.log("Registering a new user")
        console.log(newUser)

        Services.register(newUser).then(response => {
            console.log(response)
            const registeredUser = {
                "username": response.username,
                "score": 0,
                "token": response.token
            }
            setLoggedIn(true)
            setUser(registeredUser)
            setUserActivities([])
            showNotification(`Username ${registeredUser.username} has successfully been created`, "success", true)
        }).catch(error => {
            showNotification(`An error occurred: ${error}`, "error", true)
        })



      }

    const handleUsername = (event) => {
        const registerUser = {
            "username": event.target.value,
            "password": newUser.password
        }

        setNewUser(registerUser)
    }

    const handlePassword = (event) => {
        const registerUser = {
            "username": newUser.username,
            "password": event.target.value
        }
        setNewUser(registerUser)
    }

    if(loggedIn) {
        return (
            <div>

            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <h1>Register</h1>
                </div>
                
                <form onSubmit={userRegister}>
    
                    <div className="reg-form-container">
                        <fieldset>
                            <label htmlFor="makeUser"><b>Register Username</b></label>
                            <input type="text" placeholder="Create Your Username" name="makeUser" onChange={handleUsername}></input>
        
                            <label htmlFor="makepword"><b>Register Password</b></label>
                            <input type="password" placeholder="Create Your Password" name="makepword" onChange={handlePassword}></input>
                        </fieldset>
                        <button style={{marginLeft: '5px'}} >Register</button>
                    </div>
    
                </form>
            </div>
            
        )
    }
}

export default RegisterForm