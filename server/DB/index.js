const mongoose = require('mongoose')

mongoose
    //.connect('mongodb://127.0.0.1:27017/blackStone', { useNewUrlParser: true })
    .connect('mongodb+srv://test:123456_@cluster0.jlr54.mongodb.net/blackStone?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology:true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db