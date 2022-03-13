const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

const app = express()
mongoose.connect('mongodb://localhost/socialdb',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'))

app.use('/api/user' , userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)


// app.get('',(req,res)=> {
//     res.send('Welcome to homepage')
// })
// app.get('/user',(req,res) => {
//     res.send('Welcome to use page')
// })

console.log('Connected to DB')
app.listen(8800,() => {
    console.log('Backend server is running' )
})
