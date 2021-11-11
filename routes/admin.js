const express = require('express')
const router = express.Router()
const userController = require('../controller/user_controller')

router.get('/',userController.view)

router.get('/signup', userController.form);


module.exports = router