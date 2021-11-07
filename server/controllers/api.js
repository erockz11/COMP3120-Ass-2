const express = require('express')
const Activity = require("../models/activities")
const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const Pwcrypt =  require('../../utils/pwcrypt')


const apiRouter = express.Router()

const SECRET = process.env.JWT_SECRET

//api endpoint to get leaderboard data
apiRouter.get('/api/leaderboard', (request, response) => {
    User.find({})
    .then(result => {

        let newList = []

        //Scrubing sensitive data
        for(var i = 0; i < result.length; i++) {
            newList.push({"username": result[i].username, "score": result[i].score, "id": result[i]._id})
        }

        //Sorts by score in descending order
        newList = sortLB(newList)
        response.json(newList)

    }).catch(error => {
        console.log(error)
    })
})

//function to sort a list of user objects in descending order based on their score
const sortLB = (newList) => {
    newList.sort((a, b) => b.score - a.score)
    return newList
}

//grabs the user token from a request
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

//api endpoint to return all activities for a user
apiRouter.get('/api/myactivities/:username', async (request,response) => {
    const user = request.params.username
    
    let isUser = await getUser(user).catch(error => {
        console.log(error)
    })
    
    if(isUser) {
        let userActivities = await Activity.find({"username": isUser.username})
        response.json(userActivities)
    } else {
        response.status(401).end("Unauthorized response")
    }
})

//api endpoint to add a user and password to db
apiRouter.post('/api/register', async (request,response) => {
    const newUser = request.body
    
    //hash the password
    const hashedPassword = await Pwcrypt.encryptPassword(newUser)
        .catch(error => {
            console.log(error)
    })

    //create a new User record to save to db
    const regUser = new User({
        "username": newUser.username,
        "password": hashedPassword,
        "score": 0
    })

    //save record to db, error if not username taken
    await regUser.save()
    .then(result => {
        const userForToken = {
            id: result.id,
            username: result.username
        }
        const token = jwt.sign(userForToken, SECRET)
        response.send( {token, "username": result.username, "score": result.score } )
    }).catch(error => {
        console.log(error)
        response.status(401).end("That Username already exists")
    })
})

//api endpoint to add an activity to a user's account
apiRouter.post('/api/addactivity/:username', async (request,response) => {
    //get the username from the url
    const user = request.params.username
    //check if the user exists
    const isUser = await getUser(user).catch(error => {
        console.log(error)
    })

    //get the activity from the request body
    const sentActivity = request.body

    if(isUser){
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        //create a new activity record
        const newActivity = new Activity({
            "activity": sentActivity.activity,
            "accessibility": sentActivity.accessibility,
            "type": sentActivity.type,
            "participants": sentActivity.participants,
            "price": sentActivity.price,
            "username": user,
            "completed": false
        })
    
        //save record to the db
        newActivity.save().then(result => {
            response.send(result);
        })
        
    } else {
        response.status(401).end("Unauthroized response")
    }
    
})

//returns a User record from the db, null if not found
async function getUser(user) {
    let checkIfUser = await User.findOne({"username": user}).then(result => {
        return result
    })
    return checkIfUser
}

//api endpoint to handle login with {username, password}
apiRouter.post('/api/login', async (request, response) => {

    let {username, password} = request.body

    //find user from db
    let user = await getUser(username).catch(error => {
        console.log(error)
    })

    //if user name does not exist, return 401
    if(!user) {
        return response.status(401).json({error: "invalid username or password"})
    }
    
    //compare the user password with the encrypted password on the db
    if(await bcrypt.compare(password, user.password)) {
      const userForToken = {
        id: user.id,
        username: user.username
      }
      //create a user token and send success (logged in) back to frontend
      const token = jwt.sign(userForToken, SECRET)
        return response.status(200).json({token, username: user.username})

    } else {
        return response.status(401).json({error: "invalid username or password"})
    }
})

//changing this to a post request
apiRouter.post('/api/completeactivity', async (request, response) => {
    const sentActivity = request.body.data

    let user = await User.findOne( {"username": sentActivity.username } )
    .catch(error => {
        console.log("couldn't find one:", error)
    })
    //verify user has the correct token
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    //generate the score for the completed activity
    let activityScore = calcScore(sentActivity.participants, sentActivity.accessibility, user.score)
    //update user score
    user = await User.findOneAndUpdate( { "username": sentActivity.username }, { $set: { "score": activityScore } }, { new: true } )
    .catch(error => {
        response.status(401).end("could not find user",error)
    })
    //update activity to completed
    let activity = await Activity.findOneAndUpdate( { "_id":sentActivity.id }, {$set: { "completed": true }}, {new: true} )
    .catch(error => {
        response.status(401).end("activity not found")
    })

    response.status(200).json( { "user": { "username": user.username, "score": user.score }, "activity": activity } )
})

//api endpoint for deleting activities
apiRouter.delete('/api/myactivities/:id', async (request, response) => {
    await Activity.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => {
        response.status(401).end("could not find activity", error)
    })
})

//function that calculates score to be added
const calcScore = (participants, accessibility, score) => {
    score += (accessibility * 10) + participants
    return score
}

module.exports = apiRouter