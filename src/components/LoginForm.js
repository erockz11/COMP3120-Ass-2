import React from 'react'

//component to allow the user to login using a username and password
//blank if there is a user logged in
const LoginForm = ({loginFn, setUserFn, user, loggedIn}) => {

    const handleUsername = (event) => {
        const loginUser = {
            "username": event.target.value,
            "password": user.password
        }
        setUserFn(loginUser)
    }

    const handlePassword = (event) => {
        const loginUser = {
            "username": user.username,
            "password": event.target.value
        }
        setUserFn(loginUser)
    }

    if(loggedIn) {
        return (
            <div>
              <h1 style={{padding: '300px'}}>Logged In</h1>
            </div>
        )
    } else {
        return (
            <div>

                <div>
                    <h1>Login</h1>
                </div>

                <form onSubmit={loginFn}>
                    <div className="login-form-container">
                        <fieldset>
                            <label htmlFor="username"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="username" onChange={handleUsername}></input>

                            <label htmlFor="pword"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="pword" onChange={handlePassword}></input>
                        </fieldset>
                        <button style={{marginLeft: '5px'}} >Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm