require('dotenv').config()
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URL

console.log('connecting to', url)

const doConnect = async (url) => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
}

doConnect(url)

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    score: Number
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User