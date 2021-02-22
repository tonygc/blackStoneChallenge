const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name_a: { type: String, required: true },
        last_name_b: { type: String },
    },
)

module.exports = mongoose.model('users', User)