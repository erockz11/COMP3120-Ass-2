const express = require('express')
require('dotenv').config()
const app = require('./app')
app.use(express.static("build"))
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




