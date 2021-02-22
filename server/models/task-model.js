const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        due_date: { type: Date, required: true },
        id_user: { type: String, required: true },
        done: {type: Boolean, default: 0}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('tasks', Task)