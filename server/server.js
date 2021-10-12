const express = require('express')
const cors = require('cors')
const { act } = require('react-dom/test-utils')
const app = express()

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
        "password": "0000"
    },
    {
        "username": "test2",
        "password": "0001"
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

app.post('/api/addactivity/:username', (request,response) => {
    const user = request.params.username
    console.log(user)
    const isUser = users.find(name => name.username === user)
    console.log(isUser)
    const newActivity = request.body

    const activity = {
        "activity": activity.activity,
        "accessibility": activity.accessibility,
        "type": activity.type,
        "participants": activity.participants,
        "price": activity.price,
        "username": activity.username,
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

const generateId = () => {
    const maxId = poems.length > 0 
        ? Math.max(...poems.map(u => u.id)) 
        : 0

    return maxId + 1
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})