import React from 'react'

//component to allow the user to login using a username and password
const LoginForm = ({loginFn}) => {
    
    return (
        <div>
            <div>
                <h1>Login/Register</h1>
            </div>
            <form onSubmit={loginFn}>
                <div className="form-container">
                    <label htmlFor="username"><b>UserName</b></label>
                    <input type="text" placeholder="Enter Username" name="username" required></input>

                    <label htmlFor="pword"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="pword" required></input>

                    <button>Login</button>
                </div>
            </form>
        </div>
        
    )
}

export default LoginForm