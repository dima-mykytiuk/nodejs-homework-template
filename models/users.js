const {v4: uuidv4} = require('uuid');
const Joi = require('joi');
const {User} = require("../schemas/mongoSchema");
const {hash} = require("bcrypt");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {url} = require("gravatar");
require('dotenv').config()
const Jimp = require("jimp");
const path = require("path");

const avatarsDir = path.join(__dirname, "../", "public", "avatars")
const fs = require("fs/promises")
const SECRET_KEY = process.env["SECRET_KEY"];

async function registerUser(req, res, next) {
    const {email, password} = req.body;
    const hashPassword = await hash(password, 10);
    const avatarURL = url(email)
    const newUser = await User.create({email: email, password: hashPassword, avatarURL: avatarURL});
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
    })
}


async function loginUser(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }
    const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: "1h"})
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
    })
}

const getCurrentUser = async (req, res, next) => {
    const { email } = req.user;
    res.json({
        email
    })
}

const logoutCurrentUser = async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: "" });
    res.status(204).json()
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    console.log(req.file)
    const { path: tmpUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, filename);

    const image = await Jimp.read(tmpUpload);
    await image.resize(250, 250).writeAsync(resultUpload);

    await fs.unlink(tmpUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({avatarURL})
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutCurrentUser,
    updateAvatar
};
