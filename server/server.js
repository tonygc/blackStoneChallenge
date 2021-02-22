const express = require('express');
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const path = require('path');
const db = require('./db')
const userRouter = require('./routes/user-router')
const taskRouter = require('./routes/task-router')

const app = express();

const apiPort = 3000
app.use(express.static(path.join(__dirname, 'build')));
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/ping', asyncHandler(async(req, res) => {
 return await res.send('pong');
}));

app.get('/', function (req, res) {
  res.render(path.join(__dirname, 'build', 'home.jsx'));
});

app.use('/apiBS', userRouter, taskRouter)

app.listen(process.env.PORT || apiPort, () => console.log(`Server running on port ${apiPort}`));