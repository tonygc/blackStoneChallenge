const express = require('express')

const TaskCtrl = require('../controllers/task-controller')

const router = express.Router()

router.post('/new-task', TaskCtrl.createTask)
router.put('/update-task', TaskCtrl.updateTask)
router.get('/get-task/:id_user', TaskCtrl.getTasks)
router.get('/get-task', TaskCtrl.getTasks)

module.exports = router