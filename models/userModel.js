const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required']
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "blog"
        }
    ],

}, { timestamps: true })

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;