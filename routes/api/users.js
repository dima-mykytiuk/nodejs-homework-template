const express = require('express')
const router = express.Router()
const users = require('../../models/users');
const validateRegister = require("../../middlewares/isRegisterValid");
const {registerSchema} = require("../../schemas/registValidationSchema");
const validateLogin = require("../../schemas/loginValidationSchema");
const authenticate = require("../../middlewares/checkAuth");

router.post('/register', validateRegister(registerSchema), users.registerUser)
router.post('/login', validateLogin(registerSchema), users.loginUser)
router.get('/current', authenticate, users.getCurrentUser)
router.post('/logout', authenticate, users.logoutCurrentUser)

module.exports = router
