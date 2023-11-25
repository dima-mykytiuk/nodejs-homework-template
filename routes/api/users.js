const express = require('express')
const router = express.Router()
const users = require('../../models/users');
const validateRegister = require("../../middlewares/isRegisterValid");
const {registerSchema} = require("../../schemas/registValidationSchema");
const validateLogin = require("../../schemas/loginValidationSchema");
const authenticate = require("../../middlewares/checkAuth");
const {upload} = require("../../middlewares/upload");
const validateFile = require("../../middlewares/checkFile");
const validateEmail = require("../../middlewares/isValidEmailVerify");
const {validateEmailSchema} = require("../../schemas/emailValSchema");

router.post('/register', validateRegister(registerSchema), users.registerUser)
router.post('/login', validateLogin(registerSchema), users.loginUser)
router.get('/current', authenticate, users.getCurrentUser)
router.get('/verify/:verificationToken', users.verifyUser)
router.post('/logout', authenticate, users.logoutCurrentUser)
router.post('/verify', validateEmail(validateEmailSchema), users.sendVerify)
router.patch("/avatars", authenticate, upload.single("avatar"), validateFile, users.updateAvatar)

module.exports = router
