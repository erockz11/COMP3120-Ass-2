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

//sample activities
let activities = [
    {
        "activity": "Learn Express.js",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 0
    },
    {
        "activity": "Bake something you've never tried before",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 1
    },
    {
        "activity": "Learn how to play a new sport",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 2
    },
    {
        "activity": "Text a friend you haven't talked to in a long time",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 3
    },
    {
        "activity": "Meditate for five minutes",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 4
    },
    {
        "activity": "Learn to play a new instrument",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test2",
        "id": 5
    }
]
let users = [
    {
        "username": "test1",
        "password": "$2b$10$mji4xtNjSBdqtt85NvSzA.J8OCK/hqqKZx8g9xbZ2dYMBEaLLwxrq"
    },
    {
        "username": "test2",
        "password": "$2b$10$k/wbLjWpl1ykcUF.PYsuPe1wmv73haeN9Y0YhNJ3JabIUDXNAGGgu"
    }
]

//api endpoint to return all activities for a user
app.get('/api/myactivities/:username', (request,response) => {
    const user = request.params.username
    console.log(user)
    const isUser = users.find(name => name.username === user)
    console.log(isUser)
    if(isUser) {
        let userActivities = activities.filter(name => name.username === user)
        console.log(userActivities)
        response.json(userActivities)
    } else {
        response.status(401).end("Unauthorized response")
    }
})

//api endpoint to add a user and password to db
app.post('/api/register', (request,response) => {
    const newUser = request.body

    //check username is free
    async function checkUser() {
        let checkIfUser = await User.findOne({"uname": newUser.username}).then(result => {
            console.log(result)
            console.log()
            return result
        })
        return checkIfUser
    }

    let checkIfUser = checkUser().catch(error => {
        console.log(error)
    })

    if(checkIfUser) {
        const hashedPassword = String(Pwcrypt.encryptPassword(newUser))
        console.log(hashedPassword)

        const regUser = new User({
            "uname": newUser.username,
            "password": hashedPassword,
            "score": newUser.score
        })
        
        console.log("this is my password?")
        console.log(regUser.password)
        regUser.save().then(result => {
            console.log("user saved")
            response.send(result)
        })
    } else {
        response.status(401).end("Username already exists")
    }

    
})

//api endpoint to add an activity to a user's account
app.post('/api/addactivity/:username', (request,response) => {
    const user = request.params.username
    console.log(user)
    const isUser = users.find(name => name.username === user)
    console.log(isUser)
    const sentActivity = request.body

    if(isUser){

        const newActivity = new Activity({
            "activity": sentActivity.activity,
            "accessibility": sentActivity.accessibility,
            "type": sentActivity.type,
            "participants": sentActivity.participants,
            "price": sentActivity.price,
            "username": user,
        })
    
        console.log(newActivity.activity)
    
        newActivity.save().then(result => {
            console.log("record saved")
            response.send(result);
        })
        
    } else {
        response.status(401).end("Unauthroized response")
    }
    
})

//filters out specified user
const getUser = (username) => {
    User.find({"username": username})
    .then(result => {
        return result
    })
    //return users.filter(u => u.username === username)[0]
}

//api endpoint to handle login with {username, password}
app.post('/api/login', async (request, response) => {

    const {username, password} = request.body

    const user = getUser(username)
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
  
        return response.status(200).json({token, username: user.username, name: user.name})
        // return response.status(200).json({username: user.username, name: user.name})
    } else {
        return response.status(401).json({error: "invalid username or password"})
    }
})

const generateId = () => {
    const maxId = activities.length > 0 
        ? Math.max(...activities.map(u => u.id)) 
        : 0

    return maxId + 1
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

