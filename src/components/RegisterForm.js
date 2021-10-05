import React from 'react'

//component to allow the user to login using a username and password
const RegisterForm = ({registerFn}) => {
    
    return (
        <div>
            <div>
                <h1>Register</h1>
            </div>
            <form onSubmit={registerFn}>

                <div className="reg-form-container">
                    <label htmlFor="makeUser"><b>Register Username</b></label>
                    <input type="text" placeholder="Create Your Username" name="makeUser"></input>

                    <label htmlFor="makepword"><b>Register Password</b></label>
                    <input type="password" placeholder="Create Your Password" name="makepword"></input>

                    <button>Register</button>
                </div>

            </form>
        </div>
        
    )
}

export default RegisterForm