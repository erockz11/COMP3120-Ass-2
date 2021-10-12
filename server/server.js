const express = require('express')
const cors = require('cors')
const { act } = require('react-dom/test-utils')
const app = express()

app.use(express.json())
app.use(cors())

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