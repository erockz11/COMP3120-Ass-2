import React from 'react'

//component to allow the user to login using a username and password
const LoginForm = ({loginFn, setUserFn, user}) => {

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
    
    return (
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={loginFn}>
                <div className="login-form-container">
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" onChange={handleUsername}></input>

                    <label htmlFor="pword"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="pword" onChange={handlePassword}></input>

                    <button>Login</button>
                </div>
            </form>
        </div>
        
    )
}

export default LoginForm