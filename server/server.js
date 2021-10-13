const express = require('express')
const cors = require('cors')
const { act } = require('react-dom/test-utils')
const Activity = require("./models/activities")
const User = require("./models/users")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const Pwcrypt =  require('../utils/pwcrypt')

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001;
const SECRET = process.env.JWT_SECRET


//api endpoint to return all activities for a user
app.get('/api/myactivities/:username', async (request,response) => {
    const user = request.params.username
    console.log(user)
    let isUser = await getUser(user).catch(error => {
        console.log(error)
    })
    console.log(isUser)
    if(isUser) {
        let userActivities = await Activity.find({"username": isUser.username})
        console.log(userActivities)
        response.json(userActivities)
    } else {
        response.status(401).end("Unauthorized response")
    }
})

//api endpoint to add a user and password to db
app.post('/api/register', async (request,response) => {
    const newUser = request.body

    //check username is free
    let checkIfUser = await getUser(newUser.username).catch(error => {
        console.log(error)
    })

    console.log("checking if the user name is already present",checkIfUser)

    if(!checkIfUser) {
        //hash the password
        const hashedPassword = await Pwcrypt.encryptPassword(newUser)
        console.log(hashedPassword)

        //create a new User record to save to db
        const regUser = new User({
            "username": newUser.username,
            "password": hashedPassword,
            "score": newUser.score
        })
        
        console.log("this is my password?")
        console.log(regUser.password)
        //save record to db
        regUser.save().then(result => {
            console.log("user saved")
            response.send(result)
        })
    } else {
        response.status(401).end("Username already exists")
    }
})

//api endpoint to add an activity to a user's account
app.post('/api/addactivity/:username', async (request,response) => {
    //get the username from the url
    const user = request.params.username
    console.log(user)
    //check if the user exists
    const isUser = await getUser(user).catch(error => {
        console.log(error)
    })
    console.log(isUser)
    //get the activity from the request body
    const sentActivity = request.body

    if(isUser){
        //create a new activity record
        const newActivity = new Activity({
            "activity": sentActivity.activity,
            "accessibility": sentActivity.accessibility,
            "type": sentActivity.type,
            "participants": sentActivity.participants,
            "price": sentActivity.price,
            "username": user,
        })
    
        console.log(newActivity.activity)
        //save record to the db
        newActivity.save().then(result => {
            console.log("record saved")
            response.send(result);
        })
        
    } else {
        response.status(401).end("Unauthroized response")
    }
    
})

//returns a User record from the db, null if not found
async function getUser(user) {
    let checkIfUser = await User.findOne({"username": user}).then(result => {
        console.log(result)
        console.log()
        return result
    })
    return checkIfUser
}

//api endpoint to handle login with {username, password}
app.post('/api/login', async (request, response) => {

    const {username, password} = request.body


    let user = await getUser(username).catch(error => {
        console.log(error)
    })
    console.log(user)

    if(!user) {
        return response.status(401).json({error: "invalid username or password"})
    }
  
    if(await bcrypt.compare(password, user.password)) {
        console.log("password is good")
  
      const userForToken = {
        id: user.id,
        username: user.username
      }
      const token = jwt.sign(userForToken, SECRET)
  
        return response.status(200).json({token, username: user.username})
        // return response.status(200).json({username: user.username, name: user.name})
    } else {
        return response.status(401).json({error: "invalid username or password"})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

