const express = require('express')
const cors = require('cors')
const { act } = require('react-dom/test-utils')
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use(cors())

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

//api endpoint to add an activity to a user's account
app.post('/api/addactivity/:username', (request,response) => {
    const user = request.params.username
    console.log(user)
    const isUser = users.find(name => name.username === user)
    console.log(isUser)
    const newActivity = request.body

    const activity = {
        "activity": newActivity.activity,
        "accessibility": newActivity.accessibility,
        "type": newActivity.type,
        "participants": newActivity.participants,
        "price": newActivity.price,
        "username": user,
        "id": generateId()
    }

    if(isUser){
        activities = activities.concat(activity)
        let userActivities = activities.filter(name => name.username === user)
        response.send(userActivities)
    } else {
        response.status(401).end("Unauthroized response")
    }
    
})

//filters out specified user
const getUser = (username) => {
    return users.filter(u => u.username === username)[0]
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
  
    //   const userForToken = {
    //     id: user.id,
    //     username: user.username
    //   }
    //   const token = jwt.sign(userForToken, SECRET)
  
        // return response.status(200).json({token, username: user.username, name: user.name})
        return response.status(200).json({username: user.username, name: user.name})
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})