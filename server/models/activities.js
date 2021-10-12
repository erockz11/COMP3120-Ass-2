require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL

console.log('connecting to', url)

const doConnect = async (url) => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
}

doConnect(url)

const activitySchema = new mongoose.Schema({
    accessibility: Number,
    type: String,
    participants: Number,
    price: Number,
    username: String
})

activitySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity

/*
"activity": "Learn to play a new instrument",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test2",
*/