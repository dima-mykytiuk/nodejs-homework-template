const {Schema, model} = require('mongoose');

const contactSchemaMongo = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {versionKey: false, timestamps: true});

const userSchemaMongo = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String
}, {versionKey: false, timestamps: true});

const Contact = model("contact", contactSchemaMongo);
const User = model("user", userSchemaMongo);

module.exports = {
    Contact,
    User
};