const express = require('express')
const router = express.Router()

// import middleware
const {authCheck} = require("../middleware/auth")

// import controllers 
const {createOrUpdateUser} = require("../controller/auth")

router.post('/create-or-update-user',  authCheck, createOrUpdateUser)


module.exports = router


