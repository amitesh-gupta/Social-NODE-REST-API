const router = require('express').Router();
const User = require('../models/User');
const { route } = require('./users');
const bcrypt = require('bcrypt');


router.get('/', (req,res) => {
    res.send('this is auth page')
})


//Register////
// router.get('/register', async (req,res) => {
//     const user = await new User({
//         username:'john',
//         email:'john@gmail.com',
//         password:'123456'
//     })
//     await user.save()
//     res.send('ok')
// })

router.post('/register', async (req,res) => {
    
    try {
         //generate new password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        //create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        //Save user and return response
        const user = await newUser.save()
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
})
//Login
router.post("/login", async (req, res) => {

    try {
    const user = await User.findOne({email:req.body.email})
    !user && res.status(404).json("User Not found")
    // res.status(200).json("user")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
    res.status(200).json(user)

    } catch(err){
        res.status(500).json(err)
    }
    
})

module.exports = router