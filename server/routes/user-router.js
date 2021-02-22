const express = require('express')

const UserCtrl = require('../controllers/user-controller')

const router = express.Router()

router.post('/new-user', UserCtrl.createUser)
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/login/:email/:password', UserCtrl.loginUser)
router.get('/user', UserCtrl.getUsers)
router.get('/user/:id', UserCtrl.getUsers)

module.exports = router