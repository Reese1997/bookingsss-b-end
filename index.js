const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')

dotenv.config()

mongoose
.connect(process.env.DB_URL)
.then(() => console.log('db connection successful'))
.catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use('/api/users', userRoute)

app.listen(process.env.PORT || 8900, () => {
console.log('Backend Server is running')
})
